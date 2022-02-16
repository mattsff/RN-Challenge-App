import { createStore, combineReducers } from 'redux';
import { authReducer } from './auth/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const reducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer)
});

export const store = createStore(reducer);
export const persistor = persistStore(store);
