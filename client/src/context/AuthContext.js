import React, { createContext, useState } from "react";

export const AuthoContext = createContext();

export const AuthoContextProvider = (props) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    return (
        <AuthoContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {props.children}
        </AuthoContext.Provider>
    );
};