import { View, Text, ActivityIndicator, Image, FlatList, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { theme } from '../../theme';
import { UserInfoContext } from '../../ProjectContext';
import { constants } from '../../constants';
import axios from 'axios';
import { styles } from './styles';
import { rankEmblems } from '../../assets/rankEmblems';
import { ChampArrayContext, MasteryArrayContext } from '../../ProjectContext';
import ChampionImages from '../../assets/ChampionImages';
import { RankBorders } from '../../assets/rankBorders/RankBorders';
import { MasteryImages } from '../../assets/MasteryImages'
import { LevelBorders } from "../../assets/levelBorders/LevelBorders"
import ProfileLevelBorder from '../../components/ProfileLevelBorder';


const SummonerScreen = () => {

  const [isLoading, setIsLoading] = useState(true)

  const { userInfo } = useContext(UserInfoContext)
  const { champArray } = useContext(ChampArrayContext)
  const { masteryArray } = useContext(MasteryArrayContext)
  const [rankedStats, setRankedStats] = useState(null)
  const [mostPlayed, setMostPlayed] = useState([])

  useEffect(() => {
    if (isLoading == true) {
      if (userInfo != null) {
        axios.get(
          `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userInfo.id}?${constants.api_key}`
        ).then((resp) => {
          console.log("User Stats:", resp.data[0]);
          let data = resp.data[0]
          if (data == undefined) {
            setRankedStats(
              {
                tier: "Unranked"
              }
            )
          } else {
            setRankedStats(
              {
                tier: data.tier,
                division: data.rank,
                lp: data.leaguePoints
              }
            )
          }

          axios.get(
            `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${userInfo.id}?${constants.api_key}`
          ).then((resp) => {
            let data = { one: resp.data[0].championId, two: resp.data[1].championId, three: resp.data[2].championId }
            let array = []

            Object.values(champArray).forEach((value) => {
              if (data.two == value.key) { array.push({ id: value.id, key: value.key }) }
            })
            Object.values(champArray).forEach((value) => {
              if (data.one == value.key) { array.push({ id: value.id, key: value.key }) }
            })
            Object.values(champArray).forEach((value) => {
              if (data.three == value.key) { array.push({ id: value.id, key: value.key }) }
            })
            setMostPlayed(array)
            setIsLoading(!isLoading)
          })
        })
      }
    }
  }, [])

  function profileComponent() {



    return (
      <View>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Text style={[{
            backgroundColor: theme.mediumBlue,
            width: "80%",
            padding: 10,
            textAlign: "center",
            color: theme.white,
            fontSize: 26,
            borderRadius: 5,
          }, styles.shadow]}>
            {userInfo.name}
          </Text>
          <ProfileLevelBorder />
          <Text style={[{
            textAlign: "center",
            alignSelf: "center",
            color: theme.white,
            backgroundColor: theme.mediumBlue,
            borderRadius: 5,
            width: 80,
            marginTop: 30,
            fontSize: 18,
            paddingVertical: 3,
            borderWidth: 1,
            borderColor: theme.orange
          }, styles.shadow]}>{userInfo.summonerLevel}</Text>
        </View>
      </View>
    )

  }


  const mostPlayedRender = ({ item, index }) => {

    let style = {}
    if (index < 1 || index > 1) {
      style = { marginTop: 10 }
    }
    let masteryLevel = ""
    masteryArray.forEach((value) => {
      if (item.key == value.championId) {
        masteryLevel = "mastery" + value.championLevel
      }
    })

    return (
      <View style={{ marginHorizontal: 15 }}>
        <Image
          source={MasteryImages[masteryLevel]}/* set so image displays depending on mastery level */
          style={[{ height: 40, width: 40, alignSelf: "center", marginBottom: 5 }, style]}
        />
        <Image
          source={ChampionImages[mostPlayed[index].id]}
          style={{
            height: 80,
            width: 80,
            borderRadius: 50,
          }}
        />
        <Text style={[{
          textAlign: "center",
          color: theme.white,
          marginTop: 5,
          padding: 2,
          backgroundColor: theme.darkBlue,
          borderRadius: 5
        }, styles.shadow]}>{item.id}</Text>
      </View>
    )
  }


  function rankImage() {
    let img = rankEmblems[rankedStats.tier]
    if (rankedStats.tier == "Unranked") {
    }
    return (
      <View>
        {rankedStats.tier == "Unranked" ? (
          <Image 
            source={require("../../assets/emblems/unrankedEmblem.png")}
            style={{height: 100, width: 140}}
          />
        ) : (
          <Image
            source={img}
            style={{ height: 135, width: 100 }}
          />
        )}


      </View>
    )
  }

  function rankText() {
    let text = `${rankedStats.tier} ${rankedStats.division} \n${rankedStats.lp} LP `
    if (rankedStats.tier == "Unranked") { text = rankedStats.tier }
    return (
      <Text style={styles.rankText}>{text}</Text>
    )

  }


  return (
    <ScrollView style={{ backgroundColor: theme.darkBlue, flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator animating={isLoading} color={theme.orange} size="large" style={{ marginTop: 100 }} />
      ) : (
        <View style={{ marginBottom: 30 }}>
          <View style={styles.topContentContainer}>
            {profileComponent()}
          </View>

          <View style={[styles.rankedSoloContainer, styles.shadow]}>
            <Text style={styles.rankedSoloText}>Ranked Solo</Text>
            <View style={styles.rankViewContainer}>
              <View style={styles.rankContainer}>
                {rankImage()}
              </View>
              <View style={[styles.rankContainer, { marginRight: 15 }]}>
                <View style={styles.rankTextContainer}>
                  {rankText()}
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.mostPlayedContainer, styles.shadow]}>
            <Text style={styles.highestMasteryText}>Highest Mastery</Text>
            <View style={{
              marginBottom: 10,
              width: "90%",
              alignItems: "center",
              paddingVertical: 10,
            }}>
              <FlatList
                data={mostPlayed}
                renderItem={mostPlayedRender}
                keyExtractor={(item, index) => index}
                horizontal={true}
                style={{}}
              />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default SummonerScreen;