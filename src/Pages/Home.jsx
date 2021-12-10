import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { getFirestore, collection, getDocs } from "firebase/firestore"
import mainContext from '../Context/MainContext'
import "./Home.scss"
import Header from '../Components/HomeComponents/Header/Header'
import Navbar from '../Components/HomeComponents/Navbar/Navbar'
import bgImage from "../Assets/home-bg.png"
import { BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import Dashboard from './DashboardPage/Dashboard'
import useFetch from '../Hooks/useFetch'
import Store from './StorePage/Store';
import Cart from './Cart/Cart'

const Home = (props) => {

    const user = useContext(mainContext);
    const history = useHistory();

    if (user.userData.userName === "") {
        history.push('/');
    }

    let data = useFetch('http://localhost:3090/plants');    
    const plantsData = data.data;


    const db = getFirestore();
    const colRef = collection(db, 'Store-plants');
    const colRef2 = collection(db, 'Store-raw');
    const [ plants, setPlants ] = useState([]);
    const [ gardenItems, setGardenItems ] = useState([]);
    useEffect(() => {
        getDocs(colRef)
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                var data = doc.data();
                setPlants(arr => [...arr, data]);
            })
        })

        getDocs(colRef2)
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                var data = doc.data();
                setGardenItems(arr => [...arr, data]);
            })
        })
        // eslint-disable-next-line
    }, [])

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
                    <Route exact path="/store">
                        <Store data1={plants} data2={gardenItems} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart />
                    </Route>
                    <Route exact path="/community"></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default Home
