import {
    View, Text, ActivityIndicator, Image, ScrollView, TouchableOpacity, ImageBackground,
    FlatList, VirtualizedList, SafeAreaView, LogBox
} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { theme } from '../../theme'
import axios from 'axios'
import styles from './styles'
import { UserInfoContext, MasteryArrayContext } from '../../ProjectContext'
import { constants } from '../../constants'
import { MasteryImages } from '../../assets/MasteryImages'
import { useToast } from 'react-native-toast-notifications'

const ChampDetails = ({ route, navigation }) => {

    /* LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]); */
    const toast = useToast()


    /* let champName = "Syndra" */
    const { champName, champId } = route.params
    const [loading, setLoading] = useState(true)
    const [champJson, setChampJson] = useState(Object)
    let buttonArray = ["Q", "W", "E", "R", "P"]
    const [selectedSpellIndex, setSelectedSpellIndex] = useState(0)
    const [spellInformation, setSpellInformation] = useState([])
    const [champMastery, setChampMastery] = useState({})
    const { userInfo } = useContext(UserInfoContext)
    const { masteryArray } = useContext(MasteryArrayContext)



    useEffect(() => {
        axios.get(`https://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/${champName}.json`)
            .then((resp) => {
                let champObject = resp.data.data
                setChampJson(resp.data.data)
                setSpellInformation([
                    {
                        image: champObject[champName].spells[0].image.full,
                        name: champObject[champName].spells[0].name,
                        cooldown: champObject[champName].spells[0].cooldownBurn,
                        cost: champObject[champName].spells[0].costBurn,
                        range: champObject[champName].spells[0].rangeBurn,
                        description: champObject[champName].spells[0].description
                    }, {
                        image: champObject[champName].spells[1].image.full,
                        name: champObject[champName].spells[1].name,
                        cooldown: champObject[champName].spells[1].cooldownBurn,
                        cost: champObject[champName].spells[1].costBurn,
                        range: champObject[champName].spells[1].rangeBurn,
                        description: champObject[champName].spells[1].description
                    }, {
                        image: champObject[champName].spells[2].image.full,
                        name: champObject[champName].spells[2].name,
                        cooldown: champObject[champName].spells[2].cooldownBurn,
                        cost: champObject[champName].spells[2].costBurn,
                        range: champObject[champName].spells[2].rangeBurn,
                        description: champObject[champName].spells[2].description
                    }, {
                        image: champObject[champName].spells[3].image.full,
                        name: champObject[champName].spells[3].name,
                        cooldown: champObject[champName].spells[3].cooldownBurn,
                        cost: champObject[champName].spells[3].costBurn,
                        range: champObject[champName].spells[3].rangeBurn,
                        description: champObject[champName].spells[3].description
                    },
                    {
                        image: champObject[champName].passive.image.full,
                        name: champObject[champName].passive.name,
                        description: champObject[champName].passive.description
                    },
                ])
                masteryArray.forEach((value) => {
                    if (champObject[champName].key == value.championId) {

                        setChampMastery({
                            championId: value.championId,
                            championLevel: value.championLevel,
                            championPoints: value.championPoints,
                            chestGranted: value.chestGranted
                        })
                    }
                })

            }).then(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 200)
            })
    }, [])


    const abilityRenderItem = ({ item, index }) => {
        let uri = `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/${item.image}`
        if (index == 4) { uri = `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/passive/${item.image}` }

        return (
            <View style={styles.abilityView}>
                <TouchableOpacity style={[{ borderWidth: 1, borderColor: theme.orange, borderRadius: 10 }, styles.shadow]}
                    onPress={() => {
                        setSelectedSpellIndex(index)
                        //not updating in time to show ability
                        console.log(index, item)
                    }}
                >
                    <ImageBackground
                        source={{ uri: uri }}
                        /*  source={{ uri: uri }} */
                        style={styles.abilityImage}
                        imageStyle={{ borderRadius: 10 }}
                    >
                        <View style={{ backgroundColor: theme.darkBlue, width: 15, heigth: 15, margin: 3, borderRadius: 2, borderWidth: .5, borderColor: theme.white }}>
                            <Text style={{
                                color: theme.white,
                                textAlign: "center",
                                fontSize: 12
                            }}>{buttonArray[index]}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <View style={{}}>
                    <Text style={styles.abilityText}>{spellInformation[index].name}</Text>
                </View>
            </View>
        )
    }

    function selectedSpellView() {

        /* let description = spellInformation[selectedSpellIndex].description.replace(/<br>/g, "\n") */

        let data = Object.entries(spellInformation[selectedSpellIndex].description)

        for (let i = 0; i < data.length; i++) {
            if (data[i][1] == "<") {
                /* removes <br> */
                if (data[i + 1][1] == "b") {
                    if (data[i + 4][1] == "<") {
                        if (data[i + 5][1] == "b") {
                            data.splice(i + 7, 1)
                            data.splice(i + 6, 1)
                            data.splice(i + 5, 1)
                            data[i + 4][1] = "\n"
                        }
                    }
                    data.splice(i + 3, 1)
                    data.splice(i + 2, 1)
                    data.splice(i + 1, 1)
                    data[i][1] = "\n"
                }
                /* removes <font color='#FF9900'> */
                if (data[i + 1][1] == "f") {
                    data.splice(i + 21, 1)
                    data.splice(i + 20, 1)
                    data.splice(i + 19, 1)
                    data.splice(i + 18, 1)
                    data.splice(i + 17, 1)
                    data.splice(i + 16, 1)
                    data.splice(i + 15, 1)
                    data.splice(i + 14, 1)
                    data.splice(i + 13, 1)
                    data.splice(i + 12, 1)
                    data.splice(i + 11, 1)
                    data.splice(i + 10, 1)
                    data.splice(i + 9, 1)
                    data.splice(i + 8, 1)
                    data.splice(i + 7, 1)
                    data.splice(i + 6, 1)
                    data.splice(i + 5, 1)
                    data.splice(i + 4, 1)
                    data.splice(i + 3, 1)
                    data.splice(i + 2, 1)
                    data.splice(i + 1, 1)
                    data.splice(i, 1)
                }
                /* removes </font> */
                if (data[i + 2][1] == "f") {
                    data.splice(i + 6, 1)
                    data.splice(i + 5, 1)
                    data.splice(i + 4, 1)
                    data.splice(i + 3, 1)
                    data.splice(i + 2, 1)
                    data.splice(i + 1, 1)
                    data.splice(i, 1)
                }
                /* removes <keywordMinor>*/
                try { // Fixes champions like ex. Braum, with undefined value
                    if (data[i + 1][1] == "k") {
                        data.splice(i + 13, 1)
                        data.splice(i + 12, 1)
                        data.splice(i + 11, 1)
                        data.splice(i + 10, 1)
                        data.splice(i + 9, 1)
                        data.splice(i + 8, 1)
                        data.splice(i + 7, 1)
                        data.splice(i + 6, 1)
                        data.splice(i + 5, 1)
                        data.splice(i + 4, 1)
                        data.splice(i + 3, 1)
                        data.splice(i + 2, 1)
                        data.splice(i + 1, 1)
                        data.splice(i, 1)
                    }
                    /* removes </keywordMinor>  */
                    if (data[i + 2][1] == "k") {
                        data.splice(i + 14, 1)
                        data.splice(i + 13, 1)
                        data.splice(i + 12, 1)
                        data.splice(i + 11, 1)
                        data.splice(i + 10, 1)
                        data.splice(i + 9, 1)
                        data.splice(i + 8, 1)
                        data.splice(i + 7, 1)
                        data.splice(i + 6, 1)
                        data.splice(i + 5, 1)
                        data.splice(i + 4, 1)
                        data.splice(i + 3, 1)
                        data.splice(i + 2, 1)
                        data.splice(i + 1, 1)
                        data.splice(i, 1)

                    }
                } catch (e) {
                    /* console.log(e); */
                }

            }
        }

        let string = ""

        for (let i = 0; i < data.length; i++) {
            string += data[i][1]
        }

        return (
            <View style={{
                padding: 15,
                backgroundColor: theme.mediumBlue,
                width: "90%",
                alignSelf: "center",
                marginBottom: 20,
                borderRadius: 5,
                alignItems: "center"
            }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={[styles.shadow, { borderWidth: 3, borderColor: theme.darkBlue, borderRadius: 10, marginLeft: 5 }]}>
                        <Image
                            source={selectedSpellIndex > 3 ?
                                { uri: `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/passive/${spellInformation[selectedSpellIndex].image}` }
                                :
                                { uri: `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/${spellInformation[selectedSpellIndex].image}` }}
                            style={{ height: 70, width: 70 }}
                        />
                    </View>
                    <View style={{ flex: 1, borderWidth: 1, borderRadius: 2, marginHorizontal: 20, borderColor: theme.orange, backgroundColor: theme.lighterBlue }}>
                        <Text style={{ color: theme.white, fontSize: 18, margin: 10, textAlign: "center" }}>{spellInformation[selectedSpellIndex].name}</Text>
                    </View>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: theme.lighterBlue, width: "100%", marginVertical: 10 }} />
                <View style={{ marginHorizontal: 5 }}>
                    {/* Check if fields exists before displaying */}
                    {selectedSpellIndex == 4 ? (
                        <View>
                            <View style={{}}>
                                <Text style={{ color: theme.white, fontSize: 18 }}>Description</Text>
                                <Text style={styles.baseStatsText}>{string}</Text>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.baseStatsText}>Cooldown: {spellInformation[selectedSpellIndex].cooldown} s</Text>
                            <Text style={styles.baseStatsText}>Cost: {spellInformation[selectedSpellIndex].cost} {champJson[champName].partype}</Text>
                            <Text style={styles.baseStatsText}>Range: {spellInformation[selectedSpellIndex].range}</Text>
                            <View style={{ marginTop: 15 }}>
                                <Text style={{ color: theme.white, fontSize: 18 }}>Description</Text>
                                <Text style={styles.baseStatsText}>{string}</Text>
                            </View>
                        </View>
                    )}


                </View>
            </View >
        )
    }


    function checkMastery() {
        let source = ""
        switch (champMastery.championLevel) {
            case 1: source = MasteryImages.mastery1;
                break;
            case 2: source = MasteryImages.mastery2;
                break;
            case 3: source = MasteryImages.mastery3;
                break;
            case 4: source = MasteryImages.mastery4;
                break;
            case 5: source = MasteryImages.mastery5;
                break;
            case 6: source = MasteryImages.mastery6;
                break;
            case 7: source = MasteryImages.mastery7;
                break;
            default: source = MasteryImages.mastery0
        }

        let image = <Image
            source={source}
            style={{ width: 100, height: 100, marginVertical: 10, borderRadius: 30 }}
        />
        return image
    }

    function checkMasteryTitle() {
        let masteryTitle = constants.masteryTitles[champMastery.championLevel >= 1 ? champMastery.championLevel : 0][champJson[champName].tags[0]]
        return <Text style={{ color: theme.white, fontSize: 18 }}>{masteryTitle}</Text>
    }

    //img size
    let height = 300
    let width = height * 0.55

    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: theme.darkBlue }}>
            {loading ? (
                <View style={{ marginTop: "50%" }}>
                    <ActivityIndicator animating={loading} color={theme.orange} size="large"
                        style={{}} />
                </View>
            ) : (
                <FlatList
                    data={[]}
                    renderItem={() => undefined}
                    ListHeaderComponent={
                        <View>
                            <View style={{ width: "90%", alignSelf: "center", marginTop: 20, flexDirection: "row" }}>
                                <View style={{ flex: 1 }}>
                                    <Image
                                        source={{ uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg` }}
                                        style={{ height: height, width: width, borderRadius: 5, borderColor: theme.orange, borderWidth: .7 }}
                                    />
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", backgroundColor: theme.mediumBlue, borderRadius: 5 }}>
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <View style={[{
                                            alignItems: "center",
                                            backgroundColor: theme.mediumBlue,
                                            padding: 10,
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            borderColor: theme.darkBlue
                                        },
                                        styles.shadow]}>
                                            <Text style={{ fontSize: 24, color: theme.white }}>{champName}</Text>
                                            <Text style={{ color: theme.white, fontSize: 16 }}>
                                                {champJson[champName].title.charAt(0).toUpperCase() + champJson[champName].title.slice(1)}
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
                                            {checkMasteryTitle()}
                                            {checkMastery()}
                                            <Text style={{ color: theme.white }}>
                                                {champMastery.championPoints > 0 ? `Mastery: ${champMastery.championPoints}` : "Not played"}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.loreMainContainer}>
                                <View style={styles.loreContainer}>
                                    <Text style={styles.loreTitle}>Lore</Text>
                                    <View style={{ borderBottomWidth: 1, width: "100%", borderColor: theme.lighterBlue, alignSelf: "center", marginVertical: 5 }} />
                                    <Text style={{ color: theme.white }}>{champJson[champName].lore}</Text>
                                </View>
                            </View>

                            <View style={{
                                borderWidth: 1,
                                borderColor: theme.orange,
                                width: "90%",
                                borderRadius: 5,
                                backgroundColor: theme.mediumBlue,
                                marginVertical: 20,
                                alignSelf: "center",
                            }}>
                                <FlatList
                                    data={Object.values(spellInformation)}
                                    renderItem={abilityRenderItem}
                                    keyExtractor={(item, index) => index}
                                    numColumns={3}
                                    style={{ alignSelf: "center" }}
                                />
                            </View>
                        </View >
                    }
                    ListFooterComponent={
                        <View>
                            {selectedSpellView()}
                            <View style={styles.baseStatsContainer}>
                                <Text style={styles.baseStatsTitle}>Base Stats</Text>
                                <View style={{ borderBottomWidth: 1, width: "100%", borderColor: theme.lighterBlue, alignSelf: "center", marginVertical: 5 }} />
                                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 5 }}>
                                    <View style={{ flex: 1, marginLeft: 3 }}>
                                        <Text style={styles.baseStatsText}>
                                            Health: {champJson[champName].stats.hp} - {Math.round(champJson[champName].stats.hp + (champJson[champName].stats.hpperlevel * 18))}
                                        </Text>
                                        <Text style={styles.baseStatsText}>
                                            Mana: {champJson[champName].stats.mp} - {Math.round(champJson[champName].stats.mp + (champJson[champName].stats.mpperlevel * 18))}
                                        </Text>
                                        <Text style={styles.baseStatsText}>
                                            Armor: {champJson[champName].stats.armor} - {Math.round(champJson[champName].stats.armor + (champJson[champName].stats.armorperlevel * 18))}
                                        </Text>
                                        <Text style={styles.baseStatsText}>
                                            Move. speed: {champJson[champName].stats.movespeed}
                                        </Text >

                                    </View>
                                    <View style={{ width: 15 }} />
                                    <View style={{ flex: 1, marginLeft: 3 }}>
                                        <Text style={styles.baseStatsText}>
                                            Health regen: {champJson[champName].stats.hpregen} - {Math.round(champJson[champName].stats.hpregen + (champJson[champName].stats.hpregenperlevel * 18))}
                                        </Text>
                                        <Text style={styles.baseStatsText}>
                                            Mana regen: {champJson[champName].stats.mpregen} - {Math.round(champJson[champName].stats.mpregen + (champJson[champName].stats.mpregenperlevel * 18))}
                                        </Text>
                                        <Text style={styles.baseStatsText}>
                                            Magic Resist: {champJson[champName].stats.spellblock} - {Math.round(champJson[champName].stats.spellblock + (champJson[champName].stats.spellblockperlevel * 18))}
                                        </Text>

                                    </View>
                                </View>
                                <Text style={[styles.baseStatsTitle, { fontSize: 18, marginTop: 10 }]}>Attack stats</Text>
                                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 5 }}>
                                    <View style={{ flex: 1, marginLeft: 3 }}>
                                        <Text style={styles.baseStatsText}>
                                            AD: {champJson[champName].stats.attackdamage} - {(champJson[champName].stats.attackdamage + (champJson[champName].stats.attackdamageperlevel * 18)).toFixed(0)}
                                        </Text>
                                        <Text style={styles.baseStatsText}>
                                            Attack range: {champJson[champName].stats.attackrange}
                                        </Text >


                                    </View>
                                    <View style={{ width: 15 }} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.baseStatsText}>
                                            AD growth: {champJson[champName].stats.hpregen} - {(champJson[champName].stats.hpregen + (champJson[champName].stats.hpregenperlevel * 18)).toFixed(1)}
                                        </Text>
                                        <Text style={styles.baseStatsText}>
                                            Attack speed: {champJson[champName].stats.attackspeed}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    }
                />
            )}
        </View>
    )
}

export default ChampDetails