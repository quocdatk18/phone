import React from 'react'
import Product from './Product';


export default function ListProduct(props) {

    const { typeProducts } = props;
    return (
        <div className="container">
            <div className="row">
                {
                    typeProducts.map((product, index) => (
                        <Product key={index} product={product} />
                    ))
                }

            </div>
        </div>
    )
}
