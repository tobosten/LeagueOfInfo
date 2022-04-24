import {
    View, Text, ActivityIndicator, Image, ScrollView, TouchableOpacity, ImageBackground,
    FlatList, VirtualizedList, SafeAreaView, LogBox
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { theme } from '../../theme'
import axios from 'axios'
import styles from './styles'

const ChampDetails = ({ route, navigation }) => {

    useEffect(() => {
        //fix later
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])

    let champName = "Jhin"
    /* const { champName, champId } = route.params */
    const [loading, setLoading] = useState(true)
    const [champJson, setChampJson] = useState(Object)
    let buttonArray = ["Q", "W", "E", "R", "P"]
    const [selectedSpell, setSelectedSpell] = useState(0)
    const [spellInformation, setSpellInformation] = useState([])


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

            }).then(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 500)

            })
    }, [])


    const abilityRenderItem = ({ item, index }) => {
        let uri = `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/${item.image}`
        if (index == 4) { uri = `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/passive/${item.image}` }
        return (
            <View style={styles.abilityView}>
                <View style={{}}>
                    <Text style={styles.abilityText}>{spellInformation[index].name}</Text>
                </View>
                <TouchableOpacity style={{ borderWidth: 3, borderColor: theme.mediumBlue, borderRadius: 10, }}
                    onPress={() => {
                        setSelectedSpell(index)
                        //not updating in time to show ability
                        console.log(index, item)
                    }}
                >
                    <ImageBackground
                        source={{ uri: uri }}
                        style={styles.abilityImage}
                    >
                        <View>
                            <Text style={{ color: "white", marginLeft: 5 }}>{buttonArray[index]}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
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
                    <View style={{ borderWidth: 2, borderColor: theme.orange, borderRadius: 10 }}>
                        <Image
                            /* passive image unable to be displayed */
                            source={{ uri: `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/${spellInformation[selectedSpell].image}` }}
                            style={{ height: 70, width: 70 }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "white", fontSize: 18, margin: 10, textAlign: "center" }}>{spellInformation[selectedSpell].name}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 5, marginTop: 10 }}> 
                {/* Check if fields exists before displaying */}
                    <Text style={styles.baseStatsText}>Cooldown: {spellInformation[selectedSpell].cooldown} s</Text>
                    <Text style={styles.baseStatsText}>Cost: {spellInformation[selectedSpell].cost} mana</Text>
                    <Text style={styles.baseStatsText}>Range: {spellInformation[selectedSpell].range}</Text>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ color: "white", fontSize: 16 }}>Description</Text>
                        <Text style={styles.baseStatsText}>{spellInformation[selectedSpell].description}</Text>
                    </View>

                </View>
            </View>
        )
    }

    //img size
    let height = 300
    let width = height * 0.55
    return (
        <ScrollView style={{ height: "100%", width: "100%", backgroundColor: theme.darkBlue }}>
            {loading ? (
                <View style={{ marginTop: "50%" }}>
                    <ActivityIndicator animating={loading} color={theme.orange} size="large"
                        style={{}} />
                </View>
            ) : (
                <View contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ width: "90%", alignSelf: "center", marginTop: 20, flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <Image
                                source={{ uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg` }}
                                style={{ height: height, width: width, borderRadius: 5 }}
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", marginBottom: 30 }}>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 24, color: "white", marginTop: 20 }}>{champName}</Text>
                                <Text style={{ color: "white", fontSize: 16 }}>{champJson[champName].title}</Text>
                                {/* Image on adaptive or atk speed / mastery level */}
                                <View style={{ height: 50, width: 50, backgroundColor: "gray", borderRadius: 50, marginTop: 30 }} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.loreMainContainer}>
                        <View style={styles.loreContainer}>
                            <Text style={styles.loreTitle}>Lore</Text>
                            <Text style={{ color: "white" }}>{champJson[champName].lore}</Text>
                        </View>
                    </View>
                    <View style={{ width: "90%", alignSelf: "center", marginTop: 20, marginBottom: 20 }}>
                        <View style={styles.mainAbilityContainer}>
                            <Text style={{ color: "white", marginBottom: 10, fontSize: 24 }}>Abilities</Text>
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
                                        Health: {champJson[champName].stats.hp} - {champJson[champName].stats.hp + (champJson[champName].stats.hpperlevel * 18)}
                                    </Text>
                                    <Text style={styles.baseStatsText}>
                                        Mana: {champJson[champName].stats.mp} - {champJson[champName].stats.mp + (champJson[champName].stats.mpperlevel * 18)}
                                    </Text>
                                    <Text style={styles.baseStatsText}>
                                        Armor: {champJson[champName].stats.armor} - {champJson[champName].stats.armor + (champJson[champName].stats.armorperlevel * 18)}
                                    </Text>
                                    <Text style={styles.baseStatsText}>
                                        Move. speed: {champJson[champName].stats.movespeed}
                                    </Text >

                                </View>
                                <View style={{ width: 15 }} />
                                <View style={{ flex: 1, marginLeft: 3 }}>
                                    <Text style={styles.baseStatsText}>
                                        Health regen: {champJson[champName].stats.hpregen} - {champJson[champName].stats.hpregen + (champJson[champName].stats.hpregenperlevel * 18)}
                                    </Text>
                                    <Text style={styles.baseStatsText}>
                                        Mana regen: {champJson[champName].stats.mpregen} - {champJson[champName].stats.mpregen + (champJson[champName].stats.mpregenperlevel * 18)}
                                    </Text>
                                    <Text style={styles.baseStatsText}>
                                        Magic Resist: {champJson[champName].stats.spellblock} - {champJson[champName].stats.spellblock + (champJson[champName].stats.spellblockperlevel * 18)}
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
                </View>
            )
            }
        </ScrollView >
    )
}

export default ChampDetails