import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <div>
            <section id="footer">
                <div className="footer">
                    <div className="footer-top">
                        <div className="footer-top-name">
                            <h2>mobile Store</h2>
                        </div>
                        <div className="footer-top-about">
                            <h2>about</h2>
                            <ul>
                                <li>
                                    <p>Về Chúng Tôi</p>
                                </li>
                                <li>
                                    <p>Blog</p>
                                </li>
                                <li>
                                    <p>Cơ Hội Nghề Nghiệp</p>
                                </li>
                                <li>
                                    <p>Cửa Hàng</p>
                                </li>
                                <li>
                                    <p><img src="https://theme.hstatic.net/1000075078/1000610097/14/gov.png?v=664" alt="name"></img></p>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-top-sp">
                            <h2>Always-on Support</h2>
                            <p>Support 028.71.087.088 (07:00-21:00)</p>
                            <p>Delivery 1800 6936 (07:00-21:00)</p>
                        </div>
                        <div className="footer-top-delivery">
                            <h2>Delivery</h2>
                            <ul>
                                <li>
                                    <p>Shipping methods</p>
                                </li>
                                <li>
                                    <p>Payment</p>
                                </li>
                                <li>
                                    <p>Cash voucher</p>
                                </li>
                                <li>
                                    <p>Shipping methods</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bot">

                        <p>Copyright © 2020 Mobistore. All rights reserved.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
