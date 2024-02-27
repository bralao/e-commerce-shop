import React, {useState, useEffect} from 'react'
import '../../styles/Popular.css';
import Item from '../item/Item';

const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/popularinwomen') //fetches the data from the server
    .then((response)=>response.json()) //converts the response to a JSON object
    .then((data)=>setPopularProducts(data)); //updates the popularProducts state with the data from the server
  },[])

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        { popularProducts.map((item, i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Popular
