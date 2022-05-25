import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, Image } from 'react-native'
import { theme } from '../../theme'
import styles from './styles'
import { UserInfoContext, MasteryArrayContext } from '../../ProjectContext'
import { constants } from '../../constants'
import { useToast } from 'react-native-toast-notifications'
import { ChampArrayContext } from '../../ProjectContext'
import LoginButton from '../../components/LoginButton'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { isConfigured } from 'react-native-reanimated/lib/reanimated2/core'


const LoginScreen = ({ navigation }) => {

    const toast = useToast()
    const [sumName, setSumName] = useState("Ezuyi")
    const [prevUser, setPrevUser] = useState("")
    const [loading, setLoading] = useState(false)
    const { userInfo, setUserInfo } = useContext(UserInfoContext)
    const { setMasteryArray } = useContext(MasteryArrayContext)
    const { setChampArray } = useContext(ChampArrayContext)


    useEffect(() => {
        axios.get(`http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json`)
            .then((resp) => {
                setChampArray(resp.data.data)
            })

        getData()
    }, [])


    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem("key", jsonValue)
            getData()
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async () => {
        try {
            const prevName = await AsyncStorage.getItem("key")
            if (prevName !== null) {
                setPrevUser(prevName.replace(/"/g, ""))
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function login(value) {
        //fetch user
        if (value !== "") {
            storeData()
            axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${value}?${constants.api_key}`)
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
                        if (sumName != null) {
                            setSumName("")
                        }

                        navigation.navigate("DrawerNavigator")
                    })
                }).catch(() => {
                    toast.show("No summoner by that name")
                })
        } else {
            toast.show("Requires summoner name")
        }
        storeData(value)
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
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ height: "100%", paddingLeft: 5, flex: 1 }}
                        value={sumName}
                        onChangeText={setSumName}
                        placeholder={prevUser}
                    />
                    <TouchableOpacity style={{}} onPress={() => {
                        login(prevUser)
                    }}>
                        <Image
                            source={require("../../assets/buttons/prevNameAccept.png")}
                            style={{ height: 35, width: 35, marginRight: 5 }}
                        />
                    </TouchableOpacity>

                </View>

                {/* <LoginButton onPress={() => login()} /> */}
                <TouchableOpacity style={styles.loginButton} onPress={() => {
                    login(sumName)
                }}>
                    <Text style={{ color: "white", fontSize: 18 }}>Find me</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen