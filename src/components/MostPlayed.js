import { View, Text, Image, Dimensions, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { MasteryImages } from '../assets/MasteryImages'
import { ChampArrayContext, MasteryArrayContext } from '../ProjectContext'
import { theme } from '../theme'

const MostPlayed = () => {

    const { champArray } = useContext(ChampArrayContext)
    const { masteryArray } = useContext(MasteryArrayContext)

    let champName = ""
    Object.values(champArray).forEach((value) => {
        if (value.key == masteryArray[0].championId) {
            champName = value.id
        }
    })

    let mlvl = masteryArray[0].championLevel
    let source = ""
    /* console.log(masteryArray[0]); */
    mlvl == 0 ? source = MasteryImages.mastery0 : null;
    mlvl == 1 ? source = MasteryImages.mastery1 : null;
    mlvl == 2 ? source = MasteryImages.mastery2 : null;
    mlvl == 3 ? source = MasteryImages.mastery3 : null;
    mlvl == 4 ? source = MasteryImages.mastery4 : null;
    mlvl == 5 ? source = MasteryImages.mastery5 : null;
    mlvl == 6 ? source = MasteryImages.mastery6 : null;
    mlvl == 7 ? source = MasteryImages.mastery7 : null;

    let width = Dimensions.get("window").width - 50
    let height = width * 0.57
    return (
        <View style={{
            width: "100%",
            alignSelf: "center",
        }}>
            <Text style={{ color: theme.white, fontSize: 20, marginLeft: 30, marginBottom: 5 }}>Most Played Champion</Text>
            <ImageBackground
                source={{ uri: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg` }}
                style={{ height: height, width: width, alignSelf: "center" }}
                imageStyle={{ borderRadius: 5 }}
            >
                <View>
                    <Text style={{ color: theme.white, fontSize: 20, marginLeft: 10, marginTop: 5 }}>{champName}</Text>
                    <Image
                        source={source}
                        style={{ height: 60, width: 60, marginLeft: 10 }}
                    />

                </View>
            </ImageBackground>
        </View>
    )
}

export default MostPlayed