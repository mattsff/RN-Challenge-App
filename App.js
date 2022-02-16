
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from './src/stores/store';

import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';
import { PersistGate } from 'redux-persist/integration/react';

StatusBar.setBarStyle('light-content', true);

export const Route = () => {
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <NavigationContainer>
      {currentUser != null ?
        (<MainNavigator options={{ animationEnabled: false }} />)
        :
        (<AuthNavigator options={{ animationEnabled: false }} />)}
    </NavigationContainer>
  );
};


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Route />
      </PersistGate>
    </Provider>
  );
};

export default App;
