import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Navigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Chategory = () => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();
  const serverUrl = 'http://localhost:8080'; // replace with your server's URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/product/getProductByCategory/${id}`);
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching data from API', error);
      }
    };

    fetchData();
  }, [id]);

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
    <Header/>
    <div>
      {products.map((product) => {
        // Convert Windows-style paths to URL paths
        const imageUrl = product.image ? product.image.replace(/..\\images\\/, '/images/') : '';

        return (
          <div key={product._id}>
            <div className='row m-4'>
                <div className='col-md-2'></div>
                <div className='col-md-4'>
                    {imageUrl && <img className='rounded' src={`${serverUrl}${imageUrl}`} alt={product.name} style={{ width: '250px', height: '250px' }}  />}
                </div>
                <div className='col-md-4'>
                    <h2>{product.name}</h2>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
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
                <div className='col-md-2'></div>
            </div>
            
            
          </div>
        );
      })}
    </div>
    <Footer/>
    </>
  )
}

export default Chategory
