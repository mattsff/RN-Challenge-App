import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen.js';

const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;