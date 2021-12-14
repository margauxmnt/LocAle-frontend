import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NativeBaseProvider, ScrollView, Box, Heading, Button, Actionsheet, useDisclose, Pressable, Image, AspectRatio } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IPADRESS from '../AdressIP';

// import des composants pour initialiser la map et la géolocalisation
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';


export default function Homepage({ navigation }) {

    //determine la location de l'utilisateur 
    const [location, setLocation] = useState({ coords: { latitude: 45.764043, longitude: 4.835659 } });
    //localisation de la map
    const [region, setRegion] = useState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1792,
        longitudeDelta: 0.1191,
    });
    //tableaux contenants les brasseries
    const [breweries, setBreweries] = useState([]);
    const dispatch = useDispatch();
    //brasserie sélectionnée
    const [selectedBrewerie, setSelectedBrewerie] = useState({});
    //ouverture des infos brasserie au clic sur celle-ci
    const { isOpen, onOpen, onClose } = useDisclose();
    //horaires d'ouverture de la brasserie en fonction du jour
    const [openingHours, setOpeningHours] = useState("");
    // pour savoir si on se trouve sur la page ou non
    const isFocused = useIsFocused();
    // si une brasserie est sélectionnée, on affiche le modal et on setSelectedBrewerie
    const selectedBrewerieRedux = useSelector(store => store.selectedBrewerie)
    const token = useSelector(store => store.token)
    const wishlist = useSelector(store => store.wishlist)


    useEffect(() => {

        // check si l'utilisateur est déjà connecté ou non
        AsyncStorage.getItem('userEmail', (err, email) => {
            if (email !== null) {
                AsyncStorage.getItem('userPassword', async (err, psw) => {
                    const request = await fetch(`http://${IPADRESS}:3000/users/sign-in`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `email=${email}&password=${psw}`
                    })
                    const result = await request.json()
                    dispatch({ type: 'addToken', token: result.token })
                    dispatch({ type: 'updateWishlist', wishlist: result.wishlist })
                })
            }
        })

        //demande l'autorisation de géolocaliser l'utilisateur à l'initialisation du composant
        async function askPermission() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status == 'granted') {
                // si géolocalisation autorisée, on récupère la localisation de l'utilisateur et on met à jour la variable d'état correspondante
                await Location.watchPositionAsync({ distanceInterval: 10 },
                    (loc) => {
                        setLocation(loc)
                        dispatch({ type: 'userLocalisation', location: loc });
                    });
            }
        } askPermission();

        //envoi de la position au backend et récuperation des brasseries autour de l'utilisateur à l'initiatlisation du composant 
        async function searchBreweries() {
            //attention ADRESSE IP à changer en fonction
            const rawResponse = await fetch(`http://${IPADRESS}:3000/get-breweries?position=${JSON.stringify(location)}&token=${token}`);
            const response = await rawResponse.json();
            if (response) {
                setBreweries(response.breweries);
                dispatch({ type: 'addLocalBreweries', newBreweries: response.breweries });
            };

        };
        searchBreweries();
    }, []);


    // quand on redirige d'une page vers la homepage, si il y a une brasserie à afficher on ouvre la modale avec la brasserie
    // et si il n'y a rien dans le store, on ferme la modale et on ne met aucune infos sélectionée
    useEffect(() => {
        if (selectedBrewerieRedux.length !== 0 && isFocused) {
            selectBrewerie(selectedBrewerieRedux)
        } else {
            setSelectedBrewerie({})
            onClose();
        }
    }, [selectedBrewerieRedux])


    //enregistrement de la brasserie sélectionnée et ouverture de la pop up avec les infos de celle ci
    //récupération du jour pour afficher les horaires du jour de la brasserie sélectionnée
    let selectBrewerie = (brewerie) => {
        setSelectedBrewerie(brewerie);
        onOpen();
        let date = new Date();
        setOpeningHours(brewerie.hours[date.getDay()].openings);
        setRegion({
            latitude: brewerie.latitude,
            longitude: brewerie.longitude,
            latitudeDelta: 0.0492,
            longitudeDelta: 0.0291,
        })
    };

    // création des marqueurs des brasseries autour de l'utilisateur
    let localBreweriesMarkers = breweries.map(function (breweries, i) {
        return <Marker
            key={i}
            onPress={() => selectBrewerie(breweries.brewerie)}
            coordinate={{ latitude: breweries.brewerie.latitude, longitude: breweries.brewerie.longitude }}>
            <Icon name='map-marker' size={35} color={'#194454'} />
        </Marker>
    });

    //création de la liste des brasseries
    let localBreweriesList = breweries.map(function (breweries, i) {
        return <Pressable key={i} onPress={() => selectBrewerie(breweries.brewerie)}>
            <Box
                rounded="lg"
                borderColor="#194454"
                height="50"
                borderWidth="4"
                style={styles.box}>
                <Icon
                    name='map-marker'
                    size={30}
                    style={styles.icon} />
                <Heading style={styles.heading}>
                    {breweries.brewerie.name}
                </Heading>
            </Box>
        </Pressable>
    });

    return (
        // initialisation de la map et marqueur géolocalisé de l'utilisateur
        <NativeBaseProvider>

            <View style={styles.header}>
                <Text style={styles.headerText}>{isOpen ? selectedBrewerie.name : "Loc'Ale"}</Text>
            </View>

            <View style={{ flex: 1 }}>

                <MapView
                    provider={MapView.PROVIDER_GOOGLE}
                    style={styles.container}
                    region={region}>

                    <Marker
                        coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}>
                        <View style={styles.localisation} />
                    </Marker>

                    {localBreweriesMarkers}

                </MapView>

                <Button
                    onPress={() => navigation.navigate('Search')}
                    leftIcon={<Icon name="search" size={30} color={'#8395a7'} />}
                    size="lg"
                    style={styles.search}
                    display={isOpen ? "none" : null}
                    _text={styles.searchText}
                >
                    Rechercher une bière...
                </Button>

                <View style={styles.list}>
                    <ScrollView>
                        {localBreweriesList}
                    </ScrollView>
                </View>

                <Actionsheet
                    isOpen={isOpen}
                    onClose={() => {
                        onClose();
                        setRegion({
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.1792,
                            longitudeDelta: 0.1191,
                        })
                    }}
                    hideDragIndicator>
                    <View style={styles.distance}>
                        <Text style={styles.distanceText}>12 km</Text>
                    </View>
                    <Actionsheet.Content borderTopRadius="0" padding={0}>
                        <Box w="100%" h={350} alignItems='center'>
                            <Box flexDirection='row' w="100%">
                                <AspectRatio w="34%" ratio={1 / 1}>
                                    <Image
                                        source={isOpen ? { uri: selectedBrewerie.pictures[0] } : null}
                                        alt="image"
                                    />
                                </AspectRatio>
                                <AspectRatio w="34%" ratio={1 / 1}>
                                    <Image
                                        source={isOpen ? { uri: selectedBrewerie.pictures[1] } : null}
                                        alt="image"
                                    />
                                </AspectRatio>
                                <AspectRatio w="34%" ratio={1 / 1}>
                                    <Image
                                        source={isOpen ? { uri: selectedBrewerie.pictures[2] } : null}
                                        alt="image"
                                    />
                                </AspectRatio>
                            </Box>
                            <Text style={styles.beweriesDesc} >
                                {selectedBrewerie.description}
                            </Text>
                            <Button
                                onPress={() => {
                                    dispatch({ type: 'selectedBrewerie', brewery: selectedBrewerie });
                                    navigation.navigate('BeerList')
                                }}
                                style={styles.beerButton}
                                size="lg">
                                Découvrir nos bières
                            </Button>
                            <Text style={styles.beweriesOpening} >
                                {openingHours}
                            </Text>
                            <Text style={styles.beweriesAdress} >
                                {selectedBrewerie.adress}
                            </Text>
                        </Box>
                    </Actionsheet.Content>
                </Actionsheet>

            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 80,
        backgroundColor: '#194454',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 35
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    localisation: {
        height: 25,
        width: 25,
        backgroundColor: '#737CD3',
        borderRadius: 50,
        borderStyle: 'solid',
        borderColor: '#FFFFFF',
        borderWidth: 4
    },
    list: {
        backgroundColor: '#194454',
        height: '20%'
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderColor: "#194454",
        height: 50,
        borderWidth: 4,
    },
    heading: {
        // fontFamily: 'roboto',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#194454'
    },
    icon: {
        marginRight: 40,
        marginLeft: 40,
        color: '#FAE16C',
    },
    search: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 0,
        backgroundColor: '#ffffff99',
        borderStyle: 'solid',
        borderColor: '#8395a7',
        borderWidth: 2,
        width: '100%',
        color: '#8395a7'
    },
    searchText: {
        color: "#8395a7",
        // fontFamily: 'roboto',
        fontSize: 20,
        marginLeft: 15,
    },
    beweriesDesc: {
        textAlign: 'center',
        fontStyle: 'italic',
        margin: 12,
        color: "#194454",
        fontSize: 14,
        width: '90%'
    },
    beerButton: {
        backgroundColor: '#FAE16C',
        borderRadius: 50,
    },
    beweriesOpening: {
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 15,
        color: "#194454",
        fontSize: 15,
        width: '70%'
    },
    beweriesAdress: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: "#8395a7",
        fontSize: 14,
        width: '60%'
    },
    distance: {
        position: 'absolute',
        width: 80,
        height: 33,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#194454',
        alignItems: 'center',
        justifyContent: 'center',
        top: '39%',
        right: 15,
        borderRadius: 5,
    },
    distanceText: {
        color: '#194454',
        fontSize: 17,
    }
});
