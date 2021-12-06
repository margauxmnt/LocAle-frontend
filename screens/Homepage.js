import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeBaseProvider, ScrollView, Box, Heading, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';

// import des composants pour initialiser la map et la géolocalisation
import MapView, {Marker} from 'react-native-maps'
import * as Location from 'expo-location';

export default function Homepage() {

    //determine la location de l'utilisateur 
    const [location, setLocation] = useState({coords: {latitude: 45.764043, longitude: 4.835659}});
    //tableaux contenants les brasseries
    const [breweries, setBreweries] = useState([]);

    //demande l'autorisation de géolocaliser l'utilisateur à l'initialisation du composant
    useEffect(() => {
        async function askPermission() {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status == 'granted') {
            // si géolocalisation autorisée, on récupère la localisation de l'utilisateur et on met à jour la variable d'état correspondante
            await Location.watchPositionAsync({distanceInterval: 10}, 
            (location) => { setLocation(location)});
            }
        }askPermission();
        // async function searchBreweries(){
            //
        //}
      }, []);

    //import police
    useEffect(() => {
        (async () => await Font.loadAsync({
          Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
        }))();
         }, []);

    return (
        // initialisation de la map et marqueur géolocalisé de l'utilisateur
        <NativeBaseProvider>
            <View style={{ flex: 1 }}>
                <MapView style={styles.container}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Button
                        leftIcon={<Icon name="search" size={30} color={'#8395a7'}/>}
                        size="lg"
                        style={styles.search}
                        _text={styles.searchText}
                    >
                        Rechercher une bière...
                    </Button>
                    <Marker
                        coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}>
                        <View style={styles.localisation} />
                    </Marker>
                </MapView>
                <View style={styles.list}>

                    <ScrollView>
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
                                Brasserie Demi-Lune
                            </Heading>
                        </Box>
                        <Box
                            rounded="lg"
                            style={styles.box}>
                            <Icon
                                name='map-marker'
                                size={30}
                                style={styles.icon} />
                            <Heading style={styles.heading}>
                                Brasserie Demi-Lune
                            </Heading>
                        </Box>
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
                                Brasserie Demi-Lune
                            </Heading>
                        </Box>
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
                                Brasserie Demi-Lune
                            </Heading>
                        </Box>
                    </ScrollView>

                </View>
            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
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
    box : {
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
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 40,
        marginLeft: 40,
        color: '#FAE16C',
    },
    search: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        top: 80,
        backgroundColor: '#8395a720',
        borderStyle:'solid',
        borderColor:'#8395a7',
        borderWidth: 2,
        width: '100%',
        color: '#8395a7'
    },
    searchText: {
        color: "#8395a7",
        fontFamily: 'Roboto',
        fontSize: 20,
        marginLeft: 5
      }
});
