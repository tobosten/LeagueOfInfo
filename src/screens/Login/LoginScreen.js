import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import { theme } from '../../theme'
import styles from './styles'
import { UserInfoContext, MasteryArrayContext } from '../../ProjectContext'
import { constants } from '../../constants'
import { useToast } from 'react-native-toast-notifications'
import { ChampArrayContext } from '../../ProjectContext'
import LoginButton from '../../components/LoginButton'


const LoginScreen = ({ navigation }) => {

    const toast = useToast()
    const [sumName, setSumName] = useState("Ezuyi")
    const [loading, setLoading] = useState(false)
    const { userInfo, setUserInfo } = useContext(UserInfoContext)
    const { setMasteryArray } = useContext(MasteryArrayContext)
    const { setChampArray } = useContext(ChampArrayContext)

   

    useEffect(() => {
        axios.get(`http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json`)
            .then((resp) => {
                setChampArray(resp.data.data)
            })
    }, [])

    async function login() {
        //fetch user
        if (sumName !== "") {
            axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumName}?${constants.api_key}`)
                .then((resp) => {
                    console.log(resp.data);
                    let id = resp.data.id
                    setUserInfo(
                        {
                            accoundId: resp.data.accountId,
                            id: resp.data.id,
                            name: resp.data.name,
                            profileIconId: resp.data.profileIconId,
                            puuid: resp.data.puuid,
                            summonerLevel: resp.data.summonerLevel
                        }
                    )
                    axios.get(
                        `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?${constants.api_key}`
                    ).then((resp) => {
                        setMasteryArray(resp.data)
                        setSumName("")
                        navigation.navigate("DrawerNavigator")
                    })
                }).catch(() => {
                    toast.show("No summoner by that name")
                })
        } else {
            toast.show("Requires summoner name")
        }


    }

    /* '#bc2b78' */

    return (
        <View style={{ flex: 1, backgroundColor: theme.darkBlue }}>
            {/* choose which region? */}
            <Text style={{ color: "white", marginLeft: 10 }}>EUW</Text>
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
                <LoginButton onPress={() => login()} />
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