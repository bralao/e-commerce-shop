import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);


const getDefaultCart = () => {
  let cart = {}; //initializing an empty cart object, to keep track of the quantity of each product
  for (let index = 0; index < 300+1; index++) { // loop through each product in all_products. it starts with the index 0, and continues until it reaches the length of all_product array
    cart[index] = 0; // for each product, add a key to the cart object, with the index of the product as the key, and the value as 0 so we initialize the cart with 0 quantities for each product
  }
  return cart;
}

const ShopContextProvider = ( props ) => {

  const [all_product, setAll_Product] = useState([]); //useState takes an initial state([]) and returns an array with 2 elements- current state value and a function to update the value
  const [cartItems, setCartItems] = useState(getDefaultCart());   //useState takes an initial state(getDefaultCart) and returns an array with 2 elements- current state value and a function to update the value

  useEffect(()=>{
    fetch('http://localhost:4000/allproducts') //fetches the data from the server
    .then((response)=>response.json()) //converts the response to a JSON object
    .then((data)=>setAll_Product(data)) //updates the all_product state with the data from the server

    if(localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json'
        },        body: JSON.stringify({}),
      }).then((response)=>response.json())
      .then((data)=>setCartItems(data));
    }
  },[])



  const addToCart = (itemId) => { //responsible for updating the cartItems state by incrementing(adding) the quantity of a specific item. itemId is the parameter,  which represents the identifier of the product being added to the cart
    setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1})) //uses prev to get previous state of setCartItems, and ...prev (spread operator) to copy the previous state, and then updates the quantity of the specific item by incrementing it by 1
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data', //we set the headers to specify the type of data we are sending, and the type of data we expect to receive
          'auth-token': `${localStorage.getItem('auth-token')}`, //we set the auth-token header to the value of the token stored in the local storage, so that the server can authenticate the user
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"itemId": itemId}),
      })
      .then((response)=>response.json())
      .then((data)=>console.log(data))
    }
  }

  /*
  prev[itemId]: This part retrieves the current value associated with the itemId key in the prev object
  :  indicates that the value on the left side of the colon corresponds to the key on the right side
  prev[itemId]+1: This part calculates the new value for the itemId key by incrementing the current value (prev[itemId]) by 1
  */

  const removeFromCart = (itemId) => {
   setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
    if(localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data', //we set the headers to specify the type of data we are sending, and the type of data we expect to receive
          'auth-token': `${localStorage.getItem('auth-token')}`, //we set the auth-token header to the value of the token stored in the local storage, so that the server can authenticate the user
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"itemId": itemId}),
      })
      .then((response)=>response.json())
      .then((data)=>console.log(data))
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for ( const item in cartItems ) { // for...in loop iterates over each item in the cartItems object. The item variable represents the key (item ID) of each item in the cart.
      if(cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item)) //we check if the quantity of the current item in the cart is greater than 0. If so, we retrieve information about the item from the all_product array using its ID. The find method is used to search for the item with the matching ID
        totalAmount += itemInfo.new_price * cartItems[item] // calculate the cost of the current item by multiplying its price with the quantity (cartItems[item]). This value is added to the totalAmount
      }
    }
    return totalAmount;
  }

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  }

  const contextValue = {all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;
