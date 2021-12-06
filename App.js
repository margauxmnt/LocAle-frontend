/**
 * LOC'ALE Project
 * MVP - La Capsule academy
 * 
 */

import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true); // disable warnings

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './screens/Homepage';
import Profile from './screens/Profile';
import Wishlist from './screens/Wishlist';
import Search from './screens/Search';
// import BeerInfo from './screens/BeerInfo';
const Tab = createBottomTabNavigator();

// Redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({}))

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              if (route.name === 'Homepage') {
                return <Image source={require('./assets/logo_matth_transparent.png')} style={styles.logo} />;
              } else if (route.name === 'Search') {
                return <Ionicons name="search" size={25} color={color} />;
              } else if (route.name === 'Wishlist') {
                return <Ionicons name="heart-outline" size={25} color={color} />;
              } else if (route.name === 'Profile') {
                return <Ionicons name="person-outline" size={25} color={color} />;
              }
            },
            headerShown: false,
          })}
          tabBarOptions={{
            showLabel: false,  
            activeTintColor: '#FAE16C',
            inactiveTintColor: '#fff',
            tabStyle: {
              backgroundColor: '#194454',
            }          
          }}
        >
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Homepage" component={Homepage} />
          <Tab.Screen name="Wishlist" component={Wishlist} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
  }
})

