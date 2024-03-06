import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const [badgeCount, setBadgeCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem('user')); 
      setUser(user);
      if (user) {
        const response = await axios.get(`http://localhost:8080/api/cart/getByUserId/${user.id}`);
        setBadgeCount(response.data.data.length);
      }
    };
  
    fetchData();
  }, []);
  

const handleLogout = () => {
  localStorage.clear();
  setUser(null);
};


  return (
    <>
    {/* <!-- Nav Header --> */}
<nav className="navbar bg">
  <div className="container-fluid row">
    <div className="col-md-4 col-sm-4 col-6">
      <a className="navbar-brand" href='/'
        ><i
          className="fa-sharp fa-solid fa-bag-shopping"
          style={{color: "deeppink"}}
        ></i
        >&nbsp; ecommerce</a
      >
    </div>
    <div className="col-md-4 col-sm-4 col-6">
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Product Name, Category Name, etc,"
          aria-label="Search"
        />
        <button
          className="btn"
          style={{color: "#fbe5e9", backgroundColor: "deeppink"}}
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
    <div className="col-md-4 col-sm-4 col-6">
  <a href="/Cart" className="mt-2 ms-2 float-end d-inline-block">
    <FontAwesomeIcon
      className="fa-sharp fa-solid fa-cart-shopping cart fs-3"
      icon={faCartShopping}
      style={{
        color: "deeppink",
      }}
    />
    <span className="badge rounded-pill bg-danger position-absolute top-40 start-95 translate-middle">
  {badgeCount}
  <span className="visually-hidden">unread messages</span>
</span>
  </a>
     
  <a href="/Login">
  {user ? (
        <button onClick={handleLogout} className="btn" style={{float: "right", color: "deeppink"}}>
          Logout
        </button>
      ) : (
        <a href="/Login">
          <button className="btn" style={{float: "right", color: "deeppink"}}>
            Login
          </button>
        </a>
      )}
  </a>
</div>

  </div>
</nav>
{/* <!-- Main Nav --> */}
<div className="main_nav" style={{display: "flex", justifyContent: "center"}}>
  <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/AllProducts">All Products</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">Contact Us</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>

    </>
  )
}

export default Header