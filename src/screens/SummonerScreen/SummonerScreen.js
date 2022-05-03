import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from '../Login/LoginScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const SummonerScreen = () => {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name="Login" component={LoginScreen} />
    </Drawer.Navigator>
  )
}

export default SummonerScreen