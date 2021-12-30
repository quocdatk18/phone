import React from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import ScrollToTop from '../components/scrollToTop/ScrollToTop'
import Carousel from '../components/slider/Carousel'
import Iphone from '../components/typeProducts/components/Iphone'
import Samsung from '../components/typeProducts/components/Samsung'
import Xiaomi from '../components/typeProducts/components/Xiaomi'
export default function HomePage() {
    return (
        <div>
            <Header />
            <Carousel />
            <Iphone />
            <Samsung />
            <Xiaomi />
            <Footer />
            <ScrollToTop />
        </div>
    )
}
