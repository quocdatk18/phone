
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Type.css'
import ListProduct from '../ListProduct'
import { handlePercentDiscount } from '../../../untils/index'
export default function Xiaomi() {
    const [name, setName] = useState('xiaomi');
    const [xiaomi, setIphone] = useState([])
    useEffect(() => {
        async function FetchApi() {
            try {
                const { data } = await axios.get(`http://localhost:5000/products/${name}`)
                setIphone(data)
            } catch (error) {
                console.log(error)
            }
        }
        FetchApi()
    }, [name, setName])

    return (
        <section id="typeProduct xiaomi">
            <div className="typeProduct">
                <h2 className="hot">{name}</h2>
                {
                    xiaomi ? (<ListProduct typeProducts={handlePercentDiscount(xiaomi)}></ListProduct>) : ''
                }
            </div>
        </section>
    )
}
