import React, { useContext } from 'react'
import "./Cart.scss"
import mainContext from "../../Context/MainContext"

const Cart = () => {
    const cart = useContext(mainContext).cart;
    const totalCost = cart.map((item) => {return item.totalPrice});
    const grandTotal = totalCost.reduce((a,b) => a+b,0);
    return (
        <div className="cart" style={{'color':'black'}}>
            <div className="container">
                {(cart.length > 0) && cart.map((item) => {
                    return (
                        <div className="item" key={null}>
                            <img src={item.img} alt="" />
                            <span className="itemName">{item.name}</span>
                            <span className="itemPrice">₹ {item.price} </span>
                            <span className="itemQty">x{item.qty} </span>
                            <span className="totalPrice">₹ {item.totalPrice} </span>
                        </div>
                    );
                })}
            </div>
            <button onClick={() => alert("This takes the user to the Payment Gateway")}>Make Payment of &nbsp; ₹ {grandTotal}</button>
        </div>
    )
}

export default Cart
