import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import CasesByCountryScreen from '../screens/CasesByCountryScreen';

const MainStack = createStackNavigator();

function MainNavigator() {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen name="Home" component={HomeScreen} options={{ title: 'Select a country' }}  />
      <MainStack.Screen name="CasesByCountry" component={CasesByCountryScreen} />
    </MainStack.Navigator>
  );
}

export default MainNavigator;