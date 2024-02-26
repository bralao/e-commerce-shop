// here we have all the backend code

const port = 4000 // define our code
const express = require("express") // initialize express package
const app = express()// using express, we can create our app instance

const mongoose = require("mongoose")// initialize mongoose package
const jwt = require("jsonwebtoken")// initialize json webtoken package
const multer = require("multer") // initialize multer package
const path = require("path") // include the path that is the express server
// using this path we can get access to our backend directory in our express app
const cors = require("cors") // initialize cors package
const { connect } = require("http2")

app.use(express.json()); // it will convert the request into json format. this is necessary because we need to send the data in json format because we are using the REST API
app.use(cors()) // using this, our react.js project will  connect to express app on 4000 port

// we initialize our database -> a mongoose db atlas database
// search for mongoose db atlas online and create a new database


// Database Connection (MongoDB) to our Express server
mongoose.connect("mongodb+srv://ralao:1234@cluster0.j4wsk2i.mongodb.net/?retryWrites=true&w=majority&appName=E-Commerce-Shop") //we add the password and the path where we have the data to our application


// API creation
  //create an api
  app.get("/", (req, res)=>{
    res.send("Express App is Running") // if we go to the root of our express app, we will get this message
  })

  //create express login for the login endpoint
    // Image Storage Engine
    const storage = multer.diskStorage({
      destination: './upload/images',
      filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
      }
    })

    const upload = multer({storage: storage})

    //creating upload endpoint for images
    app.use('/images', express.static('upload/images'))
    app.post("/upload", upload.single('product'), (req, res)=>{
      res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
      })
    })

    // create and end point to add the product in our database
    // before we add the product, we need to create a schema for the product
      //Schema for Creating Products
      const Product = mongoose.model("Product", {
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        new_price: {
          type: Number,
          required: true,
        },
        old_price: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now
        },
        available: {
          type: Boolean,
          required: true,
          default: true,
        },
      })

      // Create Product Endpoint
      app.post('/addproduct', async(req, res)=>{ // this is the endpoint to add the product

        let products = await Product.find({}); // we get all the products from the database
        let id;
        if(products.length > 0) {                       // if we have products in the database
          let last_product_array = products.slice(-1); // we define the last product in the array
          let last_product = last_product_array[0];    // we fetch the last product from the array
          id = last_product.id + 1;                    // we get the id of the last product and add 1 to it
        } else {
          id = 1; // if we don't have any product in the database, we will start with the id 1
        }

        const product = new Product({ //product is the instance of the Product model
          id: id, // id is automatically generated
          name: req.body.name,
          image: req.body.image,
          category: req.body.category,
          new_price: req.body.new_price,
          old_price: req.body.old_price,
        });
        console.log(product);
        await product.save(); // save the product in the database
        console.log("Saved");
        res.json({ // send the response to the client
          success: true,
          name: req.body.name,
        })
      })


  // creating API for deleting products from database
  app.post ('/removeproduct', async(req, res)=>{
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
      success: true,
      name: req.body.name,
    })
  })

  // creating API for getting all products
  app.get("/allproducts", async(req, res)=>{
    let products = await Product.find({}); // get all the products from the database
    console.log("All Products Fetched");
    res.json(products); // send the products to the client
  })

  // Schema for Creating User Model
  const Users = mongoose.model('Users',{ // we create a model for the user
    name: { // we define the name of the user
      type: String,
      required: true,
    },
    email: { // we define the email of the user
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
    },
    date: {
      type: Date,
      default: Date.now,
    }
  })

  // Create User Endpoint for registration
  app.post('/signup', async (req, res)=>{ // we create an endpoint for the user registration
    let check = await Users.findOne({email: req.body.email}); // we check if the email already exists in the database
    if (check) { // if the email already exists
      return res.status(400).json({success:false, errors: "Email Already Exists"}); // we send an error message to the client
    }
    let cart = {}; // we define the cart object
    for (let i = 0; i < 300; i++) { // we create a loop to create 300 items in the cart
      cart[i] = 0; // we set the value of each item to 0
    }
    const user = new Users({ // we create a new user
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    })

    await user.save(); // we save the user in the database

    const data = { // to use jwt authentication, we need to create a token. a token is a string that is used to authenticate the user
      user: {
        id: user.id,
      }
    }

    const token = jwt.sign(data, 'secret_ecom') // we create a token using the jwt package, we pass the data and a secret key to the sign method
    res.json({success:true,token}) // we send the token to the client
  })


  // Create User Endpoint for login
  app.post('/login',async(req, res)=>{ // we create an endpoint for the user login
    let user = await Users.findOne({email: req.body.email}); // we check if the user exists in the database
    if (user) {
      const passCompare = req.body.password === user.password; // we compare the password from the client with the password in the database
      if (passCompare) { // if the password is correct
        const data = { // we create a token using the jwt package
          user: {
            id: user.id
          }
        }
        const token = jwt.sign(data, 'secret_ecom'); // we create a token using the jwt package
        res.json({success:true,token}); // we send the token to the client
      }
      else {
        res.json({success:false, errors: "Invalid Password"}); // if the password is incorrect, we send an error message to the client
      }
    }
    else {
      res.json({success:false, errors: "Invalid Email"}); // if the email is incorrect, we send an error message to the client
    }
  })

  // 1
  app.listen(port, (error)=>{
    if (!error) {
      console.log("Server Running on Port " + port) // if there is no error, we will get this message on the console
    } else {
      console.log("Error : " + error) // if there is an error, we will get this message on the console
    }
  })
