import React, { useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import productsData from '../../data/product.json';
import { LiaShoppingCartSolid, LiaMagicSolid } from "react-icons/lia";
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const context = useOutletContext(); // Access the context
    const addToCart = context?.addToCart; 
    console.log("ADD TO CART ---->  ",addToCart) //undefined

    const increment = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    // Find the product based on the id from the URL
    const product = productsData.products.find(product => product.id === id);

    // Check if product exists
    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddToCart = () => {
        if (typeof addToCart === 'function') {
            addToCart({ ...product, quantity });
        } else {
            console.error("addToCart is not defined or not a function");
        }
    };

    const ARcall = async () => {
        try {
            const response = await axios.post('http://localhost:3001/tryon', { productName: product.name });
            if (response.data.message) {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error triggering AR:', error);
        }
    };
    
    return (
        <div className="product-page padTB60">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <figure className="product-page-image">
                            <img src={product.image} alt={product.name} className="w-50" />
                        </figure>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <div className="product-page-heading">
                            <h4>{product.name}</h4>
                            <h3>&#8377; {product.price.toFixed(2)}</h3>
                            <div className="product-rating">
                                <ul>
                                    <li>
                                        <a href="#"> {[...Array(5)].map((_, index) => (
                                            <i key={index} className={`fa ${index < Math.floor(product.rating) ? 'fa-star' : 'fa-star-o'}`} aria-hidden="true">
                                            </i>
                                        ))} 
                                        {product.rating % 1 >= 0.5 && (
                                            <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                        )} </a>
                                    </li>
                                    <li>
                                        <a href="#">({product.reviews} customer reviews)</a>
                                    </li>
                                </ul>
                            </div>
                            <p className="marT10">{product.details}</p>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="select-size">
                                    <select>
                                        <option value="0">Choose size: xs</option>
                                        <option>sm</option>
                                        <option>md</option>
                                        <option>lg</option>
                                        <option>xl</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="incress-button">
                                    <ul>
                                        <li>
                                            <button className="minus" onClick={decrement}>
                                                <i className="fa fa-minus" aria-hidden="true"></i>
                                            </button>
                                        </li>
                                        <li>
                                            <input type="text" value={quantity} readOnly className="qty" />
                                        </li>
                                        <li>
                                            <button className="add" onClick={increment}>
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="like-it">
                                    <button className="template-button" onClick={handleAddToCart}>
                                        <LiaShoppingCartSolid />
                                        Add to cart 
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="like-it">
                                    <button className="template-button" onClick={ARcall}>
                                        <LiaMagicSolid /> 
                                        Try on Me
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
