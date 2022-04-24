import { View, Text, FlatList, TouchableOpacity, TextInput, Image, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { theme } from '../../theme'
import axios from 'axios';
import { ChampArrayContext } from '../../ProjectContext';
import ChampionImages from '../../assets/ChampionImages';
import styles from './styles';

const ChampSearch = ({ navigation }) => {

    /* 
    Object.entries needed to loop through champ array with objects inside object
    Object.entries(champArray.data).forEach(([key, value]) => {
      console.log("Id:", value.key) 
    }
    */
    const [searchField, setSearchField] = useState("")
    const [searchSelect, setSearchSelect] = useState(false)
    const [loading, setLoading] = useState(true)

    const { champArray, setChampArray } = useContext(ChampArrayContext)

    const testArray = [
        { id: "Aatrox" },
        { id: "Kalista" },
        { id: "Akali" },
        { id: "Evelynn" },
        { id: "Rek'sai" },
        { id: "Bel'veth" },
        { id: "Kai'sa" }
    ]

    useEffect(async () => {
        /* console.log(champArray); */
        await axios.get(`http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json`)
            .then((resp) => {
                setChampArray(resp.data.data)
            }).then(() => {
                //delay to set champArray
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            })
    }, [])

    const renderItem = ({ item }) => {

        return (
            <View style={{ width: 80, marginVertical: 5 }}>
                <TouchableOpacity style={styles.renderItemButton} onPress={() => {
                    console.log("Selected champ:", item.id)
                    navigation.navigate("ChampDetails", {
                        champName: item.id,
                        champId: item.key
                    })
                }}>
                    <Image
                        source={ChampionImages[item.id]}  /* ${item.id}  not working?*/
                        style={styles.renderItemImage}
                    />
                </TouchableOpacity>
                <Text style={styles.renderItemName}>{item.id}</Text>
            </View >
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={searchField}
                        onChangeText={setSearchField}
                        style={styles.searchField}
                        onFocus={() => setSearchSelect(true)}
                        onTouchCancel={() => setSearchField(false)}
                    />
                    <View style={styles.dividerView} />
                    {searchSelect ? (
                        <TouchableOpacity style={styles.magGlass} onPress={() => {
                            //navigate to champ info
                        }}>
                            <Image
                                source={require("../../assets/icons/selectedSearch.gif")}
                                style={styles.searchImage}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.magGlass}>
                            <Image
                                source={require("../../assets/icons/searchImage.png")}
                                style={styles.searchImage}
                            />
                        </TouchableOpacity>
                    )

                    }

                </View>
            </View>

            <View style={styles.botContainer}>
                {loading ? (
                    <View style={styles.loadingTrue}>
                        <ActivityIndicator animating={loading} color={theme.orange} size="large"
                            style={{}} />
                    </View>
                ) : (
                    <FlatList
                        data={Object.values(champArray)}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index}
                        numColumns={4}
                        ListEmptyComponent={() => (
                            <View>
                                <Text style={{ color: "white" }}>Api Not Working</Text>
                            </View>
                        )}
                    />
                )

                }

            </View>
        </View>
    )
}

export default ChampSearch