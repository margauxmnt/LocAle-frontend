/**
 * LOC'ALE Project
 * MVP - La Capsule academy
 * 
 */
import 'react-native-gesture-handler';
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true); // disable warnings

import React from 'react';
import { NativeBaseProvider } from 'native-base';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import CustomTabar from './screens/CustomTabar';



// Redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import breweries from './reducers/breweries.reducer';
import beerInfo from './reducers/beerInfo.reducer';
import location from './reducers/location.reducer';
import selectedBrewerie from "./reducers/selectedBrewerie.reducer";
import token from './reducers/token.reducer';
import wishlist from './reducers/wishlist.reducer';
import avatar from './reducers/avatar.reducer';

const store = createStore(combineReducers({ breweries, beerInfo, location, selectedBrewerie, token, wishlist, avatar}));

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <CustomTabar />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}



