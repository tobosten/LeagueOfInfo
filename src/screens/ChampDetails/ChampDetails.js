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
    const [champImage, setChampImage] = useState(null)
    const [champJson, setChampJson] = useState(Object)
    const [champSpells, setChampSpells] = useState({})
    const [spellImages, setSpellImages] = useState([])
    let buttonArray = ["Q", "W", "E", "R", "P"]


    useEffect(() => {
        axios.get(`https://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/${champName}.json`)
            .then((resp) => {
                /* console.log(resp.data.data.Jhin); */
                let champObject = resp.data.data
                setChampJson(resp.data.data)
                setChampSpells([
                    champObject[champName].spells[0].name,
                    champObject[champName].spells[1].name,
                    champObject[champName].spells[2].name,
                    champObject[champName].spells[3].name,
                    champObject[champName].passive.name
                ])
                setSpellImages([
                    champObject[champName].spells[0].image.full,
                    champObject[champName].spells[1].image.full,
                    champObject[champName].spells[2].image.full,
                    champObject[champName].spells[3].image.full,
                    champObject[champName].passive.image.full,
                ])

            }).then(() => {
                setTimeout(() => {
                    setLoading(false)
                    /* console.log("Champ info: ", champJson[champName].id) */
                    /* console.log(champSpells); */
                }, 500)

            })
    }, [])

    const abilityRenderItem = ({ item, index }) => {
        let uri = `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/${item}`
        if (index == 4) { uri = `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/passive/${item}` }
        return (
            <View style={styles.abilityView}>
                <View style={{}}>
                    <Text style={styles.abilityText}>{champSpells[index]}</Text>
                </View>
                <TouchableOpacity style={{ borderWidth: 3, borderColor: theme.mediumBlue, borderRadius: 10, }}>
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

                    <View style={{ /* borderWidth: 1, */ width: "90%", alignSelf: "center", marginTop: 20, flexDirection: "row" }}>
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
                    <View style={{ width: "90%", alignSelf: "center", marginTop: 40 }}>
                        <Text style={{ color: "white", fontSize: 24, marginLeft: 10, marginBottom: 10 }}>Lore</Text>
                        <View style={{ backgroundColor: theme.mediumBlue, borderRadius: 5, padding: 15, alignItems: "center" }} >
                            <Text style={{ color: "white" }}>{champJson[champName].lore}</Text>
                        </View>
                    </View>
                    <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
                        <View style={styles.mainAbilityContainer}>
                            <Text style={{ color: "white", marginBottom: 10, fontSize: 24 }}>Abilities</Text>
                            <View style={styles.abilitiesContainer}>
                                <FlatList
                                    data={Object.values(spellImages)}
                                    renderItem={abilityRenderItem}
                                    keyExtractor={(item, index) => index}
                                    numColumns={3}
                                />{/* 
                                <VirtualizedList
                                    data={Object.values(spellImages)}
                                    renderItem={abilityRenderItem}
                                    getItem={(data, index) => data[index]}
                                    getItemCount={data => data.length}
                                    keyExtractor={(item, index) => index}
                                /> */}

                            </View>
                        </View>
                    </View>

                </View>
            )
            }
        </ScrollView>
    )
}

export default ChampDetails