import React from 'react'
import headerImg from "../../../../Assets/main.png"
import "./RightHeader.scss"
import leaf2 from "../../../../Assets/Path7.png"
import leaf3 from "../../../../Assets/Path5.png"

const RightHeader = () => {
    return (
        <div className="right-header">
            <img src={leaf2} alt="" className="leaf2" />
            <div className="content">
                <img src={headerImg} width="95%" alt="" />
            </div>
            <img src={leaf3} alt="" className="leaf3" />
        </div>
    )
}

export default RightHeader
