import React, { useState } from 'react'
import '../styles/LoginSignup.css';

export default function LoginSignup() {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ // we will use this state to store the form data
    username: "", // we define the username, password and email fields
    password: "",
    email: ""
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value}) // we use the spread operator to update the form data
  }

  const login = async () => {
    console.log("Login Function Executed", formData)
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){ // here we check if the response is successful, through the success property
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace('/');
    }
    else {
      alert(responseData.errors)
    }
  }

  const signup = async () => {
    console.log("Signup Function Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){ // here we check if the response is successful, through the success property
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace('/');
    }
    else {
      alert(responseData.errors)
    }

  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">

        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {state ==="Sign Up"? <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />:<></>} {/*if state is "Sign Up" then show the input field*/}
          <input name='email' value={formData.email} onChange={changeHandler} type="text" placeholder="Email Adress" />
          <input name='password' value={formData.password} onChange={changeHandler} type="text" placeholder="Password" />
        </div>

        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>

        {state==="Sign Up"
        ? <p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
        : <p className="loginsignup-login">Create an account <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>
        }

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By continuing, i agree to the terms of use and privacy policy</p>
        </div>

      </div>
    </div>
  )
}
