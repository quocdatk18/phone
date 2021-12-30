import React from 'react'
import { formatPrice } from '../../untils';
import { useDispatch } from 'react-redux'
import { deleteToCart, addtoCart, deleteQtyProduct } from '../../store/reducers/carts/CartSlice';

export default function Product(props) {
    const { product } = props;
    const dispatch = useDispatch()
    return (
        <div className="shopping-cart-list-product">
            <div className="shopping-cart-list-product-block">
                <div className="shopping-cart-list-product-block-left">
                    <img src={product.image} alt={product.name}></img>
                </div>
                <div className="shopping-cart-list-product-block-right">
                    <p className="product-name">
                        {product.name}
                    </p>
                    <p className="product-price">
                        {formatPrice(product.price)}
                    </p>
                </div>

                <div className="shopping-cart-list-product-bottom">
                    <ul className="button-event">
                        <li onClick={() => dispatch(deleteQtyProduct(product))}>-</li>
                        <li>{product.qty}</li>
                        <li onClick={() => dispatch(addtoCart(product))}>+</li>
                    </ul>
                    <button className="delete-product" onClick={() => dispatch(deleteToCart(product))}> Xóa khỏi giỏ hàng </button>
                </div>
            </div>
        </div >
    )
}
