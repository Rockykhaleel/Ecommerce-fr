import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const Chategories = () => {
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
    <div>
      <div className="container-fluid pb-3 pt-3">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center pt-3">Chategories List</h2>
            {/* <!-- Swiper --> */}
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {categories.map((category) => (
                <SwiperSlide key={category._id}>
                    <div className="card" onClick={() => handleClick(category._id, category.name)}>
                    <div className="card-body">
                        <h5 className="card-title">{category.name}</h5>
                    </div>
                    </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chategories;
