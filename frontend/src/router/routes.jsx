import {lazy} from "react";

const HomepageScreen = lazy(() => import('../pages/Home/HomepageScreen'));
const ProductpageScreen = lazy(() => import('../pages/Product/ProductpageScreen'));

const routes = [
    { path: '/', name: 'Homepage', element: HomepageScreen },
    { path: '/products/:id', name: 'Productpage', element: ProductpageScreen },

];

export default routes;
