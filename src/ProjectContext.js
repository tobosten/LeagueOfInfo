import React, { createContext, useState } from "react";

export const ChampArrayContext = createContext(null)
export const UserInfoContext = createContext(null)
export const MasteryArrayContext = createContext(null)
export const EndpointServerContext = createContext(null)

const ProjectContext = ({ children }) => {

    const [champArray, setChampArray] = useState([])
    const [masteryArray, setMasteryArray] = useState([])
    const [userInfo, setUserInfo] = useState([{}])
    const [serverContext, setServerContext] = useState("euw1.api.riotgames.com")

    return (
        <ChampArrayContext.Provider value={{ champArray, setChampArray }}>
            <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
                <MasteryArrayContext.Provider value={{ masteryArray, setMasteryArray }}>
                    <EndpointServerContext.Provider value={{ serverContext, setServerContext }}>
                        {children}
                    </EndpointServerContext.Provider>
                </MasteryArrayContext.Provider>
            </UserInfoContext.Provider>
        </ChampArrayContext.Provider>
    )
}

export default ProjectContext;