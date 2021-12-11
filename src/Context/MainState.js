import MainContext from "./MainContext"
import { useState } from "react"

const MainState = (props) => {

    // User's Context
    const user = {
        "userName": "",
        "userEmail": "",
        "userFirstName": "",
        "userLastName": "",
        "userPic": ""
    }
    const [ userData, setUserData ] = useState(user);
    const updateUser = (name, firstName, lastName, email, photo) => {
        setUserData({
            "userName": name,
            "userEmail": email,
            "userFirstName": firstName,
            "userLastName": lastName,
            "userPic": photo
        });
        
    }

    //Cart's Context
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const updateCart = (item) => {
        setCart(arr => [...arr, item]);
        setTotal(total+1);
    }

    //Blog's context
    const [isBlogRefresh, setIsBlogRefreshed] = useState(0);
    const blogRefresh = () => {
        setIsBlogRefreshed(isBlogRefresh+1);
    }

    return  (
        <MainContext.Provider value={{userData, updateUser, cart, updateCart, isBlogRefresh, blogRefresh}}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainState;