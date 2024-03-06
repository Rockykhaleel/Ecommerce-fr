import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Chategory from "./Pages/Chategory";
import AllProducts from "./Pages/AllProducts";
import "./App.css"
import Cart from "./Pages/Cart";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products"Products element={<Products />} />
          <Route path="/Login" exact element={<Login />} />
          <Route path="/Signup" exact element={<Signup />} />
          <Route path="/Chategory/:id" element={<Chategory />} />
          <Route path="/AllProducts" exact element={<AllProducts />} />
          <Route path="/Cart" exact element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
