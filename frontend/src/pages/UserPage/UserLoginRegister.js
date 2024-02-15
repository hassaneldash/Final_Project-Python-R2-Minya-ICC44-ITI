import React, { useState } from 'react';
import './styles.css';

const RegistrationPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);

  const showLoginForm = () => {
    setIsLoginForm(true);
  };

  const showRegisterForm = () => {
    setIsLoginForm(false);
  };

  return (
    <div className={`containerx ${isLoginForm ? 'active' : ''}`}>
      <div className="form-containerx sign-up">
        <form>
        <h1>Create Account</h1>
                <div className="social-icons">
                    <a className="icon"><i id="id-btn-register-phone" className="fa-solid fa-phone"></i></a>
                    <a className="icon"><i id="id-btn-register-google" className="fa-brands fa-google"></i></a>
                    <a className="icon"><i id="id-btn-register-twitter" className="fa-brands fa-twitter"></i></a>
                    <a className="icon"><i id="id-btn-register-github" className="fa-brands fa-github"></i></a>
                    <a className="icon"><i id="id-btn-register-microsoft" className="fa-brands fa-microsoft"></i></a>
                    <a className="icon"><i id="id-btn-register-yahoo" className="fa-brands fa-yahoo"></i></a>
                </div>
                <span>or use your email for registeration</span>
                <input id="id-input-register-name" type="text" placeholder="Please, enter your name"/>
                <input id="id-input-register-email" type="email" placeholder="Please, enter your email"/>
                <input id="id-input-register-password" type="password" placeholder="Please, enter your password"/>
                <select id="id-select-reg-usertype" required>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                </select>
                <span>By clicking "Register," you agree to our <a href="http://">Terms of Use</a> and our <a href="http://">Privacy Policy</a>.</span>
                <button id="id-btn-register-email">Register</button>
                </form>
      </div>
      <div className="form-containerx sign-in">
        <form>
                <h1> Login</h1>
                <div className="social-icons">
                <a className="icon"><i id="id-btn-register-phone" className="fa-solid fa-phone"></i></a>
          <a className="icon"><i id="id-btn-login-phone" className="icon fa-solid fa-phone"></i></a>
          <a className="icon"><i id="id-btn-login-google" className="icon fa-brands fa-google"></i></a>
          <a className="icon"><i id="id-btn-login-twitter" className="icon fa-brands fa-twitter"></i></a>
          <a className="icon"><i id="id-btn-login-github" className="icon fa-brands fa-github"></i></a>
          <a className="icon"><i id="id-btn-login-microsoft" className="icon fa-brands fa-microsoft"></i></a>
          <a className="icon"><i id="id-btn-login-yahoo" className="icon fa-brands fa-yahoo"></i></a>
          </div>
                <span>or use your email password</span>
                <input id="id-input-login-email" type="email" placeholder="Please, enter your email"/>
                <input id="id-input-login-password" type="password" placeholder="Please, enter your password"/>
                <a id="id-btn-forget-password">Forget Your Password?</a>
                <span>By clicking " Login," you agree to our <a href="http://">Terms of Use</a> and our <a href="http://">Privacy Policy</a>.</span>
                <button id="id-btn-login-email">Login</button>
            </form>
            </div>
      <div className="toggle-containerx">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us, please login with your personal info</p>
            <button className="hidden" onClick={showLoginForm}>Login</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start the journey with us</p>
            <button className="hidden" onClick={showRegisterForm}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;