import { View, Text, ActivityIndicator, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { theme } from '../../theme'
import axios from 'axios'
import styles from './styles'

const ChampDetails = ({ route, navigation }) => {



    let champName = "Jhin"
    /* const { champName, champId } = route.params */
    const [loading, setLoading] = useState(true)
    const [champImage, setChampImage] = useState(null)
    const [champJson, setChampJson] = useState(Object)


    useEffect(() => {
        axios.get(`https://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/${champName}.json`)
            .then((resp) => {
                /* console.log(resp.data.data.Jhin); */
                setChampJson(resp.data.data)
            }).then(() => {
                setTimeout(() => {
                    setLoading(false)
                    /* console.log("Champ info: ", champJson[champName].id) */
                }, 1500)
            })
    }, [])


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
                    {/*  <Text>{champJson[champName].lore.split(" ")[0]}</Text> */}
                    <View style={{ borderWidth: 1, width: "90%", alignSelf: "center", marginTop: 20, flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <Image
                                source={{ uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg` }}
                                style={{ height: height, width: width, borderRadius: 5 }}
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", marginBottom: 30 }}>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 24, color: "white", marginTop: 20 }}>{champName}</Text>
                                {/* Adaptive/Attack speed image, or Mastery symbol when mastery exists */}
                                <View style={{ height: 50, width: 50, backgroundColor: "gray", borderRadius: 50, marginTop: 30 }} />
                            </View>
                        </View>
                    </View>
                    {/* Lore */}
                    <View style={{ /* borderWidth: 1, */ width: "90%", alignSelf: "center", marginTop: 40 }}>
                        <Text style={{ color: "white", fontSize: 24, marginLeft: 10, marginBottom: 10 }}>Lore</Text>
                        <View style={{ backgroundColor: theme.mediumBlue, borderRadius: 5, padding: 15, alignItems: "center" }} >
                            <Text style={{ color: "white" }}>{champJson[champName].lore}</Text>
                        </View>
                    </View>
                    {/* Abilities */}
                    <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
                        <View style={styles.mainAbilityContainer}>
                            <Text style={{ color: "white", marginBottom: 10, fontSize: 24 }}>Abilities</Text>
                            <View style={styles.abilitiesContainer}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={styles.abilityView}>
                                        <View style={{}}>
                                            <Text style={styles.abilityText}>{champJson[champName].spells[0].name}</Text>
                                        </View>
                                        <View style={styles.abilityImage} />
                                    </View>
                                    <View style={styles.abilityView}>
                                        <View style={{}}>
                                            <Text style={styles.abilityText}>{champJson[champName].spells[1].name}</Text>
                                        </View>
                                        <View style={styles.abilityImage} />
                                    </View>
                                    <View style={styles.abilityView}>
                                        <View style={{}}>
                                            <Text style={styles.abilityText}>{champJson[champName].spells[2].name}</Text>
                                        </View>
                                        <View style={styles.abilityImage} />
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={styles.abilityView}>
                                        <View style={{}}>
                                            <Text style={styles.abilityText}>{champJson[champName].spells[3].name}</Text>
                                        </View>
                                        <View style={styles.abilityImage} />
                                    </View>
                                    <View style={styles.abilityView}>
                                        <View style={{}}>
                                            <Text style={styles.abilityText}>{champJson[champName].passive.name}</Text>
                                        </View>
                                        <View style={styles.abilityImage} />
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            )
            }

        </View>
    )
}

function seperateAbility() {

}

export default ChampDetails