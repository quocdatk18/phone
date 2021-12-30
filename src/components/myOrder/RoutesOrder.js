import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllOrder from './components/AllOrder/AllOrder';
import PenddingOrder from './components/PenddingOrder/PenddingOrder'
import ShippingOrder from './components/ShippingOrder/ShippingOrder'
import PaidOrder from './components/PaidOrder/PaidOrder'

function RoutesOrder(props) {
    return (
        <Routes>
            <Route path='/' element={<AllOrder />} />
            <Route path='/pendding' element={<PenddingOrder />} />
            <Route path='/shipping' element={<ShippingOrder />} />
            <Route path='/paid' element={<PaidOrder />} />

        </Routes>
    );
}

export default RoutesOrder;