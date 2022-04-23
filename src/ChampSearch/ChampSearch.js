import { View, Text, FlatList, TouchableOpacity, TextInput, Image, Button } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { theme } from '../theme'
import axios from 'axios';
import styles from '../Login/styles';
import { ChampArrayContext } from '../ProjectContext';

const ChampSearch = () => {


    /* 
    Object.entries needed to loop through champ array with objects inside object
    Object.entries(champArray.data).forEach(([key, value]) => {
      console.log("Id:", value.key) 
    }
    */
    const [searchField, setSearchField] = useState("")
    const [searchSelect, setSearchSelect] = useState(false)

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
    let array = []

    useEffect(() => {
        console.log(champArray);
    }, [])

    const renderItem = ({ item }) => {
        return (
            <View style={{ width: 80, marginVertical: 5 }}>
                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", }} onPress={() => console.log(item.id)}>
                    <View style={{ height: 70, width: 70, backgroundColor: "gray", borderWidth: 1, borderColor: "white" }} />
                </TouchableOpacity>
                <Text style={{ color: "white", textAlign: "center" }}>hej</Text>
            </View >
        )
    }

    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: theme.darkBlue, alignItems: "center" }}>
            <View style={{ width: "100%", height: 100, alignItems: "center", borderColor: "white" }}>
                <View style={{
                    width: "80%",
                    height: 40,
                    backgroundColor: "white",
                    marginTop: 40,
                    flexDirection: "row",
                    borderRadius: 5
                }}>
                    <TextInput
                        value={searchField}
                        onChangeText={setSearchField}
                        style={{
                            flex: 1,
                            marginLeft: 10,
                            fontSize: 16
                        }}
                        onFocus={() => setSearchSelect(true)}
                        onTouchCancel={() => setSearchField(false)}
                    />
                    <View style={{ width: 1, backgroundColor: "lightgray", height: "80%", alignSelf: "center" }} />
                    {searchSelect ? (
                        <TouchableOpacity style={{ alignSelf: "center", marginHorizontal: 10 }} onPress={() => {
                            //navigate to champ info
                        }}>
                            <Image
                                source={require("../assets/icons/selectedSearch.gif")}
                                style={styles.searchImage}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{ alignSelf: "center", marginHorizontal: 10 }}>
                            <Image
                                source={require("../assets/icons/searchImage.png")}
                                style={styles.searchImage}
                            />
                        </TouchableOpacity>
                    )

                    }

                </View>
            </View>

            <View style={{ flexDirection: "row", marginHorizontal: "auto", width: "90%", paddingLeft: 15, marginTop: 30 }}>
                <FlatList
                    data={Object.values.champArray}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    numColumns={4}
                />
            </View>
        </View>
    )
}

export default ChampSearch