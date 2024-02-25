import React from 'react'
import '../styles/LoginSignup.css';

export default function LoginSignup() {
  return (
    <div classname="loginsignup">
      <div className="loginsignup-container">

        <h1>Sign Up</h1>

        <div className="loginsignup-fields">
          <input type="text" placeholder="Your Name" />
          <input type="text" placeholder="Email Adress" />
          <input type="text" placeholder="Password" />
        </div>

        <button>Continue</button>

        <p className="loginsignup-login">Already have an account? <span>Login here</span></p>

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By continuing, i agree to the terms of use and privacy policy</p>
        </div>

      </div>
    </div>
  )
}
