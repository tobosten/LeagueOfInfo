import { View, Text, ScrollView, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { styles } from './styles'
import { theme } from '../../theme'
import { UserInfoContext } from '../../ProjectContext'
import axios from 'axios'
import { constants } from '../../constants'
import ChampionImages from '../../assets/ChampionImages'
import { SummonerSpells } from '../../assets/SummonerSpells'
import { runeImages } from '../../assets/runeImages'
import { ThemeContext } from 'react-navigation'

const MatchHistory = () => {

    const { userInfo } = useContext(UserInfoContext)

    const [matchInfo, setMatchInfo] = useState(null)
    const [gameModes, setGameModes] = useState(null)
    const [itemJson, setItemJson] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [runeJson, setRunesJson] = useState(null)
    const [moreGames, setMoreGames] = useState(false)

    const [matches, setMatches] = useState([])
    const [secondsMatches, setSecondMatches] = useState(null)


    let matchIDs = []
    let matchIDsP1 = []
    let matchIDsP2 = []
    let fullMatchObject = []

    async function fetchMatches(id) {
        await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/${matchIDsP1[id]}?${constants.api_key}`
        ).then((resp) => {
            fullMatchObject.push(resp.data)
        })

    }

    useEffect(() => {
        axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${userInfo.puuid}/ids?start=0&count=20&${constants.api_key}`
        ).then((resp) => {
            /* console.log(resp.data); */
            resp.data.forEach((value) => {
                matchIDs.push(value)
            })
            const halfWayIndex = Math.ceil(matchIDs.length / 2)
            matchIDsP1 = matchIDs.slice(0, halfWayIndex)
            matchIDsP2 = matchIDs.slice(halfWayIndex)

            /* loop axios.get on 10 last games. */
            for (let i = 0; i < matchIDsP1.length; i++) {
                fetchMatches(i)
            }
            setMatches(fullMatchObject)


            axios.get(
                `https://europe.api.riotgames.com/lol/match/v5/matches/${matchIDs[0]}?${constants.api_key}`
            ).then((resp) => {
                let data = resp.data
                let participants = resp.data.metadata.participants
                setMatchInfo([{ data: data, users: participants }])
            }).then(() => {
                axios.get(
                    `https://static.developer.riotgames.com/docs/lol/gameModes.json`
                ).then((resp) => {
                    setGameModes(resp.data)
                }).then(() => {
                    axios.get(

                        `https://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/runesReforged.json`
                    ).then((resp) => {
                        setRunesJson(resp.data)
                    })
                })
                /* https://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/item.json */

            })
        })
    }, [])

    if (isLoading == true && matches != null && runeJson != null) {
        if (gameModes != null) {
            setIsLoading(false)
        }
    }


    const matchRender = ({ item, index }) => {
        let userStats = null
        let gameMode = ""


        item.info.participants.forEach((value) => {
            if (value.puuid == userInfo.puuid) {
                /* console.log("User puuid:", value.puuid) */;
                userStats = value
            }
        })

        /* calculates seconds */
        let time = item.info.gameDuration
        let duration = (time / 60).toString()
        let getSec = duration.substring(duration.indexOf(".") + 1)
        getSec = `.${getSec}`
        getSec = parseFloat(getSec)
        let seconds = 60 * getSec
        let minutes = Math.floor(time / 60)


        let runeIDs = {
            primaryRunes: {
                style: userStats.perks.styles[0].style,
                main: userStats.perks.styles[0].selections[0].perk,
                sub1: userStats.perks.styles[0].selections[1].perk,
                sub2: userStats.perks.styles[0].selections[2].perk,
                sub3: userStats.perks.styles[0].selections[3].perk
            },
            secondaryRunes: {
                style: userStats.perks.styles[1].style,
                main: userStats.perks.styles[1].selections.style,
                sub1: userStats.perks.styles[1].selections[0].perk,
                sub2: userStats.perks.styles[1].selections[1].perk,
            }
        }




        let itemImageArray = [
            userStats.item0,
            userStats.item1,
            userStats.item2,
            userStats.item3,
            userStats.item4,
            userStats.item5,
            userStats.item6
        ]

        /* console.log(userStats.item0) */
        /* loop and get all item ids and images */
        /* Rune ids in endpoints */

        gameModes.forEach((value) => {
            if (value.gameMode == item.info.gameMode) {
                /* console.log(("Hej")); */
                gameMode = value.gameMode
                if (value.gameMode == "CLASSIC") {
                    item.info.queueId == 400 ? gameMode = "Normals" : gameMode = "Ranked Solo"
                }
            }

        })

        let bottomBorder = {}
        userStats.win ? bottomBorder = { borderColor: "green" } : bottomBorder = { borderColor: "red" }


        return (
            <View style={{ marginBottom: 10 }}>
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
                            fontSize: 18,
                            marginHorizontal: 10,
                            marginVertical: 5,
                            width: "30%"
                        }}>{gameMode}</Text>
                        <Text style={{
                            color: theme.white,
                            fontSize: 16,
                            marginLeft: 15
                        }}>{userStats.kills}/{userStats.deaths}/{userStats.assists}</Text>
                        <View style={{ width: 1, backgroundColor: theme.orange, height: 20, marginHorizontal: 5 }} />
                        <Text style={{
                            color: theme.white,
                            fontSize: 16
                        }}>{userStats.totalMinionsKilled} cs</Text>
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
                        }}>{`${minutes}:${seconds.toFixed(0)}`}</Text>
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
                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[0]}.png ` }}
                                    style={styles.itemImage} />
                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[1]}.png ` }}
                                    style={styles.itemImage} />
                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[2]}.png ` }}
                                    style={styles.itemImage} />

                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[6]}.png ` }}
                                    style={styles.itemImage} />
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[3]}.png ` }}
                                    style={styles.itemImage} />
                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[4]}.png ` }}
                                    style={styles.itemImage} />
                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[5]}.png ` }}
                                    style={styles.itemImage} />
                            </View>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Image
                                /* require(`../../assets/Runes/Domination/HailOfBlades/HailOfBlades.png`) */
                                source={runeImages[runeIDs.primaryRunes.main]}
                                style={{ height: 55, width: 55 }}
                            />
                            <Image
                                source={runeImages[runeIDs.secondaryRunes.style]}
                                style={{ height: 25, width: 25 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    const matchRender2 = ({ item, index }) => {
        let userStats = null
        let gameMode = ""


        item.info.participants.forEach((value) => {
            if (value.puuid == userInfo.puuid) {
                /* console.log("User puuid:", value.puuid) */;
                userStats = value
            }
        })

        /* calculates seconds */
        let time = item.info.gameDuration
        let duration = (time / 60).toString()
        let getSec = duration.substring(duration.indexOf(".") + 1)
        getSec = `.${getSec}`
        getSec = parseFloat(getSec)
        let seconds = 60 * getSec
        let minutes = Math.floor(time / 60)


        let runeIDs = {
            primaryRunes: {
                style: userStats.perks.styles[0].style,
                main: userStats.perks.styles[0].selections[0].perk,
                sub1: userStats.perks.styles[0].selections[1].perk,
                sub2: userStats.perks.styles[0].selections[2].perk,
                sub3: userStats.perks.styles[0].selections[3].perk
            },
            secondaryRunes: {
                style: userStats.perks.styles[1].style,
                main: userStats.perks.styles[1].selections.style,
                sub1: userStats.perks.styles[1].selections[0].perk,
                sub2: userStats.perks.styles[1].selections[1].perk,
            }
        }




        let itemImageArray = [
            userStats.item0,
            userStats.item1,
            userStats.item2,
            userStats.item3,
            userStats.item4,
            userStats.item5,
            userStats.item6
        ]

        /* console.log(userStats.item0) */
        /* loop and get all item ids and images */
        /* Rune ids in endpoints */

        gameModes.forEach((value) => {
            if (value.gameMode == item.info.gameMode) {
                /* console.log(("Hej")); */
                gameMode = value.gameMode
                if (value.gameMode == "CLASSIC") {
                    item.info.queueId == 400 ? gameMode = "Normals" : gameMode = "Ranked Solo"
                }
            }

        })

        let bottomBorder = {}
        userStats.win ? bottomBorder = { borderColor: "green" } : bottomBorder = { borderColor: "red" }


        return (
            <View style={{ marginBottom: 10 }}>
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
                            fontSize: 18,
                            marginHorizontal: 10,
                            marginVertical: 5,
                            width: "30%"
                        }}>{gameMode}</Text>
                        <Text style={{
                            color: theme.white,
                            fontSize: 16,
                            marginLeft: 15
                        }}>{userStats.kills}/{userStats.deaths}/{userStats.assists}</Text>
                        <View style={{ width: 1, backgroundColor: theme.orange, height: 20, marginHorizontal: 5 }} />
                        <Text style={{
                            color: theme.white,
                            fontSize: 16
                        }}>{userStats.totalMinionsKilled} cs</Text>
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
                        }}>{`${minutes}:${seconds.toFixed(0)}`}</Text>
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
                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[0]}.png ` }}
                                    style={styles.itemImage} />
                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[1]}.png ` }}
                                    style={styles.itemImage} />
                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[2]}.png ` }}
                                    style={styles.itemImage} />

                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[6]}.png ` }}
                                    style={styles.itemImage} />
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[3]}.png ` }}
                                    style={styles.itemImage} />
                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[4]}.png ` }}
                                    style={styles.itemImage} />
                                <Image
                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${itemImageArray[5]}.png ` }}
                                    style={styles.itemImage} />
                            </View>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Image
                                /* require(`../../assets/Runes/Domination/HailOfBlades/HailOfBlades.png`) */
                                source={runeImages[runeIDs.primaryRunes.main]}
                                style={{ height: 55, width: 55 }}
                            />
                            <Image
                                source={runeImages[runeIDs.secondaryRunes.style]}
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
                        data={matches} /* Object.values(matchInfo) */
                        renderItem={matchRender}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            )}
        </View>
    )
}

export default MatchHistory