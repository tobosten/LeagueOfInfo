import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './theme';
import ProjectContext from './ProjectContext';
import { ToastProvider } from 'react-native-toast-notifications'
//screens
import LoginScreen from './screens/Login/LoginScreen';
import ChampSearch from './screens/ChampSearch/ChampSearch';
import ChampDetails from './screens/ChampDetails/ChampDetails';
import DrawerNavigator from './screens/DrawerNavigator';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <ProjectContext>
      <ToastProvider
        placement='bottom'
        duration={1500}
        normalColor={theme.orange}
      >
        <NavigationContainer>
          <Stack.Navigator /* initialRouteName='ChampDetails' */>
            <Stack.Screen name="Login" component={LoginScreen}
              options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: theme.darkBlue }, headerTitleStyle: { color: "white" } }} />
            <Stack.Screen name="ChampSearch" component={ChampSearch}
              options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: theme.darkBlue }, headerTitleStyle: { color: "white" }, headerTitle: "Champion Search" }} />
            <Stack.Screen name="ChampDetails" component={ChampDetails}
              options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: theme.darkBlue }, headerTitleStyle: { color: "white" }, headerTitle: "Champion Search" }} />
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </ProjectContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
