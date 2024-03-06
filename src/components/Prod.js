import React from "react";

const Prod = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="back">
          <div className="text">
            <h2>Products</h2>
            <p className="to-center-text text-light">
                <ol class="breadcrumb text-center">
                    <li className="breadcrumb-item text-light"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active text-light" aria-current="page">Products</li>
                </ol>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prod;
