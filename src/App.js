import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';
import { loadUser } from './store/reducers/users/UserSlice';
import Loading from './components/loading/Loading'
import OrderPage from './pages/OrderPage';
import Payments from './components/payments/Payments';
import OrderSuccess from './components/orderSuccess/OrderSuccess';
import MyOrderPage from './pages/MyOrderPage';

function App() {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.loading)
  useEffect(() => {
    (async () => {
      await dispatch(loadUser())

    })()
  }, [dispatch])

  return (
    <div className="App">
      {loading && <Loading />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} ></Route>
          <Route path="/products" element={<ProductPage />} ></Route>
          <Route path="/cart" element={<CartPage />} ></Route>
          <Route path="/login" element={<LoginPage />} ></Route>
          <Route path="/register" element={<RegisterPage />} ></Route>
          <Route path="/order" element={<OrderPage />} ></Route>
          <Route path="/payment" element={<Payments />} ></Route>
          <Route path="/ordersuccess" element={<OrderSuccess />} ></Route>
          <Route path="/myorder/*" element={<MyOrderPage />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
