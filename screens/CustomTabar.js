import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './Homepage';
import Wishlist from './Wishlist';
import Search from './Search';
import Profile from './Profile';
import BeerList from './BeerList';
import BeerInfo from './BeerInfo';

const HomeStack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Homepage" component={Homepage} />
      <HomeStack.Screen name="BeerList" component={BeerList} />
      <HomeStack.Screen name="BeerInfo" component={BeerInfo} />
    </HomeStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
export default function CustomTabar(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === 'Homepage') {
            return <Image source={require('../assets/logo_matth_transparent.png')} style={styles.logo} />;
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
        tabBarStyle: {
          backgroundColor: '#194454'
        },

      })}
    >
      <Tab.Screen name="Homepage" component={StackNavigator} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    backgroundColor: '#194454',
  },
  logo: {
    width: 60,
    height: 60,
  }
})
