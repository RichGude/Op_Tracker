import React, {useState, createContext} from "react";

export const OperContext = createContext();

export const OperContextProvider = props => {
    // Define state variables for all operations and commodities (prevents refetching data when adding or updating)
    const [operations, setOperations] = useState([]);
    const [commodities, setCommodities] = useState([]);

    const addOperations = (operation) => {
        setOperations([...operations, operation])
    };
    const addCommodities = (commodity) => {
        setCommodities([...commodities, commodity])
    };

    return (
        // Setting a object with a key and value with the same name only requires typing the name once
        <OperContext.Provider value={{ operations, setOperations, addOperations, commodities, setCommodities, addCommodities }}>
            {props.children}
        </OperContext.Provider>
    )
}