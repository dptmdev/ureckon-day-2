import React, { Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './css/style.css';
import './css/color.css';
import './css/responsive.css';

import DefaultLayout from './layouts/DefaultLayout';

function App() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(item => item.id === product.id);
            if (itemIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[itemIndex].quantity += product.quantity;
                return updatedCart;
            } else {
                return [...prevCart, product];
            }
        });
    };

    return (
        <div className="App">
            <Suspense
                fallback={
                    <InfinitySpin
                        visible={true}
                        width="200"
                        color="#4fa94d"
                        ariaLabel="infinity-spin-loading"
                    />
                }
            >
                <Routes>
                    <Route path="*" element={<DefaultLayout cart={cart} addToCart={addToCart} />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
