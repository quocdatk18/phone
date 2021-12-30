import React from "react";
import MenuOrder from "./MenuOrder";
import "./MyOrder.css";
import RoutesOrder from "./RoutesOrder";



function MyOrder(props) {
    return (
        <section id="myorder">
            <div className="myorder">
                <MenuOrder />
                <div className="myorder-content">
                    <RoutesOrder></RoutesOrder>
                </div>
            </div>
        </section>
    );
}

export default MyOrder;
