import React from 'react'
import { Button, Image, message } from 'antd';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../store/reducers/carts/CartSlice';
import LazyLoad from 'react-lazyload'

export default function Product(props) {
    const { product } = props
    const { name, price, image } = product;
    const style1 = {

        height: '85px'
    }

    const dispatch = useDispatch()
    const success = () => {
        message.success(`đã thêm ${product.name} vào giỏ hàng`);
    };
    const handleAddToCart = () => {
        dispatch(addtoCart(product))
        success()
    }


    return (
        <>
            <div className="col col-md-3 " >
                <LazyLoad>
                    <div className="card mt-4" style={{ padding: '10px' }}>
                        <LazyLoad
                            once={true}
                            placeholder={<img src={`https://i.stack.imgur.com/h6viz.gif`} alt="..." />}
                        >
                            <Image
                                width={200}
                                src={product.image}
                            />
                        </LazyLoad>
                        <div className="card-body" >

                            <h5 className="card-title" >{name}</h5>
                            {/* <p className="card-text">Description: {description}</p> */}
                            <p className="card-text">{price}</p>
                        </div>
                        <Button type="primary" onClick={handleAddToCart}>
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                </LazyLoad>
            </div>
        </>

    )
}
