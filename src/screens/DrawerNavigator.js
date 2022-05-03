import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { theme } from '../theme';


//screens
import SummonerScreen from './SummonerScreen/SummonerScreen';
import ChampSearch from './ChampSearch/ChampSearch';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: theme.darkBlue }, drawerLabelStyle: { color: theme.white },
        drawerInactiveBackgroundColor: theme.mediumBlue
      }}
    >
      <Drawer.Screen name="SummonerScreen" component={SummonerScreen}
        options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: theme.darkBlue }, headerTitleStyle: { color: "white" }, headerTitle: "Summoner" }} />
      <Drawer.Screen name="ChampSearch" component={ChampSearch}
        options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: theme.darkBlue }, headerTitleStyle: { color: "white" }, headerTitle: "Chamion Search" }} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator