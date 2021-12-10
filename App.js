/**
 * LOC'ALE Project
 * MVP - La Capsule academy
 * 
 */
import 'react-native-gesture-handler';
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true); // disable warnings

import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './screens/Homepage';
import Wishlist from './screens/Wishlist';
import Search from './screens/Search';
import Profile from './screens/Profile';
import BeerList from './screens/BeerList';
import BeerInfo from './screens/BeerInfo';

// Redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import breweries from './reducers/breweries.reducer';
import beerInfo from './reducers/beerInfo.reducer';
import location from './reducers/location.reducer';
import selectedBrewerie from "./reducers/selectedBrewerie.reducer";

const store = createStore(combineReducers({breweries, beerInfo, location, selectedBrewerie}));

const HomeStack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Homepage" component={Homepage} />
      <HomeStack.Screen name="BeerList" component={BeerList} />
      <HomeStack.Screen name="BeerInfo" component={BeerInfo} />
    </HomeStack.Navigator>
  )
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => {
                if (route.name === 'StackNav') {
                  return <Image source={require('./assets/logo_matth_transparent.png')} style={styles.logo} />;
                } else if (route.name === 'Search') {
                  return <Ionicons name="search" size={35} color={color} />;
                } else if (route.name === 'Wishlist') {
                  return <Ionicons name="heart-outline" size={35} color={color} />;
                } else if (route.name === 'Profile') {
                  return <Ionicons name="person-outline" size={35} color={color} />;
                }
              },
              headerShown: false,
              tabBarShowLabel: false,
              tabBarActiveTintColor: '#FAE16C',
              tabBarInactiveTintColor: '#fff',
              tabBarItemStyle: {
                backgroundColor: '#194454'
              },
              tabBarStyle : {
                backgroundColor: '#194454'
              }
            })}
          >
            <Tab.Screen name="StackNav" component={StackNavigator} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Wishlist" component={Wishlist} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
  }
})

