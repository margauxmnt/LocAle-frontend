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
<<<<<<< HEAD
import userNotes from './reducers/userNotes.reducer'

const store = createStore(combineReducers({ breweries, beerInfo, location, selectedBrewerie, token, wishlist, userNotes}));
=======
import avatar from './reducers/avatar.reducer';

const store = createStore(combineReducers({ breweries, beerInfo, location, selectedBrewerie, token, wishlist, avatar}));
>>>>>>> 266b9f2ad8f4620bb33e87bd13f4a90a3b15ed4b

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



