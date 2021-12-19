import React, { useContext } from 'react'
import "./Navbar.scss"
import logo from "../../../Assets/logo.png"
import { useLocation, Link } from "react-router-dom";
import welcome from  "../../../Assets/welcome.png"
import mainContext from '../../../Context/MainContext'

const Navbar = () => {

    const user = useContext(mainContext);

    //assigning location variable
    const location = useLocation();
    //destructuring pathname from location
    const { pathname } = location;
    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

    return (
        <div className="navbar">
            <img src={logo} alt="" className="logo" />
                {splitLocation[1]==="home"?<>
                                                <img src={welcome} className="bgImage2" alt="" />
                                                <span className="welcome">Welcome, {user.userData.userFirstName}!👋</span>
                                           </>:null}
            <div className="nav">
                <div className={splitLocation[1] === "dashboard" ? "nav-item1 active" : "nav-item1"}>
                    <Link exact to="/dashboard"><span className="link">Dashboard</span></Link>
                </div>
                <div className={splitLocation[1] === "store" ? "nav-item2 active" : "nav-item2"}>
                    <Link exact to="/store"><span className="link">Buy from Store</span></Link>
                </div>
                <div className={splitLocation[1] === "community" ? "nav-item3 active" : "nav-item3"}>
                    <Link exact to="/community"><span className="link">Community</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
