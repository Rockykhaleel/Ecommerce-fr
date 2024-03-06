import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Swal from 'sweetalert2'
import { Navigate } from "react-router-dom";

const Slider = () => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const serverUrl = 'http://localhost:8080'; // replace with your server's URL

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8080/api/product/getAllProducts');
      setProducts(response.data.data);
    };

    fetchData();
  }, []);

  const addToCart = async (productId) => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(true);
      Swal.fire({
        icon:"warning",
        title:"Please log in to add items to the cart"
      })
      return;
    }
  
    const userID = JSON.parse(user);
    console.log("user ID is "+userID.id);
    console.log(productId);
  
    try {
      const response = await axios.post(`${serverUrl}/api/cart/addproducttocart`, {
        products: productId,
        user: userID.id
      });
  
      Swal.fire({
        icon:"success",
        title:"Product added to cart successfully!"
      })
      window.location.reload();
    } catch (error) {
      console.error('Error adding product to cart', error);
    }
  };
  

  if (isLoggedIn) {
    // Redirect to login page if registration was successful
    return <Navigate to="/Login" />;
  }
  

  return (
    <>
      <div className="container-fluid pb-3 pt-3">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center pt-3">Featured Products</h2>
            {/* <!-- Swiper --> */}

            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {products.map((product) => {
  // Convert Windows-style paths to URL paths
  const imageUrl = product.image ? product.image.replace(/..\\images\\/, '/images/') : '';

  return (
    <SwiperSlide key={product._id}>
      <div className="card">
        {imageUrl && <img className='rounded' src={`${serverUrl}${imageUrl}`} alt={product.name} style={{ width: '100%', height: '450px' }}  />}
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <h5 className="card-title">${product.price}</h5>
          <p className="card-text">Lorem ipsum dolor sit amet</p>
         
            <button className="btn" onClick={() => addToCart(product._id)}>
              <i
                className="fa-sharp fa-solid fa-cart-shopping"
                style={{
                  float: "right",
                  paddingTop: "5px",
                  color: "#fbe5e9",
                  marginLeft: "8px",
                }}
              ></i>
              Add to Cart
            </button>
          
        </div>
      </div>
    </SwiperSlide>
  );
})}

            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
