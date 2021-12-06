import UserContext from "./UserContext";
import { useState } from "react";

const UserState = (props) => {

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

    return  (
        <UserContext.Provider value={{userData, updateUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;