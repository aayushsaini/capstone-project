import React, { useContext } from 'react'
import mainContext from '../../../Context/MainContext'

import "./Footer.scss"
import image from "../../../Assets/bigcta.png"
import leaf7 from "../../../Assets/Path5.png"
import leaf8 from "../../../Assets/Path7.png"
import leaf9 from "../../../Assets/Path8.png"

import { authentication } from '../../../firebase-config'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useHistory } from "react-router-dom";


const Footer = () => {

    const history = useHistory();

    const user = useContext(mainContext);

    const SignInWithGoogle = () => {

        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
        .then((res) => {
            console.log(res._tokenResponse);
            user.updateUser(res._tokenResponse.fullName, res._tokenResponse.firstName, res._tokenResponse.lastName, res._tokenResponse.email, res._tokenResponse.photoUrl);
            history.push('/home');
        })
        .catch((err) => {
            alert("Something went wrong, please try again");
            console.log(err);
        })
    }

    return (
        <div className="footer">
            <img src={leaf7} className="leaf7" alt="" />
            <img src={leaf8} className="leaf8" alt="" />
            <div className="cta">
                <img src={image} alt="" />
                <span>Let's get started with your<br />New garden management suite for FREE!<br/>
                <button onClick={SignInWithGoogle}>Sign up now</button>
                </span>
            </div>
            <img src={leaf9} className="leaf9" alt="" />
        </div>
    )
}

export default Footer
