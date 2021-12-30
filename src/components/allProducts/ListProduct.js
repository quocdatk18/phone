import React from 'react'
import Product from './Product';
import Footer from '../footer/Footer';

export default function ListProduct(props) {
    const { products } = props;
    return (
        <div className="container">
            <div className="row">
                {
                    products.map((product, index) => (

                        <Product key={index} product={product} />

                    ))
                }

            </div>
            <Footer />
        </div>
    )
}
