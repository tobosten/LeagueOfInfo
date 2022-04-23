import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { theme } from '../theme'
import styles from './styles'
import { ChampArrayContext } from '../ProjectContext'


const LoginScreen = ({ navigation }) => {

    const [sumName, setSumName] = useState("")
    const { champArray, setChampArray } = useContext(ChampArrayContext)
    const [loading, setLoading] = useState(false)

    async function login() {
        await axios.get(`http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json`)
            .then((resp) => {
                setChampArray(resp.data.data)
                setLoading(true)
                /* console.log(resp.data.data); */
            }).then(() => {
                setTimeout(() => {
                    setLoading(false)
                    navigation.navigate("ChampSearch")
                }, 1500)
            })
    }

    /* '#bc2b78' */

    return (
        <View style={{ flex: 1, backgroundColor: theme.darkBlue }}>
            <View style={styles.titleContainer}>
                <Text style={{ color: "white", fontSize: 30 }}>League of Info</Text>
                <View style={{ alignItems: "center", justifyContent: 'center', height: 70, width: 70 }}>
                    <ActivityIndicator animating={loading} color={theme.orange} size="large"
                        style={{}} />
                </View>
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