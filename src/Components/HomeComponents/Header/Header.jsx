import React, { useContext } from 'react'
import "./Header.scss"
import { useLocation } from "react-router-dom"
import { Spacer } from '@chakra-ui/react'
import userImg from "../../../Assets/user.png"
import waterStat from "../../../Assets/waterStat.png"
import healthStat from "../../../Assets/healthStat.png"
import userContext from '../../../Context/User/UserContext'


const Header = (props) => {

    const user = useContext(userContext);
    const userProfileImg = userImg;

    const location = useLocation();
    const { pathname } = location;
    const title = pathname.split("/");
    let pageTitle;
    if (title[1] === "dashboard") pageTitle = "My garden";
    else if (title[1] === "store") pageTitle = "Green Store";
    else if (title[1] === "community") pageTitle = "Garden Community"; 


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
                <div className="stats">
                    <img src={waterStat} className="img1" alt="" /><span className="data1"> {water}</span> 
                    <img src={healthStat} className="img2" alt="" /><span className="data2"> {health}</span> 
                </div>
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
