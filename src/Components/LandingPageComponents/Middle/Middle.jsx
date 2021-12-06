import React from 'react'
import "./Middle.scss"
import MidLeft from './MidLeft/MidLeft'
import MidRight from './MidRight/MidRight'

const Middle = () => {
    return (
        <div className="middle">
            <MidLeft />
            <MidRight />
        </div>
    )
}

export default Middle
