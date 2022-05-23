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
import MostPlayed from '../../components/MostPlayed';


const SummonerScreen = () => {

  const [isLoading, setIsLoading] = useState(true)

  const { userInfo } = useContext(UserInfoContext)
  const { champArray } = useContext(ChampArrayContext)
  const { masteryArray } = useContext(MasteryArrayContext)
  const [rankedStats, setRankedStats] = useState(null)
  /* const [mostPlayed, setMostPlayed] = useState([]) */

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
        })
      }
    }
  }, [])

  if (isLoading == true) {
    if (rankedStats != null && masteryArray != null && champArray) {
      setIsLoading(false)
    }
  }

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
    return (
      <View>
        {rankedStats.tier == "Unranked" ? (
          <Image
            source={require("../../assets/emblems/unrankedEmblem.png")}
            style={{ height: 100, width: 140 }}
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

  function mostPlayedChampion() {
    let champName = ""
    Object.values(champArray).forEach((value, index) => {
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

    let width = 350
    let height = width * 0.57
    return (
      <View style={{ alignSelf: "center", marginVertical: 5 }}>
        <ImageBackground
          source={{ uri: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg` }}
          style={{ width: width, height: height }}
        >
          <Text style={{ color: theme.white, fontSize: 24, marginLeft: 10 }}>{champName}</Text>
          <Image
            source={source}
            style={{ height: 60, width: 60, marginLeft: 10 }}
          />
        </ImageBackground>
      </View>
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
          <View style={{}}>
            <MostPlayed />
          </View>

        </View>
      )}
    </ScrollView>
  )
}

export default SummonerScreen;