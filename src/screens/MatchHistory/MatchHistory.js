import { View, Text, ScrollView, FlatList, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { styles } from './styles'
import { theme } from '../../theme'
import { UserInfoContext } from '../../ProjectContext'
import axios from 'axios'
import { constants } from '../../constants'
import ChampionImages from '../../assets/ChampionImages'
import { SummonerSpells } from '../../assets/SummonerSpells'

const MatchHistory = () => {

    const { userInfo } = useContext(UserInfoContext)

    const [matchInfo, setMatchInfo] = useState(null)
    const [gameModes, setGameModes] = useState(null)
    const [itemJson, setItemJson] = useState(null)
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/wjL06dfzQsgxCb1QeHfZezh6BKNckQxdllp2p4y13tQ70Iqn-us3KeqOVJU3leoaZhhugqGGAF-W-g/ids?start=0&count=20&${constants.api_key}`
        ).then((resp) => {
            let matchIDs = resp.data
            console.log(resp.data);
            /* forEach axios.get on 10 last games. */
            axios.get(
                `https://europe.api.riotgames.com/lol/match/v5/matches/${matchIDs[0]}?${constants.api_key}`
            ).then((resp) => {
                let data = resp.data
                let participants = resp.data.metadata.participants
                /* console.log(resp.data.info.gameMode);
                console.log("data", data.info.gameMode); */
                setMatchInfo([{ data: data, users: participants }])
            }).then(() => {
                axios.get(
                    `https://static.developer.riotgames.com/docs/lol/gameModes.json`
                ).then((resp) => {
                    /* console.log(resp.data[0]); */
                    /* setGameModes(resp.data) */
                    setGameModes(resp.data)
                })
                axios.get(
                    `https://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/item.json`
                ).then((resp) => {
                    console.log(Object.values(resp.data.data)[0]);
                })
            })
        })
    }, [])



    if (isLoading == true && matchInfo != null) {
        if (gameModes != null) {
            setIsLoading(false)
        }
    }



    const matchRender = ({ item, index }) => {
        let userStats = null
        let gameMode = ""
        matchInfo[index].data.info.participants.forEach((value) => {
            if (value.puuid == userInfo.puuid) {
                /* console.log("User puuid:", value.puuid) */;
                userStats = value
            }
        })

        console.log(matchInfo[index].data.info.gameMode);

        gameModes.forEach((value) => {
            if (value.gameMode == matchInfo[index].data.info.gameMode) {
                console.log(("Hej"));
                gameMode = value.gameMode
                if (value.gameMode == "CLASSIC") {
                    matchInfo[index].data.info.queueId == 400 ? gameMode = "Normals" : gameMode = "Ranked Solo"
                }
            }

        })

        let bottomBorder = {}
        userStats.win ? bottomBorder = { borderColor: "green" } : bottomBorder = { borderColor: "red" }

        return (
            <View>
                <View style={[{
                    backgroundColor: theme.mediumBlue,
                    width: "90%",
                    alignSelf: "center",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderBottomWidth: 2,
                }, bottomBorder]}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            color: theme.white,
                            fontSize: 20,
                            marginHorizontal: 10,
                            marginVertical: 5
                        }}>{gameMode}</Text>
                        <Text style={{
                            color: theme.white,
                            fontSize: 16,
                            marginLeft: 15
                        }}>17/22/19</Text>
                        <View style={{ width: 1, backgroundColor: theme.orange, height: 20, marginHorizontal: 5 }} />
                        <Text style={{
                            color: theme.white,
                            fontSize: 16
                        }}>200 cs</Text>
                        <Text style={{
                            color: theme.white,
                            fontSize: 16,
                            marginLeft: 15,
                            backgroundColor: theme.darkBlue,
                            borderWidth: 1,
                            borderColor: theme.orange,
                            paddingHorizontal: 5,
                            marginVertical: 2,
                            borderRadius: 3,
                            textAlign: "center"
                        }}>39:00</Text>
                    </View>


                    <View style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        paddingBottom: 10
                    }}>
                        <Image
                            source={ChampionImages[userStats.championName]}
                            style={{ width: 80, height: 80, borderRadius: 5 }}
                        />
                        <View style={{ marginLeft: 5, }}>
                            <Image
                                source={SummonerSpells[userStats.summoner1Id]}
                                style={{ width: 25, height: 25, borderRadius: 3 }}
                            />
                            <Image
                                source={SummonerSpells[userStats.summoner2Id]}
                                style={{ width: 25, height: 25, borderRadius: 3, marginTop: 5 }}
                            />
                        </View>
                        <View style={{ justifyContent: "center", marginHorizontal: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={styles.weaponImage} />
                                <View style={styles.weaponImage} />
                                <View style={styles.weaponImage} />
                                <View style={styles.weaponImage} />
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <View style={styles.weaponImage} />
                                <View style={styles.weaponImage} />
                                <View style={styles.weaponImage} />
                            </View>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Image
                                source={require("../../assets/Runes/Domination/HailOfBlades/HailOfBlades.png")}
                                style={{ height: 55, width: 55 }}
                            />
                            <Image
                                source={require("../../assets/Runes/7203_Whimsy.png")}
                                style={{ height: 25, width: 25 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: theme.darkBlue, flex: 1 }}>
            {isLoading ? (
                <ActivityIndicator animating={isLoading} color={theme.orange} size="large" style={{ marginTop: 100 }} />
            ) : (
                <View style={{ marginTop: 20 }}>
                    <FlatList
                        data={Object.values(matchInfo)}
                        renderItem={matchRender}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            )}
        </View>
    )
}

export default MatchHistory