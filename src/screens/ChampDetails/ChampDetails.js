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

const ChampDetails = ({ route, navigation }) => {

    useEffect(() => {
        //fix later
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])

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
                /* console.log(resp.data.data.Jhin); */
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

                /* console.log(masteryArray) */
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
                <TouchableOpacity style={[{ borderWidth: 3, borderColor: theme.mediumBlue, borderRadius: 10 }, styles.shadow]}
                    onPress={() => {
                        setSelectedSpellIndex(index)
                        //not updating in time to show ability
                        console.log(index, item)
                    }}
                >
                    <ImageBackground
                        source={{ uri: uri }}
                        style={styles.abilityImage}
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

        return (
            <View style={{
                padding: 15,
                backgroundColor: theme.mediumBlue,
                width: "100%",
                alignSelf: "center",
                marginVertical: 15,
                borderRadius: 5
            }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={[styles.shadow, { borderWidth: 3, borderColor: theme.darkBlue, borderRadius: 10 }]}>
                        <Image
                            source={selectedSpellIndex > 3 ?
                                { uri: `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/passive/${spellInformation[selectedSpellIndex].image}` }
                                :
                                { uri: `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/${spellInformation[selectedSpellIndex].image}` }}
                            style={{ height: 70, width: 70 }}
                        />
                    </View>
                    <View style={{ flex: 1, borderWidth: 1, borderRadius: 2, marginHorizontal: 30, borderColor: theme.orange, backgroundColor: theme.lighterBlue }}>
                        <Text style={{ color: theme.white, fontSize: 18, margin: 10, textAlign: "center" }}>{spellInformation[selectedSpellIndex].name}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 5, marginTop: 10 }}>
                    {/* Check if fields exists before displaying */}
                    <Text style={styles.baseStatsText}>Cooldown: {spellInformation[selectedSpellIndex].cooldown} s</Text>
                    <Text style={styles.baseStatsText}>Cost: {spellInformation[selectedSpellIndex].cost} mana</Text>
                    <Text style={styles.baseStatsText}>Range: {spellInformation[selectedSpellIndex].range}</Text>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ color: theme.white, fontSize: 16 }}>Description</Text>
                        <Text style={styles.baseStatsText}>{spellInformation[selectedSpellIndex].description}</Text>
                    </View>

                </View>
            </View>
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
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View>
                        <View style={{ width: "90%", alignSelf: "center", marginTop: 20, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Image
                                    source={{ uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg` }}
                                    style={{ height: height, width: width, borderRadius: 5 }}
                                />
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", backgroundColor: theme.mediumBlue, borderRadius: 5 }}>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <View style={[{
                                        alignItems: "center",
                                        backgroundColor: theme.mediumBlue,
                                        padding: 10,
                                        borderRadius: 5
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
                                            {champMastery.championPoints > 0 ? `${champMastery.championPoints} points` : "Not played"}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.loreMainContainer}>
                            <View style={styles.loreContainer}>
                                <Text style={styles.loreTitle}>Lore</Text>
                                <Text style={{ color: theme.white }}>{champJson[champName].lore}</Text>
                            </View>
                        </View>
                    </View >
                    <View style={{ width: "90%", alignSelf: "center", marginTop: 20, marginBottom: 20 }}>
                        <View style={styles.mainAbilityContainer}>
                            <Text style={{ color: theme.white, marginBottom: 10, fontSize: 24 }}>Abilities</Text>
                            <View style={styles.abilitiesContainer}>
                                <FlatList
                                    data={Object.values(spellInformation)}
                                    renderItem={abilityRenderItem}
                                    keyExtractor={(item, index) => index}
                                    numColumns={3}
                                />
                            </View>
                        </View>
                        {selectedSpellView()}
                        <View style={styles.baseStatsContainer}>
                            <Text style={styles.baseStatsTitle}>Base Stats</Text>
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
                                        AD: {champJson[champName].stats.attackdamage} - {Math.round(champJson[champName].stats.attackdamage + (champJson[champName].stats.attackdamageperlevel * 18))}
                                    </Text>
                                    <Text style={styles.baseStatsText}>
                                        Attack range: {champJson[champName].stats.attackrange}
                                    </Text >


                                </View>
                                <View style={{ width: 15 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.baseStatsText}>
                                        AD growth: {champJson[champName].stats.hpregen} - {champJson[champName].stats.hpregen + (champJson[champName].stats.hpregenperlevel * 18)}
                                    </Text>
                                    <Text style={styles.baseStatsText}>
                                        Attack speed: {champJson[champName].stats.attackspeed}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )
            }
        </View >
    )
}

export default ChampDetails