import React, { createContext, useState } from "react";

export const ChampArrayContext = createContext([])

const ProjectContext = ({ children }) => {

    const [champArray, setChampArray] = useState([])

    return (
        <ChampArrayContext.Provider value={{ champArray, setChampArray }}>
            {children}
        </ChampArrayContext.Provider>
    )
}

export default ProjectContext;