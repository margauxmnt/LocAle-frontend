import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import BeerCard from './BeerCard';


export default function Wishlist({ navigation }) {

    const token = useSelector(store => store.token)
    const dispatch = useDispatch()
    const wishlist = useSelector(store => store.wishlist)

    if (token === '') {
        navigation.navigate('StackNav', { screen: 'Log' })
    }


    const moveFromWishlist = async (beer) => {
        dispatch({type: 'removeFromWishlist', beer: beer})
        await fetch(`http://192.168.1.111:3000/users/add-To-Wishlist/${beer._id}/${token}`)
    }

    const moreInfoBeer = async (beer) => {
        const request = await fetch(`http://192.168.1.111:3000/get-beer/${beer._id}`)
        const result = await request.json()

        dispatch({ type: 'updateBeer', beerInfo: result })
        navigation.navigate('BeerInfo')
    }

    const cards = wishlist.map((el, i) => {
        let isInWishlist = true;
        return <BeerCard key={i} isInWishlist={isInWishlist} moreInfo={moreInfoBeer} indice={i} beer={el} addToWishlist={moveFromWishlist} />
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