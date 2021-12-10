import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true);
/*Import React*/
import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
/*Icones*/
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/AntDesign';
// redux
import { useDispatch, useSelector } from 'react-redux';


export default function BeerList({ navigation }) {

    const [beers, setBeers] = useState([]);
    const dispatch = useDispatch();
    const selectedBrewerie = useSelector(store => store.selectedBrewerie)

    useEffect(() => {
        async function loadData() {
            let request = await fetch(`http://172.16.191.137:3000/get-beers/${selectedBrewerie._id}`)
            let result = await request.json()
            setBeers(result)
        }
        loadData()
    }, [])

    const moreInfoBeer = (beer) => {
        dispatch({ type: 'updateBeer', beerInfo: beer })
        navigation.navigate('BeerInfo')
    }


    const starByNote = (s) => {
        return s()
    }


    return (
        <View style={{ backgroundColor: '#194454', flex: 1 }}>
            <View style={styles.topBar} >
                <Icon onPress={() => {
                    dispatch({ type: 'selectedBrewerie', brewery: '' })
                    navigation.navigate('Homepage');
                }}
                    style={styles.icon}
                    name="chevron-left"
                    size={30}
                    color="#fff"
                />
                <Text style={styles.text}>{selectedBrewerie.name}</Text>
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
                                    if(isNaN(globalNote)) return 0
                                    else return globalNote
                                })}
                            </Text>

                        </View>

                    </View>
                ))}
            </ScrollView>
        </View>
    )
};

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
    },
    icon: {
        padding: 20,
    },
    text: {
        fontSize: 25,
        color: '#fff',
    },
});
