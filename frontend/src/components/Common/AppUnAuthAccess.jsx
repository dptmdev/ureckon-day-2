import React from 'react';

const AppUnAuthAccess = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className='text-danger'>Access denied, due to insufficient rights!</h5>
            </div>
        </div>
    );
};

export default AppUnAuthAccess;