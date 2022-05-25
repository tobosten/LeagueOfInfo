import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { LevelBorders } from '../assets/levelBorders/LevelBorders'
import { UserInfoContext } from '../ProjectContext'

const ProfileLevelBorder = (icon, border) => {
    const { userInfo } = useContext(UserInfoContext)


    function checkBorderLevel() {
        let array = [1, 30, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 600]
        let image = null

        array.forEach((value) => {
            if (userInfo.summonerLevel > value) {
                image = LevelBorders[value]
            }
        })
        return image
    }

    return (
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 70 }}>
            <Image
                source={{ uri: `http://ddragon.leagueoflegends.com/cdn/12.7.1/img/profileicon/${userInfo.profileIconId}.png` }}
                style={{ height: 110, width: 110, marginBottom: 20, borderRadius: 100 }}
            />
            <Image
                source={checkBorderLevel()}
                style={{ height: 270, width: 280, position: "absolute" }}
            />

        </View>
    )
}

export default ProfileLevelBorder