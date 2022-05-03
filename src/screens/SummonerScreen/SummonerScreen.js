import { View, Text, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { theme } from '../../theme';
import { UserInfoContext } from '../../ProjectContext';
import { constants } from '../../constants';
import axios from 'axios';


const SummonerScreen = () => {

  const [isLoading, setIsLoading] = useState(true)

  const { userInfo } = useContext(UserInfoContext)

  useEffect(() => {
    console.log("User Info:", userInfo);
  })

  if (isLoading == true) {
    if (userInfo != null) {
      /* console.log(userInfo) */
      axios.get(
        `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userInfo.id}${constants.api_key}`
      ).then((resp) => {
        console.log(resp.data);
      })

      setIsLoading(!isLoading)
    }
  }

  return (
    <View style={{ backgroundColor: theme.darkBlue, flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator animating={isLoading} color={theme.orange} size="large" />
      ) : (
        <View>
          <Image
            source={{ uri: `http://ddragon.leagueoflegends.com/cdn/12.7.1/img/profileicon/${userInfo.profileIconId}.png` }}
            style={{ height: 100, width: 100 }}
          />
        </View>
      )}
    </View>
  )
}

export default SummonerScreen;