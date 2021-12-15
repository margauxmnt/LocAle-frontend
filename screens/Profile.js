import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Avatar, Button, ScrollView, Image, Center, Modal, FormControl, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IPADRESS from '../AdressIP';
import { useFocusEffect } from '@react-navigation/native';

export default function Profile({ navigation }) {

    const dispatch = useDispatch()
    //récupération du token dans le store
    const token = useSelector(store => store.token)
    const userNotes = useSelector(store => store.userNotes)
    //variables contenant les infos de l'utilisateur
    const [user, setUser] = useState({})
    //ouverture modale pour editer le pseudo
    const [showModal, setShowModal] = useState(false)
    const [newPseudo, setNewPseudo] = useState('');

    useEffect(() => {
        if (token !== '') {
            async function getUserInfos() {
                //attention ADRESSE IP à changer en fonction
                let rawResponse = await fetch(`http://${IPADRESS}:3000/users/get-user-infos?token=${token}`);
                let response = await rawResponse.json();
                setUser(response.user)

                dispatch({ type: 'updateNotes', userNotes: response.userNotes })
            }; getUserInfos();

            async function getPermission() {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }; getPermission();
        } 
    }, [token]);


    useFocusEffect(
        React.useCallback(() => {
            if (token.length === 0) {
                navigation.navigate('StackNav', { screen: 'Log' });
            }
            return () => {  }
        }, [token])
    )



    const moreInfoBeer = async (beer) => {
        const request = await fetch(`http://${IPADRESS}:3000/get-beer/${beer._id}`)
        const result = await request.json()

        dispatch({ type: 'updateBeer', beerInfo: result })
        navigation.navigate('StackNav', { screen: 'BeerInfo' })
    }

    const editPseudo = async () => {
        const rawResponse = await fetch(`http://${IPADRESS}:3000/users/edit-pseudo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `pseudo=${newPseudo}&token=${token}`
        })
        await rawResponse.json()
    }

    const pickImage = async () => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!image.cancelled) {
            console.log(image.uri)
            const request = await fetch(`http://${IPADRESS}:3000/users/update-picture`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `avatar=${image.uri}&token=${token}`
            })
            const result = await request.json()
        }
    };

    const logout = () => {
        //non fonctionnel, redirige vers la home puis vers le login et ne remet pas à jour le profil
        dispatch({ type: 'addToken', token: '' })
        dispatch({ type: 'updateWishlist', wishlist: [] })
        AsyncStorage.removeItem('userEmail');
        AsyncStorage.removeItem('userPassword');
        setUser({});
        navigation.navigate('StackNav', {screen: 'Homepage'})
    }

    // --- stars by note --- //
    const starByNote = (s) => {
        return s();
    }


    let Notes = [];
    if (userNotes.length === 0) {
        Notes.push(
            <View style={styles.card}>
                <Text style={{ color: '#194454' }}>Vous n'avez pas encore laissé de notes ou commentaires</Text>
            </View>
        )
    } else {
        Notes = userNotes.map(function (el, i) {
            return (
                <TouchableOpacity key={i} onPress={() => moreInfoBeer(el.beer)} style={styles.card}>
                    <View>
                        <Image style={styles.beerImage} source={{ uri: el.beer.picture }} alt='Image' />
                    </View>
                    <View style={{ marginLeft: 10, width: '75%' }}>
                        <Text style={{ color: '#194454', fontSize: 11 }}>Date</Text>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.starContainer}>
                                {starByNote(() => {
                                    let stars = [];
                                    for (let i = 0; i < 5; i++) {
                                        if (el.note > i) {
                                            stars.push(<Icon key={i} style={styles.star} name="star" size={27} color="#FAE16C" />)
                                        } else stars.push(<Icon key={i} style={styles.star} name="star" size={27} color="#FEF5CB" />)
                                    }
                                    return stars
                                })}
                            </View>
                            <Text style={{ color: '#194454', fontWeight: 'bold' }}>{el.comment}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
    }


    return (
        <NativeBaseProvider>

            <View style={styles.header}>
                <Text style={styles.headerText}>Mon compte</Text>
            </View>

            <View style={styles.container} >

                <Ionicons onPress={() => logout()} style={styles.logOut} name="log-out-outline" size={30} color="#8395a7" />

                <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>

                    <View style={{ flexDirection: 'row' }}>
                        <Avatar
                            size="xl"
                            source={user.avatar !== 'default' ? user.avatar : require('../assets/logo_matth_transparent.png')}
                        />
                        <Icon onPress={pickImage} name="edit" size={15} color={'#194454'} style={styles.editAvatar} />
                    </View>

                    <View style={styles.userInfos}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#194454', fontSize: 20 }}>{newPseudo !== '' ? newPseudo : user.pseudo}</Text>
                            <Icon onPress={() => setShowModal(true)} name="edit" size={15} style={styles.editIcon} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#194454', marginTop: 5, fontSize: 15 }}>{user.email}</Text>
                            <Icon name="edit" size={15} style={styles.editIcon} />
                        </View>

                        <Text style={{ color: '#194454', marginTop: 15 }}>
                            Date inscription: 12/12/2012
                        </Text>
                    </View>
                </View>

                <View style={{ display: 'flex', alignItems: 'center', marginTop: 60, marginBottom: 30 }}>
                    <Button
                        onPress={() => navigation.navigate('Wishlist')}
                        style={styles.toWishlist}
                        size="lg"
                        leftIcon={<Ionicons name="heart-outline" size={35} color="#fff" />}
                        _text={{ fontSize: 20 }}
                    >
                        Mes Favorites
                    </Button>
                </View>

                <View style={styles.headerNotes}>
                    <Text style={styles.historiqueNotes}>Mon historique de notes</Text>
                </View>

                <ScrollView>
                    {Notes}
                </ScrollView>

                <Center flex={1}>
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Modifie tes informations de profil</Modal.Header>
                            <Modal.Body>
                                <FormControl>
                                    <FormControl.Label>Nouveau pseudo</FormControl.Label>
                                    <Input onChangeText={(v) => setNewPseudo(v)} />
                                </FormControl>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button
                                        style={styles.modalButton}
                                        onPress={() => {
                                            editPseudo();
                                            setShowModal(false)
                                        }}
                                    >
                                        <Icon5 name="check" size={30} color="#F9D512" />
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Center>

            </View >

        </NativeBaseProvider>
    )
    // }
};

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
        // alignItems: 'center',
        backgroundColor: '#fff',
    },
    logOut: {
        textAlign: 'right',
        padding: 15,
    },
    userInfos: {
        justifyContent: 'center',
    },
    editIcon: {
        color: '#194454',
        margin: 10
    },
    editAvatar: {
        position: 'absolute',
        right: 3,
        top: 6
    },
    toWishlist: {
        backgroundColor: '#FAE16C',
        borderRadius: 50,
        width: '60%',
    },
    headerNotes: {
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: "#194454",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    historiqueNotes: {
        color: '#194454',
        fontSize: 20,
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: "#194454",
        padding: 10,
    },
    beerImage: {
        width: 50,
        height: 80,
        marginRight: 10
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    star: {
        marginRight: 5,
    },
    modalButton: {
        backgroundColor: '#194454',
        margin: 'auto',
    }
})