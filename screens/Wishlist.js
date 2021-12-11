import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/AntDesign';

const token = 'XAL39AFZCGMyhLD6Quw11nXJHggbrm4A'
export default function Wishlist({ navigation }) {

    // const token = useSelector(store => store.token)
    const [beers, setBeers] = useState([])

    if (token === '') {
        navigation.navigate('StackNav', { screen: 'Log' })
    }

    useEffect(() => {
        (async () => {
            const request = await fetch(`http://192.168.43.159:3000/get-wishlist/${token}`)
            const result = await request.json()
            console.log(result)
            setBeers(result)
        })()
    }, [])



    return (
        <View style={{ backgroundColor: '#194454', flex: 1 }}>
            <View style={styles.topBar} >
                <Text style={styles.text}>Mes Favorites</Text>
            </View>

            <ScrollView>
                {beers.map((el, i) => (
                    <View key={i} style={styles.containerParent} >

                        <View>
                            <Image style={styles.image} source={{ uri: el.picture }}></Image>
                        </View>

                        <View style={styles.containerChildTwo}>

                            <Text style={{ fontWeight: 'bold', color: '#194454', fontSize: 20 }}>
                                {el.name}
                            </Text>

                            <Text style={styles.texteType}>
                                {el.type}
                            </Text>

                            <Text style={styles.texte}>
                                {el.alcool + '% Alc.'}
                            </Text>

                            <View style={styles.stars}>
                                {starByNote(() => {
                                    let globalNote = 0;
                                    el.notes.forEach(e => globalNote += e.note)
                                    globalNote = Math.floor(globalNote / el.notes.length)

                                    let stars = [];
                                    for (let i = 0; i < 5; i++) {
                                        if (globalNote > i) {
                                            stars.push(<Icon style={{ marginRight: 2 }} name="star" size={25} color="#FAE16C" />)
                                        } else stars.push(<Icon style={{ marginRight: 2 }} name="star" size={25} color="#FEF5CB" />)
                                    }
                                    return stars
                                })}
                            </View>

                        </View>

                        <View style={styles.containerChildThree}>

                            <View style={styles.backgroundIcone}>
                                <IconI onPress={() => moreInfoBeer(el)} style={styles.iconeI} name="info" size={30} ></IconI>
                            </View>

                            <IconM name="heart-plus" size={35} color="#FAE16C"></IconM>

                            <Text style={styles.note}>
                                {starByNote(() => {
                                    let globalNote = 0;
                                    el.notes.forEach(e => globalNote += e.note);
                                    globalNote = globalNote / el.notes.length;
                                    if (isNaN(globalNote)) return 0
                                    else return globalNote
                                })}
                            </Text>

                        </View>

                    </View>
                ))}
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