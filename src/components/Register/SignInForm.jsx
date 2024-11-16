// SignInForm.js
import React from 'react';
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";

const SignInForm = () => (
  <div className="form-container sign-in-container">
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>Sign in</h1>
      <div className="social-container">
        <a href="#" className="social"><i className="fab fa-facebook-f">  <FaFacebook /> </i></a>
        <a href="#" className="social"><i className="fab fa-google-plus-g"> <FaGoogle /> </i></a>
        <a href="#" className="social"><i className="fab fa-linkedin-in"><FaLinkedin /> </i></a>
      </div>
      <span>or use your account</span>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <a href="#">Forgot your password?</a>
      <button type="submit">Sign In</button>
    </form>
  </div>
);

export default SignInForm;
