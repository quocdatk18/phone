
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Type.css'
import ListProduct from '../ListProduct'
import { handlePercentDiscount } from '../../../untils/index'
export default function Samsung() {
    const [name, setName] = useState('samsung');
    const [samsung, setIphone] = useState([])
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
        <section id="typeProduct">
            <div className="typeProduct">
                <h2 className="hot">{name}</h2>
                {
                    samsung ? (<ListProduct typeProducts={handlePercentDiscount(samsung)}></ListProduct>) : ''
                }
            </div>
        </section>
    )
}
