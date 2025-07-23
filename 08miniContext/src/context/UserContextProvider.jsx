import React from "react";
import UserContext from "./UserContext";
import { Children } from "react";
import { useState } from "react";

const UserContextProvider = ({children}) => {
    const [user, setuser] = useState(null)
    return (
        <UserContext.Provider value={{user, setuser}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider