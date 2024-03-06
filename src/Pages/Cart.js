import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from 'sweetalert2'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const serverUrl = "http://localhost:8080"; // replace with your server's URL

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `${serverUrl}/api/cart/getByUserId/${user.id}`
    );

    if (response.data.data && response.data.data.length > 0) {
      const cartData = response.data.data.flatMap((item) => item.products);
      const productPromises = cartData.map((cart) =>
        axios.get(`${serverUrl}/api/product/getProductById/${cart}`)
      );

      const productResponses = await Promise.all(productPromises);
      const products = productResponses.map((res) => res.data.data);
      setCartItems(products);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const incrementQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const deleteItem = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `${serverUrl}/api/cart/getByUserId/${user.id}`
    );

    if (response.data.data && response.data.data.length > 0) {
      const cartData = response.data.data;
      cartData.forEach(async (cart) => {
        if (cart.products.includes(productId)) {
          try {
            const response = await axios.delete(`${serverUrl}/api/cart/deleteById/${cart._id}`);
            if(response.status === 200){
              Swal.fire({
                icon:"warning",
                title:"Item deleted from cart"
              });
              // fetchData(); // refresh the cart items
              window.location.reload()
            }
          } catch (error) {
            console.error(error);
          }
        }
      });
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AdtCFyO3PnLbmm7zO9K06CRFdjahCFSQNtBTfmSkeAcTAySCmKLcF3B5WG7Kn6gW8VWn8tASh7g7hWO7" }}>
      <div>
        <Header />
        <div className="row">
          <div className="col-md-9">
            {cartItems.map((item, index) => {
              const imageUrl = item.image
                ? item.image.replace(/..\\images\\/, "/images/")
                : "";
              return (
                <div className="row" key={item._id + index}>
                  <div className="col-md-1"></div>
                  <div className="col-md-5">
                    {imageUrl && (
                      <img
                        className="rounded  m-1"
                        src={`${serverUrl}${imageUrl}`}
                        alt={item.name}
                        style={{ width: "250px", height: "250px" }}
                      />
                    )}
                  </div>
                  <div className="col-md-5">
                    <h2>{item.name}</h2>
                    <p>Price: {item.price}</p>
                    <p>Quantity: 
                      <button className="btn m-1"
            style={{color: "#fbe5e9", backgroundColor: "deeppink"}} onClick={() => incrementQuantity(item._id)}>
                      +
                    </button>
                      {item.quantity}
                      <button className="btn m-1"
            style={{color: "#fbe5e9", backgroundColor: "deeppink"}} onClick={() => decrementQuantity(item._id)}>
                      -
                    </button>
                    {/* Delete cart */}
                    <button className="btn m-1"
            style={{color: "#fbe5e9", backgroundColor: "deeppink"}}  onClick={() => deleteItem(item._id)}><i className="fa-solid fa-trash"></i></button>
                      </p>
                  </div>
                  <div className="col-md-1"></div>
                </div>
              );
            })}
          </div>
          <div className="col-md-3">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <h3 className="">Total: {getTotalPrice()}</h3>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: getTotalPrice(),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      alert("Transaction completed by " + details.payer.name.given_name);
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </PayPalScriptProvider>
  );
};

export default Cart;
