import React, { useRef, useState } from 'react';
import { Navigate } from "react-router-dom";
import "./Login.css";
import Swal from 'sweetalert2'
import {useDispatch} from "react-redux"

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEmail, setIsEmail] = useState("");
    const [isPassword, setIsPassword] = useState("");

    const dispatch = useDispatch();
    
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(isEmail === ""){
      Swal.fire({
        icon:"warning",
        title:"Please enter Email"
      })
    }else if(isPassword === ""){
      Swal.fire({
        icon:"warning",
        title:"Please enter password"
      })
    }
    else{
      const response = await fetch('http://localhost:8080/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
    });
    // const data = await response.json();
    // console.log(data);
    if (response.status===200) {
      const data = await response.json();
      localStorage.setItem("token",data.result.token)
      localStorage.setItem("user",JSON.stringify(data.result.user))
      dispatch({type:"Login_Success",payload:data.result.user})
      // Store the response data in local storage
      localStorage.setItem('userData', JSON.stringify(data));
      // Set isRegistered to true upon successful registration
      setIsLoggedIn(true);
      Swal.fire({
        icon:"success",
        title:"Logged in successfully!"
      })
    } else {
      Swal.fire({
        icon:"error",
        title:"Username or password is incorrect"
      })
    }
  }
    }



  if (isLoggedIn) {
    // Redirect to login page if registration was successful
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="login-wrap">
        <div className="login-htmll" style={{ height: "525px !important" }}>
          <input id="tab-1" type="radio" name="tab" className="sign-in" checked />
          <label htmlFor="tab-1" className="tab">Log In</label>
          <input id="tab-2" type="radio" name="tab" className="for-pwd" />
          <label htmlFor="tab-2" className="tab"></label>
          <div className="login-form">
            <div className="sign-in-htm">
              <form onSubmit={handleLogin}>
                <div className="group">
                  <label htmlFor="user" className="label">Email</label>
                  <input id="user" type="text" className="input" ref={emailRef} onChange={(e)=>setIsEmail(e.target.value)} />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Password</label>
                  <input id="pass" type="password" className="input" data-type="password" onChange={(e)=>setIsPassword(e.target.value)} ref={passwordRef} />
                </div>
                <div className="group">
                  <button type="submit" className="button">Log In</button>
                </div>
                <div className="hr"></div>
              </form>
                <div className="group">
                  <a href="/Signup">
                    <button type="button" className="button">Sign Up</button>
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
