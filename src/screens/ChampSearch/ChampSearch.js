import { View, Text, FlatList, TouchableOpacity, TextInput, Image, Button, ActivityIndicator, BackHandler, Dimensions } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { theme } from '../../theme'
import axios from 'axios';
import { ChampArrayContext } from '../../ProjectContext';
import ChampionImages from '../../assets/ChampionImages';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';

const ChampSearch = ({ navigation }) => {

    const [searchText, setSearchText] = useState("")
    const [searchSelect, setSearchSelect] = useState(false)
    const [loading, setLoading] = useState(true)

    const { champArray, setChampArray } = useContext(ChampArrayContext)
    const [championList, setChampionList] = useState([])

    const [searchList, setSearchList] = useState([])
    const [search, setSearch] = useState(false)
    const [searchPlaceholder, setSearchPlaceholder] = useState("")

    useEffect(() => {
        populateChampionList()
    }, [])


    const populateChampionList = () => {
        setChampionList(Object.values(champArray))
    }

    if (loading == true) {
        if (championList != null) {
            setLoading(false)
        }
    }


    const renderItem = ({ item }) => {


        return (
            <View style={{ width: 80, marginVertical: 5 }}>
                <TouchableOpacity style={styles.renderItemButton} onPress={() => {
                    console.log("Selected champ:", item.id)
                    navigation.navigate("ChampDetails", {
                        champName: item.id,
                        champId: item.key
                    })
                    setSearch(false)
                }}>
                    <Image
                        source={ChampionImages[item.id]}
                        style={styles.renderItemImage}
                    />
                </TouchableOpacity>
                <Text style={styles.renderItemName}>{item.id}</Text>

            </View >
        )
    }


    const searchFunction = () => {
        let newcArr = Object.values(champArray)
        let searchedChamps = []
        newcArr.forEach((item, index) => {
            if (item.id.indexOf(searchText) in newcArr) {
                console.log(item.id);
                searchedChamps.push(item)
            }
        })
        setSearch(true)
        setSearchList(searchedChamps)
        setSearchPlaceholder(searchText)
        setSearchText("")
    }

    let numColumns = 4
    if (Dimensions.get("screen").width < 350) {
        numColumns = 3
    }
    if (Dimensions.get("screen").width > 400) {
        numColumns = 4
    }
    if (Dimensions.get("screen").width > 500) {
        numColumns = 5
    }
    if (Dimensions.get("screen").width > 550) {
        numColumns = 6
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder={searchPlaceholder}
                        style={styles.searchField}
                        onFocus={() => setSearchSelect(true)}
                        onTouchCancel={() => setSearchText(false)}
                    />
                    <View style={styles.dividerView} />
                    {searchSelect ? (
                        <TouchableOpacity style={styles.magGlass} onPress={() => {
                            //navigate to champ info
                            searchFunction()
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
                    <View>

                        <FlatList
                            data={search == true ? searchList : championList}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index}
                            numColumns={numColumns}
                            ListEmptyComponent={() => (
                                <View>
                                    {/* <Text style={{ color: "white" }}>Api Not Working</Text> */}
                                </View>
                            )}
                        />
                    </View>
                )
                }
            </View>
        </View>
    )
}

export default ChampSearch