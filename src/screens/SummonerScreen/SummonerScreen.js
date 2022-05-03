import { View, Text, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { theme } from '../../theme';
import { UserInfoContext } from '../../ProjectContext';
import { constants } from '../../constants';
import axios from 'axios';
import { styles } from './styles';
import { rankEmblems } from '../../assets/rankEmblems';


const SummonerScreen = () => {

  const [isLoading, setIsLoading] = useState(true)

  const { userInfo } = useContext(UserInfoContext)
  const [rankedStats, setRankedStats] = useState(null)


  useEffect(() => {
    /* console.log("User Info:", userInfo); */


    if (isLoading == true) {
      if (userInfo != null) {
        /* console.log(userInfo) */
        axios.get(
          `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userInfo.id}${constants.api_key}`
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
          setIsLoading(!isLoading)
        })
      }
    }
  }, [])




  return (
    <View style={{ backgroundColor: theme.darkBlue, flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator animating={isLoading} color={theme.orange} size="large" />
      ) : (
        <View>
          <View style={styles.topContentContainer}>
            <View style={styles.summonerIconContainer}>
              <Image
                source={{ uri: `http://ddragon.leagueoflegends.com/cdn/12.7.1/img/profileicon/${userInfo.profileIconId}.png` }}
                style={styles.summonerIcon}
              />
              <Text style={styles.summonerLevelText}>{userInfo.summonerLevel}</Text>
            </View>
            <View style={styles.summonerNameContainer}>
              <Text style={styles.summonerNameText}>{userInfo.name}</Text>
            </View>
          </View>

          <View style={styles.rankedSoloContainer}>
            <Text style={styles.rankedSoloText}>Ranked Solo</Text>
            <View style={styles.rankViewContainer}>
              <View style={styles.rankContainer}>
                <Image
                  source={rankedStats.tier == "Undefined" ? null : rankEmblems[rankedStats.tier]}
                  style={{ width: 100, height: 100 }}
                />
              </View>
              <View style={[styles.rankContainer, { marginRight: 15 }]}>
                <View style={styles.rankTextContainer}>
                  <Text style={styles.rankText}>{rankedStats.tier == "Unranked" ?
                    rankedStats.tier
                    :
                    `${rankedStats.tier} ${rankedStats.division} \n${rankedStats.lp} LP `}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default SummonerScreen;