import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from '../../router/routes';
import { InfinitySpin } from 'react-loader-spinner';
import AppError from './AppError';

const AppContent = () => {
    return (
        <>
            <Suspense fallback={
                <InfinitySpin
                    visible={true}
                    width="200"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                />
            }>
                <Routes>
                    {routes.map((route, idx) => {
                        return (
                            route.element && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    element={<route.element />}
                                />
                            )
                        );
                    })}
                    <Route path="/" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<AppError />} />
                </Routes>
            </Suspense>

        </>
    );
};

export default AppContent;
