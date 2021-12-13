import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import { Button, Modal, FormControl, Input, Center, NativeBaseProvider } from "native-base"

export default function BeerInfo({ navigation }) {

    const beerInfo = useSelector(store => store.beerInfo)
    const wishlist = useSelector(store => store.wishlist)
    const token = useSelector(store => store.token)
    const dispatch = useDispatch()
    const currentPosition = useSelector(store => store.location)

    const [sellers, setSellers] = useState([]);
    const [region, setRegion] = useState(currentPosition)
    const [showModal, setShowModal] = useState(false)
    const [myRating, setMyRating] = useState(0);
    const [myComment, setMyComment] = useState('');
    const [like, setLike] = useState(false)


    useEffect(() => {
        const getSellers = async () => {
            const request = await fetch(`http://172.16.190.147:3000/get-sellers/${JSON.stringify(currentPosition)}/${beerInfo._id}`)
            const result = await request.json()
            setSellers(result.sellers)
        }
        getSellers();

        wishlist.forEach(e => { if (e._id === beerInfo._id) setLike(true) })

    }, [beerInfo])


    // --- note globale --- //
    let stars = [];
    let globalNote = 0;

    beerInfo.notes.forEach(el => globalNote += el.note);
    globalNote = Math.floor(globalNote / beerInfo.notes.length);
    for (let i = 0; i < 5; i++) {
        if (globalNote > i) {
            stars.push(<Icon key={i} style={styles.star} name="star" size={30} color="#FAE16C" />)
        } else stars.push(<Icon key={i} style={styles.star} name="star" size={30} color="#FEF5CB" />)
    }


    // --- marqueurs des revendeurs --- //
    let markers = [];
    if (sellers.length !== 0) {
        sellers.forEach((el, i) => markers.push(
            <Marker
                key={i}
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

    let BeerNotes = [];

    if (beerInfo.notes.length === 0) BeerNotes.push(
        <View style={{ padding: 20 }}>
            <Text style={{ width: '80%', color: "lightgrey", fontSize: 18 }}>Cette bière n'a pas encore de note, ajoute en une !</Text>
        </View>
    )

    else BeerNotes = beerInfo.notes.map((el, i) => (
        <View key={i} style={styles.card}>
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
                        <Text style={{ width: 100 }}>{el.owner.pseudo}</Text>
                    </View>
                    <Text style={{ fontSize: 11 }}>date</Text>
                </View>
                <Text style={{ fontSize: 18, width: 180 }}>{el.comment}</Text>
            </View>
        </View>
    ))

    const modalStars = [];
    for (let i = 0; i < 5; i++) {
        if (myRating > i)
            modalStars.push(<Icon onPress={() => setMyRating(i + 1)} style={styles.star} name="star" size={35} color="#FAE16C" />)
        else
            modalStars.push(<Icon onPress={() => setMyRating(i + 1)} style={styles.star} name="star" size={35} color="#FEF5CB" />)
    }


    const goBack = async () => {
        const request = await fetch(`http://172.16.190.147:3000/get-brewery-from-beer/${beerInfo._id}`)
        const result = await request.json()
        dispatch({ type: 'selectedBrewerie', brewery: result })
        navigation.navigate('BeerList')
    }


    const addNote = async () => {
        if(token !== ''){
            const request = await fetch('http://172.16.190.147:3000/users/add-note', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `comment=${myComment}&note=${myRating}&token=${token}&beerId=${beerInfo._id}`
            })
            const result = await request.json()
            dispatch({ type: 'addBeerNote', note: result })
        }else {
            navigation.navigate('StackNav', {screen: 'Log'})
        }
    }


    const addToWishlist = async (beer, isInWishlist) => {
        if(token !== ''){
            if(!isInWishlist){
                dispatch({type: 'addToWishList', beer: beer})
                setLike(true);
            }else {
                dispatch({type: 'removeFromWishlist', beer: beer})
                setLike(false);
            }
            await fetch(`http://172.16.190.147:3000/users/add-To-Wishlist/${beer._id}/${token}`)
        }else{
            navigation.navigate('StackNav', {screen: 'Log'})
        }
    }


    return (
        <NativeBaseProvider>
            <View style={styles.container} >
                {/* top bar */}
                <View style={styles.topBar} >
                    <Icon onPress={() => goBack()} style={styles.icon} name="chevron-left" size={30} color="#fff" />
                    <Text style={styles.text}>{beerInfo.name}</Text>
                </View>

                <ScrollView nestedScrollEnabled={true} >
                    <View style={styles.infos}>
                        <View style={{ position: 'relative' }}>
                            <Image style={styles.image} source={{ uri: beerInfo.picture, }} />
                            {!like ? <IconM onPress={() => addToWishlist(beerInfo, like)} style={styles.heart} name="heart-plus" size={30} color="#FAE16C" />
                                : <IconM onPress={() => addToWishlist(beerInfo, like)} style={styles.heart} name="heart-plus" size={30} color="#A15640" />
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
                                    {stars}
                                    <Text>({beerInfo.notes.length})</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#194454', margin: 10 }}>Où puis-je la trouver ?</Text>
                    <MapView
                        style={{ width: '100%', height: 200 }}
                        region={{
                            latitude: region.coords.latitude,
                            longitude: region.coords.longitude,
                            latitudeDelta: 0.04,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {markers}
                        <MapView.Marker coordinate={region.coords} >
                            <View style={{ height: 15, width: 15, backgroundColor: '#737CD3', borderRadius: 50, borderWidth: 3, borderColor: "#FCFCFC" }} />
                        </MapView.Marker>
                    </MapView>

                    {/* liste vendeurs */}
                    <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: '#194454', width: '100%', maxHeight: 260, padding: 10 }}>
                        {sellers.map((el, i) => (
                            <View key={i} style={styles.sellerCard} >
                                <Icon5 style={styles.star} name="map-marker-alt" size={30} color="#FAE16C" />
                                <Text onPress={() => setRegion({ latitude: el.latitude, longitude: el.longitude })} style={{ fontSize: 20, color: '#194454' }}>{el.name}</Text>
                                <Text style={{ color: 'lightgrey', width: '33%' }}>{el.hours[today].openings}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    {/* section avis */}
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#194454', margin: 10 }}>Les derniers avis</Text>
                    <View style={styles.notes}>
                        <Text onPress={() => setShowModal(true)} style={styles.addnote}><Icon name="plus" size={30} color="lightgrey" />   Laisser mon avis ...</Text>

                        {BeerNotes}

                    </View>
                </ScrollView>

                <Center flex={1}>
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Ajoute ton avis !</Modal.Header>
                            <Modal.Body>
                                <View style={{ flexDirection: 'row' }}>
                                    {modalStars}
                                </View>
                                <FormControl>
                                    <FormControl.Label>Comment l'as tu trouvée ?</FormControl.Label>
                                    <Input onChangeText={(v) => setMyComment(v)} />
                                </FormControl>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button
                                        style={styles.button}
                                        onPress={() => {
                                            addNote();
                                            setShowModal(false)
                                        }}
                                    >
                                        Ajouter
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Center>

            </View >
        </NativeBaseProvider>
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
        borderTopWidth: 1,
        borderColor: '#194454',
        padding: 5,
    },
    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#194454',
        margin: 'auto',
    }
})