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
import ModalDropdown from 'react-native-modal-dropdown';
import ServerSelect from '../../components/ServerSelect'
import { EndpointServerContext } from '../../ProjectContext'


const LoginScreen = ({ navigation }) => {

    const toast = useToast()
    const [sumName, setSumName] = useState("")
    const [prevUser, setPrevUser] = useState("")
    const [loading, setLoading] = useState(false)
    const { userInfo, setUserInfo } = useContext(UserInfoContext)
    const { setMasteryArray } = useContext(MasteryArrayContext)
    const { setChampArray } = useContext(ChampArrayContext)
    const { serverContext } = useContext(EndpointServerContext)

    /* used to display correct toast when no name */
    let findMe = 1
    let prevMe = 2

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

    async function login(value, bC) {
        //fetch user
        if (value !== "") {
            storeData()
            axios.get(`https://${serverContext}/lol/summoner/v4/summoners/by-name/${value}?${constants.api_key}`)
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
                        `https://${serverContext}/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?${constants.api_key}`
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
            if (bC == 1) {
                toast.show("Requires summoner name")
            } else {
                toast.show("Requires a previous user")
            }

        }
        storeData(value)
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.darkBlue }}>
            <ServerSelect />
            <View style={styles.titleContainer}>
                <Text style={{ color: "white", fontSize: 30 }}>League of Info</Text>
            </View>

            <View style={styles.loginContainer}>
                <View style={{ width: "100%", flexDirection: "row" }}>
                    <Text style={{ color: "white", marginRight: "auto", marginVertical: 5 }}>Summoner name</Text>
                    {/* <Text style={{ color: theme.white, fontSize: 10, marginTop: "auto", marginBottom: 3 }}>Previous name</Text> */}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ height: "100%", paddingLeft: 5, flex: 1, fontSize: 18 }}
                        value={sumName}
                        onChangeText={setSumName}
                        placeholder={prevUser}
                    />
                    <TouchableOpacity style={{}} onPress={() => {
                        login(prevUser, prevMe)
                    }}>
                        <Image
                            source={require("../../assets/buttons/prevNameAccept.png")}
                            style={{ height: 35, width: 35, marginRight: 5 }}
                        />
                    </TouchableOpacity>

                </View>

                {/* <LoginButton onPress={() => login()} /> */}
                <TouchableOpacity style={styles.loginButton} onPress={() => {
                    login(sumName, findMe)
                }}>
                    <Text style={{ color: "white", fontSize: 18 }}>Search</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default LoginScreen