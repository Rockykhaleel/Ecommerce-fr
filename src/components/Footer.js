import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const Footer = () => {
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/category/getAllCategory')
      .then(response => {
        console.log(response.data); // Add this line to log the response data
        setCategories(response.data.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleClick = (id) => {
    
    navigate(`/Chategory/${id}`);
    };


  return (
    <>
    <div className="container-fluid">
  <div className="row">
    <div className="col-md-4 text-center">
    <p>
    <a className="navbar-brand" href='/'
        ><i
          className="fa-sharp fa-solid fa-bag-shopping"
          style={{color: "deeppink"}}
        ></i
        >&nbsp; ecommerce</a>
    </p>
        <p><span className='fw-bold'>Address : </span> Champ de Mars,<br/> 5 Avenue Anatole France,<br/> Paris, 75007 </p>
        <p><span className='fw-bold'>Phone : </span> +33-757-989-4444</p>
    </div>
    <div className="col-md-4">
      <h3 className='text-center'>Chategories</h3>
      
      <ul>
        <li></li>
        {categories.map((category) => (
          <li key={category._id}  onClick={() => handleClick(category._id, category.name)}>
            {category.name}
          </li>
              ))}
      </ul>
    </div>
    <div className="col-md-4">
      <h3 className="text-center">Quick Links</h3>
      <ul>
        <li><a className='text-dark' href='/'>Home</a></li>
        <li><a className='text-dark' href='/Contact'>Contact</a></li>
        <li><a className='text-dark' href='/Login'>Login</a></li>
        <li><a className='text-dark' href='/Signup'>Signup</a></li>
      </ul>
    </div>
  </div>
  <hr />
  <h4 className="text-center">Copyright &copy; Ecommerce 2023-24</h4>
</div>

    </>
  )
}

export default Footer