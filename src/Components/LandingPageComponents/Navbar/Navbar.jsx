import React, { useContext } from 'react'
import mainContext from '../../../Context/MainContext'
import logo from "../../../Assets/logo.png"
import "./Navbar.scss"
import { authentication } from '../../../firebase-config'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
// import { signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged  } from 'firebase/auth'
import { useHistory } from "react-router-dom";


const Navbar = () => {
    const history = useHistory();

    const user = useContext(mainContext);
    
    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    // if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     const uid = user.uid;
    //     console.log("User found");
    //     // ...
    // } else {
    //     console.log("No user...")
    // }
    // });

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
