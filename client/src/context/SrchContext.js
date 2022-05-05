import React, {useState, createContext} from "react";

export const SrchContext = createContext();

export const SrchContextProvider = props => {
    // Define state variables for a search string that looks for text on a card
    const [searchText, setSearchText] = useState("");
    // Define the features in which to look for the search text
    const searchParam = ['requirement', 'team', 'capability'];

    // Define state variable for a Team ID filter option
    const [filterParam, setFilterParam] = useState("All");

    // define search function for looking for text in the given card features
    const search = (items) => {
        return items.filter((item) => {
            if (item.team_id === filterParam || filterParam === "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(searchText.toLowerCase()) > -1
                    );
                });
            };
            
        });
    }

    return (
        // Setting a object with a key and value with the same name only requires typing the name once
        <SrchContext.Provider value={{ searchText, setSearchText, filterParam, setFilterParam, search }}>
            {props.children}
        </SrchContext.Provider>
    )
}