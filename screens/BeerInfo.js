import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';


// const beerInfo = {
//     id: '61ab7acc33e203ad48f9e80a',
//     name: 'La Blonde',
//     slogan: 'Blonde douce et typée aux arômes légèrement herbacées et torréfiées.',
//     alcool: 5.3,
//     type: "Blonde",
//     notes: [
//         {
//             note: 4,
//             comment: 'Très bonne découverte !',
//             date: '18/10/2021',
//             owner: 'juju25'
//         },
//         {
//             note: 3,
//             comment: 'Très bonne blonde',
//             date: '17/02/2021',
//             owner: 'matetlot'
//         },
//     ],
//     picture: 'https://www.labieredesloups.fr/assets/images/team/grid/1.png'
// }
const currentPosition = {
    latitude: 45.763420,
    longitude: 4.834277,
}

export default function BeerInfo({navigation}) {

    const beerInfo = useSelector(store => store.beerInfo)
    // const currentPosition = useSelector(store => store.initialPosition)

    const [sellers, setSellers] = useState([]);
    const [like, setLike] = useState(false);
    const [region, setRegion] = useState(currentPosition)


    useEffect(() => {
        (async () => {
            const request = await fetch(`http://192.168.1.111:3000/get-sellers/${JSON.stringify(currentPosition)}/${beerInfo.id}`)
            const result = await request.json()
            setSellers(result.sellers)
        })()
    }, [])


    // --- note globale --- //
    let stars = [];
    let globalNote = 0;
    // beerInfo.notes.forEach(el => globalNote += el.note);
    // globalNote = Math.floor(globalNote / beerInfo.notes.length);
    // for (let i = 0; i < 5; i++) {
    //     if (globalNote > i) {
    //         stars.push(<Icon style={styles.star} name="star" size={30} color="#FAE16C" />)
    //     } else stars.push(<Icon style={styles.star} name="star" size={30} color="#FEF5CB" />)
    // }


    // --- marqueurs des revendeurs --- //
    let markers = [];
    if (sellers.length !== 0) {
        sellers.forEach(el => markers.push(
        <Marker
            coordinate={{ latitude: el.latitude, longitude: el.longitude }}
            title={el.name}
            description={el.type === 'brewery' ? 'Brasserie' : el.type === 'shop' ? 'Magasin' : 'Bar/Restaurant'}
        >
            <Icon5 style={styles.star} name="map-marker-alt" size={30} color="#194454" />
        </Marker>
        ))
    }

    // get date 
    let date = new Date()
    let today = date.getDay();

    // --- stars by note --- //
    const starByNote = (s) => {
        return s()
    }

    

    return (
        <View style={styles.container} >
            <View style={styles.topBar} >
                <Icon onPress={() => navigation.navigate('BeerList')} style={styles.icon} name="chevron-left" size={30} color="#fff" />
                <Text style={styles.text}>{beerInfo.name}</Text>
            </View>
            <ScrollView nestedScrollEnabled={true} >
                <View style={styles.infos}>
                    <View style={{ position: 'relative' }}>
                        <Image style={styles.image} source={{ uri: beerInfo.picture, }} />
                        {!like ? <IconM onPress={() => setLike(!like)} style={styles.heart} name="heart-plus" size={30} color="#FAE16C" />
                            : <IconM onPress={() => setLike(!like)} style={styles.heart} name="heart-plus" size={30} color="#A15640" />
                        }

                    </View>
                    <View>
                        <View style={styles.badge}>
                            <Image style={styles.iconInfo} source={require('../assets/beer.png')} />
                            <Text style={styles.badgebackground}>{beerInfo.type}</Text>
                        </View>
                        <View style={styles.badge}>
                            <Image style={styles.iconInfo} source={require('../assets/pas-dalcool.png')} />
                            <Text style={styles.badgebackground}>{beerInfo.alcool + "% Alc."}</Text>
                        </View>
                        <Text style={styles.slogan}>{beerInfo.slogan}</Text>
                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <Text style={styles.avis}>L'avis des buveurs</Text>
                            <View style={styles.starContainer}>
                                {/* {stars} */}
                                <Text>({beerInfo.notes.length})</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#194454', margin: 10 }}>Où puis-je la trouver ?</Text>
                <MapView
                    style={{ width: '100%', height: 300 }}
                    region={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: 0.15,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {markers}
                    <MapView.Marker coordinate={currentPosition} >
                        <View style={{ height: 15, width: 15, backgroundColor: '#737CD3', borderRadius: 50, borderWidth: 3, borderColor: "#FCFCFC" }} />
                    </MapView.Marker>
                </MapView>

                {/* liste vendeurs */}
                <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: '#194454', width: '100%', maxHeight: 260, padding: 10 }}>
                    {sellers.map((el, i) => (
                        <View key={i} style={styles.sellerCard} >
                            <Icon5 style={styles.star} name="map-marker-alt" size={30} color="#FAE16C" />
                            <Text onPress={() => setRegion({latitude: el.latitude, longitude: el.longitude})} style={{ fontSize: 20, color: '#194454' }}>{el.name}</Text>
                            <Text style={{ color: 'lightgrey' }}>{el.hours[today].openings}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* section avis */}
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#194454', margin: 10 }}>Les derniers avis</Text>
                <View style={styles.notes}>
                    <Text style={styles.addnote}><Icon name="plus" size={30} color="lightgrey" />   Laisser mon avis ...</Text>

                    {/* {beerInfo.notes.map((el, i) => (
                        <View style={styles.card}>
                            <View style={styles.starContainer}>
                                {starByNote(() => {
                                    let stars = [];
                                    for (let i = 0; i < 5; i++) {
                                        if (el.note > i) {
                                            stars.push(<Icon style={styles.star} name="star" size={27} color="#FAE16C" />)
                                        } else stars.push(<Icon style={styles.star} name="star" size={27} color="#FEF5CB" />)
                                    }
                                    return stars
                                })}
                            </View>
                            <View>
                                <View style={styles.cardInfo}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ margin: 10, backgroundColor: 'grey', width: 30, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon name="user" size={20} color="#fff" />
                                        </View>
                                        <Text>{el.owner}</Text>
                                    </View>
                                    <Text style={{ fontSize: 11 }}>{el.date}</Text>
                                </View>
                                <Text style={{ fontSize: 18, width: 180 }}>{el.comment}</Text>
                            </View>
                        </View>
                    ))} */}



                </View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    infos: {
        width: '100%',
        height: 380,
        flexDirection: 'row',
        padding: 10,
    },
    topBar: {
        width: '100%',
        height: 80,
        backgroundColor: '#194454',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 25,
        color: '#fff',
    },
    icon: {
        padding: 20,
    },
    image: {
        width: 130,
        height: 350,
    },
    heart: {
        position: 'absolute',
        right: 0,
    },
    iconInfo: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
    badge: {
        flexDirection: 'row',
        padding: 15,
        paddingBottom: 0,
    },
    badgebackground: {
        backgroundColor: '#194454',
        borderRadius: 50,
        color: "#FAE16C",
        padding: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    slogan: {
        fontSize: 20,
        width: 200,
        textAlign: 'center',
        marginTop: 20,
        color: '#194454',
    },
    avis: {
        borderBottomWidth: 2,
        borderBottomColor: '#194454',
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    star: {
        marginRight: 5,
    },
    sellerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    notes: {
        width: '100%',
        borderWidth: 1,
        borderColor: "#194454",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    addnote: {
        color: 'lightgrey',
        fontSize: 22,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#194454',
    },
    card: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#194454',
        padding: 5,
    },
    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})