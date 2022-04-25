import React, { createContext, useState } from "react";

export const ChampArrayContext = createContext(null)
export const UserInfoContext = createContext(null)
export const MasteryArrayContext = createContext(null)

const ProjectContext = ({ children }) => {

    const [champArray, setChampArray] = useState([])
    const [masteryArray, setMasteryArray] = useState([])
    const [userInfo, setUserInfo] = useState([{}])

    return (
        <ChampArrayContext.Provider value={{ champArray, setChampArray }}>
            <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
                <MasteryArrayContext.Provider value={{masteryArray, setMasteryArray}}>
                    {children}
                </MasteryArrayContext.Provider>
            </UserInfoContext.Provider>
        </ChampArrayContext.Provider>
    )
}

export default ProjectContext;