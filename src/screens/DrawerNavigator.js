import { View, Text, Image, TouchableOpacity, Touchable } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { theme } from '../theme';
import { useToast } from 'react-native-toast-notifications';


//screens
import SummonerScreen from './SummonerScreen/SummonerScreen';
import ChampSearch from './ChampSearch/ChampSearch';
import MatchHistory from './MatchHistory/MatchHistory';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }) => {

  const toast = useToast()

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: theme.darkBlue }, drawerLabelStyle: { color: theme.white },
        drawerInactiveBackgroundColor: theme.mediumBlue,
        headerTintColor: theme.white,

      }}
      useLegacyImplementation={true}
    >
      <Drawer.Screen name="Summoner" component={SummonerScreen}
        options={{
          headerTitleAlign: "center", headerStyle: { backgroundColor: theme.darkBlue }, headerTitleStyle: { color: "white" }, headerTitle: "Summoner",
          headerRight: () => (
            <TouchableOpacity style={{
              marginRight: 10
            }} onPress={() => { navigation.navigate("Login") }}>
              <Image
                source={require("../assets/buttons/logoutButton.png")}
                style={{ height: 35, width: 35 }}
              />
            </TouchableOpacity>

          )
        }} />
      <Drawer.Screen name="Champions" component={ChampSearch}
        options={{
          headerTitleAlign: "center", headerStyle: { backgroundColor: theme.darkBlue }, headerTitleStyle: { color: "white" }, headerTitle: "Champions",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 10 }}
              onPress={() => {
                toast.show("Press search button to reset list")
              }}>
              <Image
                source={require("../assets/buttons/infoButton.png")}
                style={{ height: 25, width: 25 }}
              />
            </TouchableOpacity>
          )
        }}

      />
      <Drawer.Screen name="MatchHistory" component={MatchHistory}
        options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: theme.darkBlue }, headerTitleStyle: { color: "white" }, headerTitle: "Match History" }} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator