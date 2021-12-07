import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true);
/*Import React*/
import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, Image, ScrollView} from 'react-native';
/*Icones*/
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/AntDesign';




export default function BeerList(props) {


    const [dataBeers, setDataBeers] = useState([]);


    useEffect(() => {
        async function loadData() {
            let rawResponse = await fetch(`http://192.168.1.111:3000/get-beers/${'Demi-Lune'}`)
            let dataBeers = await rawResponse.json()
            console.log(dataBeers)
            setDataBeers([dataBeers])
        }
        loadData()
    }, [])


    let beerList = dataBeers.map((i) => {
        return (

            <View style={{ backgroundColor: '#194454' }}>

                <View style={styles.containerParent}>

                    <View>
                        <Image style={styles.image} source={dataBeers.picture}></Image>
                    </View>

                    <View style={styles.containerChildTwo}>

                        <Text style={{ fontWeight: 'bold', color: '#194454', fontSize: 20 }}>
                            {dataBeers.name}
                        </Text>

                        <Text style={styles.texte}>
                            {dataBeers.slogan}
                        </Text>

                        <Text style={styles.texte}>
                            {dataBeers.alcool}
                        </Text>

                        <View style={styles.stars}>
                            <Icon name="star" size={30} color="#FAE16C" style={{ marginRight: 2 }}></Icon>
                            <Icon name="star" size={30} color="#FAE16C" style={{ marginRight: 2 }}></Icon>
                            <Icon name="star" size={30} color="#FAE16C" style={{ marginRight: 2 }}></Icon>
                            <Icon name="star" size={30} color="#FAE16C" style={{ marginRight: 2 }}></Icon>
                            <Icon name="star" size={30} color="#FAE16C" style={{ marginRight: 2 }}></Icon>
                        </View>

                    </View>

                    <View style={styles.containerChildThree}>

                        <View style={styles.backgroundIcone}>
                            <IconI style={styles.iconeI} name="info" size={30} onPress={() => props.navigation.navigate('BeerInfo')}></IconI>
                        </View>

                        <IconM name="heart-plus" size={35} color="#FAE16C"></IconM>

                        <Text style={styles.note}>4.2</Text>

                    </View>

                </View>
            </View>

        );
    });



    return (

        <ScrollView style={{ marginTop: 50 }}>
            {beerList}
        </ScrollView>
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
        height: 100,
    },
    containerChildTwo: {
        height: 150,
        justifyContent: 'space-between',
    },
    texte: {
        color: '#194454',
        fontSize: 20,
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
});