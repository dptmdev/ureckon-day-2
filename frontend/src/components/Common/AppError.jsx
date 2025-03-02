import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppError = () => {
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className='text-danger'>We encountered an issue processing your request.</h5>
                <p className='mt-5'>This could be due to a broken link or a server error.</p>
                <p>Please try again later or go back to the <a href='#' onClick={handleCancel}>previous page.</a></p>
                <p>If the error perists, contact our support team further assistance.</p>
            </div>
        </div>
    );
};

export default AppError;