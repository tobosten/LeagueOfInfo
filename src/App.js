import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './theme';
import LoginScreen from './Login/LoginScreen';
import ChampSearch from './ChampSearch/ChampSearch';
import ProjectContext from './ProjectContext';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <ProjectContext>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={LoginScreen}
            options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: theme.darkBlue }, headerTitleStyle: { color: "white" } }} />
          <Stack.Screen name="ChampSearch" component={ChampSearch}
            options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: theme.darkBlue }, headerTitleStyle: { color: "white" }, headerTitle: "Champion Search" }} />
        </Stack.Navigator>
      </NavigationContainer>
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
