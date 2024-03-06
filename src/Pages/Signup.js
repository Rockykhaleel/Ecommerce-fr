import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";
import Swal from 'sweetalert2'

const Signup = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isName, setIsName] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isAddress, setIsAddress] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPass, setIsPass] = useState("");
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if(isName === ""){
      Swal.fire({
        icon:"warning",
        title:"Please enter Name"
      })
    }else if(isPhone === ""){
      Swal.fire({
        icon:"warning",
        title:"Please enter Phone"
      })
    }else if(isAddress === ""){
      Swal.fire({
        icon:"warning",
        title:"Please enter Phone"
      })
    }else if(isEmail === ""){
      Swal.fire({
        icon:"warning",
        title:"Please enter Email"
      })
    }
    else if(isPass === ""){
      Swal.fire({
        icon:"warning",
        title:"Please enter Password"
      })
    }
    else{

      const response = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameRef.current.value,
          address: addressRef.current.value,
          phone: phoneRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });
  
      // const data = await response.json();
      // console.log(data);
      if (response.status===201) {
        // Set isRegistered to true upon successful registration
        setIsRegistered(true);
        Swal.fire({
          icon:"success",
          title:"Registered in successfully!"
        })
      } else {
        // Handle registration error
        //console.error(data);
        Swal.fire({
          icon:"error",
          title:"Username or password is incorrect"
        })
      }
    };
    }

  if (isRegistered) {
    // Redirect to login page if registration was successful
    return <Navigate to="/login" />;
  }


  return (
    <>
      <div className="login-wrap">
        <div className="login-html">
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className="sign-in"
            checked
          />
          <label htmlFor="tab-1" className="tab">
            Sign Up
          </label>
          <input id="tab-2" type="radio" name="tab" className="for-pwd" />
          <label htmlFor="tab-2" className="tab"></label>
          <div className="login-form">
            <div className="sign-in-htm">
              <form onSubmit={handleSignUp}>
                <div className="group">
                  <label htmlFor="user" className="label">
                    Name
                  </label>
                  <input
                    id="Name"
                    type="Name"
                    className="input"
                    ref={nameRef}
                    onChange={(e)=>setIsName(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="user" className="label">
                    Phone
                  </label>
                  <input
                    id="Phone"
                    type="Phone"
                    className="input"
                    ref={phoneRef}
                    onChange={(e)=>setIsPhone(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="user" className="label">
                    Address
                  </label>
                  <input
                    id="Address"
                    type="Address"
                    className="input"
                    ref={addressRef}
                    onChange={(e)=>setIsAddress(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="user" className="label">
                    Email
                  </label>
                  <input
                    id="user"
                    type="email"
                    className="input"
                    ref={emailRef}
                    onChange={(e)=>setIsEmail(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Password
                  </label>
                  <input
                    id="pass"
                    type="password"
                    className="input"
                    data-type="password"
                    ref={passwordRef}
                    onChange={(e)=>setIsPass(e.target.value)}
                  />
                </div>
                <div className="group">
                  <button className="button">
                    Sign Up
                  </button>
                </div>
                </form>
                <div className="hr"></div>
                <div className="group">
                {/* onClick={gotoLogin} */}
                <a href="/Login">
                  <button className="button" >
                    Log In
                  </button></a>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
