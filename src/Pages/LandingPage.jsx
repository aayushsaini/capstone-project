import Navbar from "../Components/LandingPageComponents/Navbar/Navbar"
import Header from "../Components/LandingPageComponents/Header/Header"
import Middle from "../Components/LandingPageComponents/Middle/Middle"
import Footer from "../Components/LandingPageComponents/Footer/Footer"
import mainContext from "../Context/MainContext"
import { useContext } from "react"
import { useHistory } from "react-router-dom"

const LandingPage = () => {

    const history = useHistory();
    const user = useContext(mainContext);
    let c = false;

    if(user.userData.userName === "" && c) {
        history.push('/home');
        c = true;
    }

    return (
        <>
            <Navbar />
            <Header />
            <Middle />
            <Footer />
        </>
    )
}

export default LandingPage