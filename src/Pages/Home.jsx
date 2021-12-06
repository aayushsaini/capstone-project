import React, { useContext } from 'react'
import userContext from '../Context/User/UserContext'
import "./Home.scss"
import Header from '../Components/HomeComponents/Header/Header'
import Navbar from '../Components/HomeComponents/Navbar/Navbar'
import bgImage from "../Assets/home-bg.png"
import { BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import Dashboard from './DashboardPage/Dashboard'
import useFetch from '../Hooks/useFetch'

const Home = (props) => {

    const user = useContext(userContext);
    const history = useHistory();

    if (user.userData.userName === "") {
        history.push('/');
    }

    let data = useFetch('http://localhost:3090/plants');    
    const plantsData = data.data;

    return (
        <Router>
            <div className="home">
                <img src={bgImage} alt="" className="bgImage" />
                <Navbar />
                <Header data={plantsData} />
                <Switch>
                    <Route exact path="/dashboard">
                        <Dashboard data={plantsData} />
                    </Route>
                    <Route exact path="/store"></Route>
                    <Route exact path="/community"></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default Home
