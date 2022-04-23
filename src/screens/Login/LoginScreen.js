import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { theme } from '../../theme'
import styles from './styles'
import { ChampArrayContext } from '../../ProjectContext'


const LoginScreen = ({ navigation }) => {

    const [sumName, setSumName] = useState("")
    const { champArray, setChampArray } = useContext(ChampArrayContext)
    const [loading, setLoading] = useState(false)

    async function login() {
        //fetch user
        /* "https://euw1.api.riotgames.com//lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}?api_key={apiKey}" */

        navigation.navigate("ChampSearch")
    }

    /* '#bc2b78' */

    return (
        <View style={{ flex: 1, backgroundColor: theme.darkBlue }}>
            {/* choose which region? */}
            <Text style={{ color: "white" }}> Only EUW</Text>
            <View style={styles.titleContainer}>
                <Text style={{ color: "white", fontSize: 30 }}>League of Info</Text>

            </View>

            <View style={styles.loginContainer}>
                <Text style={{ color: "white", marginRight: "auto", marginVertical: 5 }}>Summoner name</Text>
                <TextInput
                    style={styles.nameInput}
                    value={sumName}
                    onChangeText={setSumName}
                />
                <TouchableOpacity style={styles.loginButton} onPress={() => {
                    login()
                }}>
                    <Text style={{ color: "white", fontSize: 18 }}>Find me</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen