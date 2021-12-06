import React from 'react'
import "./MidRight.scss"
import midRight1 from "../../../../Assets/m1.png"
import midRight2 from "../../../../Assets/m2.png"
import midRight3 from "../../../../Assets/m3.png"
import mh1 from "../../../../Assets/mh1.png"
import mh2 from "../../../../Assets/mh2.png"
import mh3 from "../../../../Assets/mh3.png"

const MidRight = () => {
    return (
        <div className="mid-right">
            <div className="message">
                <div className="m1">
                    <img src={midRight1} className="mRImg" alt="" />
                    <div className="m-text">
                        <h1>AI powered diagnostic<br/><span>tools &nbsp;<img src={mh1} alt="" /></span></h1>
                        <p>Harness the power of cutting edge tech like AI,<br /> ML to keep a check on your plants' health</p>
                    </div>
                </div>
                <div className="m2">
                    <img src={midRight2} className="mRImg" alt="" />
                    <div className="m-text">
                        <h1>Our shop for all of your<br/>garden <span>needs &nbsp;<img src={mh2} alt="" /></span></h1>
                        <p>Get the most beautiful plants, healthy seeds &amp;<br />recommended fertilizers for your garden here</p>
                    </div>
                </div>
                <div className="m3">
                    <img src={midRight3} className="mRImg" alt="" />
                    <div className="m-text">
                        <h1>Need a helping hand?<br/>Talk to our <span>experts &nbsp;<img src={mh3} alt="" /></span></h1>
                        <p>Looking for extra helping hand for growing your<br/>your beautiful garden? Get consultation here!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MidRight
