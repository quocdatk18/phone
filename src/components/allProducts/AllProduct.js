import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts, ProductsSelector } from '../../store/reducers/products/ProductsSlice'
import ListProduct from './ListProduct'

export default function AllProduct() {
    const products = useSelector(ProductsSelector)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            await dispatch(getAllProducts())
            setLoading(false)
        })()
    }, [dispatch])
    return (
        <div>
            {products && products.length > 0 ? (
                <ListProduct products={products} />) : (<span>Không có sản phẩm</span>
            )}
            {loading && <div className="d-flex align-items-center justify-content-center" style={{ height: "400px" }}>
                <img width="100" height="100" src="https://ntlogistics.vn/vendor/loader.gif" alt="" />
            </div>}
        </div>
    )
}

