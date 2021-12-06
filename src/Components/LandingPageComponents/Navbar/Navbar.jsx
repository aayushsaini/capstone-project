import React, { useContext } from 'react'
import userContext from '../../../Context/User/UserContext'
import logo from "../../../Assets/logo.png"
import "./Navbar.scss"
import { authentication } from '../../../firebase-config'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useHistory } from "react-router-dom";


const Navbar = () => {
    const history = useHistory();

    const user = useContext(userContext);

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
        <nav>
            <img src={logo} alt="Logo" className="logo" />
                <menu>
                    <ul>
                        <li>Features</li>
                        <li>About us</li>
                        <li>Contact us</li>
                    </ul>
                </menu>
            <button onClick={SignInWithGoogle}>Join now</button>
        </nav>
    )
}

export default Navbar
