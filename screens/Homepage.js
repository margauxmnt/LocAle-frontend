import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NativeBaseProvider, ScrollView, Box, Heading, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';

// import des composants pour initialiser la map et la géolocalisation
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';

export default function Homepage({ navigation }) {

    //determine la location de l'utilisateur 
    const [location, setLocation] = useState({ coords: { latitude: 45.764043, longitude: 4.835659 } });
    //tableaux contenants les brasseries
    const [breweries, setBreweries] = useState([]);
    const dispatch = useDispatch();

    //demande l'autorisation de géolocaliser l'utilisateur à l'initialisation du composant
    useEffect(() => {
        async function askPermission() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status == 'granted') {
                // si géolocalisation autorisée, on récupère la localisation de l'utilisateur et on met à jour la variable d'état correspondante
                await Location.watchPositionAsync({ distanceInterval: 10 },
                    (location) => { setLocation(location) });
            }
        } askPermission();

        //envoi de la position au backend et récuperation des brasseries autour de l'utilisateur à l'initiatlisation du composant 
        async function searchBreweries() {
            //attention ADRESSE IP à changer en fonction
            let rawResponse = await fetch(`http://172.16.191.142:3000/get-breweries?position=${JSON.stringify(location)}`);
            var response = await rawResponse.json();
            if (response) {
                setBreweries(response.breweries);
                dispatch({ type: 'addLocalBreweries', newBreweries: response.breweries });
            };
        }; searchBreweries();
    }, []);

    // création des marqueurs des brasseries autour de l'utilisateur
    let localBreweriesMarkers = breweries.map(function (breweries, i) {
        return <Marker
            key={i}
            coordinate={{ latitude: breweries.brewerie.latitude, longitude: breweries.brewerie.longitude }}>
            <Icon name='map-marker' size={35} color={'#194454'} />
        </Marker>
    });

    //création de la liste des brasseries
    let localBreweriesList = breweries.map(function (breweries, i) {
        return <Box
            key={i}
            rounded="lg"
            borderColor="#194454"
            height="50"
            borderWidth="4"
            style={styles.box}
            >
            <Icon
                name='map-marker'
                size={30}
                style={styles.icon} />
            <Heading style={styles.heading}>
                {breweries.brewerie.name}
            </Heading>
        </Box>
    })

    return (
        // initialisation de la map et marqueur géolocalisé de l'utilisateur
        <NativeBaseProvider>

            <View style={styles.header}>
                <Text style={styles.headerText}>Loc'Ale</Text>
            </View>

            <View style={{ flex: 1 }}>

                <MapView
                    onPress={() => navigation.navigate('BeerList')}
                    style={styles.container}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.1792,
                        longitudeDelta: 0.1191,
                    }}>

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
                    _text={styles.searchText}
                >
                    Rechercher une bière...
                </Button>

                <View style={styles.list}>
                    <ScrollView>
                        {localBreweriesList}
                    </ScrollView>
                </View>

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
        // fontFamily: 'roboto',
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
        backgroundColor: '#8395a720',
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
    }
});
