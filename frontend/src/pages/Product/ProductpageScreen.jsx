import React from 'react';
import { Link } from 'react-router-dom';
import ProductDetails from '../../components/Product/ProductDetails';
import DisplayProduct from '../../components/Home/DisplayProduct';


const ProductpageScreen = () => {
  return (
    <>
        <div className="inner-content">
          <div className="breadcrumb-section">
              <div className="container">
                <h3>product</h3>
                <ul className="breadcrumb">
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li className="active">product</li>
                </ul>
              </div>
          </div>

          <ProductDetails/>
          
          <DisplayProduct/>

        </div>
    </>
  )
}

export default ProductpageScreen
