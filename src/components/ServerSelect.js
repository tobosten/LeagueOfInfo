import { View, Text, TouchableOpacity, Touchable } from 'react-native'
import React, { useState, useContext } from 'react'
import { theme } from '../theme'
import { EndpointServerContext } from '../ProjectContext'

const ServerSelect = ({ server }) => {

    const { serverContext, setServerContext } = useContext(EndpointServerContext)
    const [westSelected, setWestSelected] = useState({ borderColor: theme.orange })
    const [eastSelected, setEastSelected] = useState({})

    let euw = "euw1.api.riotgames.com"
    let eune = "eun1.api.riotgames.com"


    return (
        <View style={{ marginLeft: "auto" }}>
            <Text style={{ color: theme.white, marginVertical: 5 }}>Select server</Text>
            <View style={{ backgroundColor: theme.white, height: 70, width: 100, borderRadius: 5 }}>
                <TouchableOpacity style={[{ flex: 1, alignItems: "center", justifyContent: "center" }]}
                    onPress={() => {
                        setWestSelected({ borderColor: theme.orange })
                        setEastSelected({})
                        setServerContext(euw)
                    }}>
                    <View style={[{ borderWidth: 1, borderColor: theme.white, paddingHorizontal: 30, paddingVertical: 3, borderRadius: 3 }, westSelected]}>
                        <Text>EUW</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ backgroundColor: theme.mediumBlue, height: 1, width: "90%", alignSelf: "center" }} />
                <TouchableOpacity style={[{ flex: 1, alignItems: "center", justifyContent: "center" }]}
                    onPress={() => {
                        setEastSelected({ borderColor: theme.orange })
                        setWestSelected({})
                        setServerContext(eune)
                    }}>
                    <View style={[{ borderWidth: 1, borderColor: theme.white, paddingHorizontal: 30, paddingVertical: 3, borderRadius: 3 }, eastSelected]}>
                        <Text>EUNE</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default ServerSelect