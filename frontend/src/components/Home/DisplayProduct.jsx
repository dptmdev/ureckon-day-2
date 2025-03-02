import React from 'react';
import { Link } from 'react-router-dom';
import productsData from '../../data/product.json';

const DisplayProduct = () => {
    const { products } = productsData;

    return (
        <div className="container">
            <div className="product-sec padT60">
                <h3>Featured Products</h3>
                <div className="product-detail padT60">
                    <div className="row"> 
                       
                    {products.map(product => ( 
                        <div key={product.id} className="col-md-3 col-sm-4 col-xs-12 product-list">
                            <div className="product-img">
                                <figure className="product-overlay">
                                    <img src={product.image} alt={product.name} />
                                    <figcaption className="product-res">
                                        <span className="vertical">new</span>
                                    </figcaption>
                                </figure>
                                <div className="product-sample">
                                    <h5>
                                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                                    </h5>
                                    <div className="col-md-7 col-sm-6 col-xs-6">
                                        <p>&#8377; {product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="col-md-5 col-sm-6 col-xs-6">
                                        <ul className="product-color-eight">
                                            <li>
                                                <span></span>
                                            </li>
                                            <li>
                                                <span></span>
                                            </li>
                                            <li>
                                                <span></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    ))} 
                            
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DisplayProduct
