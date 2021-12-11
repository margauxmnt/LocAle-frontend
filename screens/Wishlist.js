import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/AntDesign';
import BeerCard from './BeerCard';
import { useIsFocused } from '@react-navigation/native';

const token = 'XAL39AFZCGMyhLD6Quw11nXJHggbrm4A'
export default function Wishlist({ navigation }) {

    // const token = useSelector(store => store.token)
    const [beers, setBeers] = useState([])
    const isFocused = useIsFocused();

    if (token === '') {
        navigation.navigate('StackNav', { screen: 'Log' })
    }

    useEffect(() => {
        (async () => {
            const request = await fetch(`http://192.168.43.159:3000/get-wishlist/${token}`)
            const result = await request.json()
            setBeers(result)
        })()
    }, [])

    const moveFromWishlist = async (beer, isInWishlist) => {
        setBeers(beers.filter(e => e._id !== beer._id))
        const request = await fetch(`http://192.168.43.159:3000/users/add-To-Wishlist/${beer._id}/${token}`)
        const result = await request.json()
    }

    const cards = beers.map((el, i) => {
        let isInWishlist = true;
        return <BeerCard key={i} isInWishlist={isInWishlist} indice={i} beer={el} addToWishlist={moveFromWishlist} />
    })

    return (
        <View style={{ backgroundColor: '#194454', flex: 1 }}>
            <View style={styles.topBar} >
                <Text style={styles.text}>Mes Favorites</Text>
            </View>

            <ScrollView>
                {cards}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    containerParent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderRadius: 15,
        padding: 30,
        borderColor: '#194454',
        backgroundColor: 'white'
    },
    image: {
        width: 100,
        height: 150,
    },
    containerChildTwo: {
        height: 150,
        justifyContent: 'space-between',
        width: 150,
    },
    texte: {
        color: '#194454',
        fontSize: 20,
    },
    texteType: {
        color: '#194454',
        fontSize: 18,
        width: 150,
    },
    stars: {
        flexDirection: 'row',
    },
    containerChildThree: {
        alignItems: 'center',
        height: 150,
        justifyContent: 'space-between',
    },
    iconeI: {
        color: 'white',
        width: 30,
        textAlign: 'center',
    },
    backgroundIcone: {
        backgroundColor: "#FAE16C",
        borderRadius: 50,
    },
    note: {
        color: "#194454",
        fontSize: 25,
        fontWeight: 'bold',
    },
    topBar: {
        width: '100%',
        height: 80,
        backgroundColor: '#194454',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        padding: 20,
    },
    text: {
        fontSize: 25,
        color: '#fff',
    },
})