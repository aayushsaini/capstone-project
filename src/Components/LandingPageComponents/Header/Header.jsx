import React from 'react'
import LeftHeader from './LeftHeader/LeftHeader'
import RightHeader from './RightHeader/RightHeader'
import "./Header.scss";

const Header = () => {
    return (
        <header>
            <LeftHeader />
            <RightHeader />
        </header>
    )
}

export default Header
