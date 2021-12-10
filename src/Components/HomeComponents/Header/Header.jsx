import React, { useContext } from 'react'
import "./Header.scss"
import { useLocation, Link } from "react-router-dom"
import { Icon } from '@chakra-ui/react'
import waterStat from "../../../Assets/waterStat.png"
import healthStat from "../../../Assets/healthStat.png"
import userContext from '../../../Context/MainContext'
import { RiShoppingCart2Line } from "react-icons/all"

const Header = (props) => {

    const user = useContext(userContext);

    const location = useLocation();
    const { pathname } = location;
    const title = pathname.split("/");
    let pageTitle;
    if (title[1] === "dashboard") pageTitle = "My Garden";
    else if (title[1] === "store") pageTitle = "Green Store";
    else if (title[1] === "community") pageTitle = "Garden Community"; 
    else if (title[1] === "cart") pageTitle = "Your Cart "; 


    const plantsData = props.data;
    let healthSum = 0;
    let waterSum = 0
    let total = 0;
    // eslint-disable-next-line
    plantsData && plantsData.map((item) => {
        if (item.health === "good") {
            healthSum += 1;
        }
        if (item.water === 1) {
            waterSum += 1;
        }
        total += 1;
    })

    const health = parseInt(((healthSum/total)*100))+'%';
    const water = parseInt(((waterSum/total)*100))+'%';

    return (
        <div className="header">
            <div className="title">{pageTitle}
                {(pageTitle === "My Garden" ?
                    <div className="stats">
                        <img src={waterStat} className="img1" alt="" /><span className="data1"> {water}</span> 
                        <img src={healthStat} className="img2" alt="" /><span className="data2"> {health}</span> 
                    </div> : null
                )}
                {(pageTitle === "Green Store" ?
                        <div className="shopping-cart" style={{'cursor':'pointer'}} >
                            <Link exact to="/cart"><Icon className="icon" as={RiShoppingCart2Line} /><span>{user.cart.length}</span></Link>
                        </div> : null
                )}
            </div>
            <div className="user">
                <div className="greet-user"><span>Hi,</span> {user.userData.userFirstName}</div>
                <div className="user-img">
                    <img src={user.userData.userPic} alt="" width="45px" />
                </div>
            </div>
        </div>
    )
}

export default Header
