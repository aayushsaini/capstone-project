import React, { useContext } from 'react'
import mainContext from '../../../../Context/MainContext'
import "./LeftHeader.scss"
import sunflower from "../../../../Assets/sunflower.png"
import leaf1 from "../../../../Assets/Path8.png"
import { authentication } from '../../../../firebase-config'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useHistory } from "react-router-dom";

const LeftHeader = () => {

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
        <div className="left-header">
            <div className="content">
                <div className="messsage">
                    <h1 className="heading">Keep your plants happy with<br/>our <span className="usp">AI powered</span> suite for<br/> your <span>garden
                    <img className="flower"
                     src={sunflower} height="40px" alt=""/></span></h1>
                </div>
                <div className="cta">
                    <button className="cta-button" onClick={SignInWithGoogle}>Start Now</button>
                    <span className="cta-help">Need help? Contact us now!</span>
                </div>
            </div>
            <img src={leaf1} alt="" className="leaf1" />
        </div>
    )
}

export default LeftHeader
