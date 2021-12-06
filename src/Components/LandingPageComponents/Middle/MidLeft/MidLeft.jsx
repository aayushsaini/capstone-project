import React from 'react'
import main2 from "../../../../Assets/main2.png"
import gleaf from "../../../../Assets/mleaf2.png"
import leaf4 from "../../../../Assets/Path5.png"
import leaf5 from "../../../../Assets/Path7.png"
import leaf6 from "../../../../Assets/Path8.png"
import "./MidLeft.scss"

const MidLeft = () => {
    return (
        <div className="mid-left">
            <img src={leaf4} className="leaf4" alt="" />
            <img src={leaf5} className="leaf5" alt="" />
            <h1>One place for all your<br/> garden <span>needs&nbsp;
                <img src={gleaf} className="title-img" alt="" /></span>
            </h1>
            <div className="box"></div>
            <img
            src={main2}
            className="mid-img"
            alt="" />
            <img src={leaf6} className="leaf6" alt="" />
        </div>
    )
}

export default MidLeft
