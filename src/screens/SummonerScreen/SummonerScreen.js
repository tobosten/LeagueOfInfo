import { View, Text, ActivityIndicator, Image, FlatList, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { theme } from '../../theme';
import { UserInfoContext } from '../../ProjectContext';
import { constants } from '../../constants';
import axios from 'axios';
import { styles } from './styles';
import { rankEmblems } from '../../assets/rankEmblems';
import { ChampArrayContext, MasteryArrayContext } from '../../ProjectContext';
import ProfileLevelBorder from '../../components/ProfileLevelBorder';
import MostPlayed from '../../components/MostPlayed';


const SummonerScreen = () => {

  const { userInfo } = useContext(UserInfoContext)
  const { champArray } = useContext(ChampArrayContext)
  const { masteryArray } = useContext(MasteryArrayContext)
  const [rankedStats, setRankedStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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
            <View style={{borderBottomWidth: 1, width: "90%", borderColor: theme.lighterBlue, alignSelf: "center"}} />
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