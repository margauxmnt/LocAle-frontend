import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeBaseProvider, Avatar, Button, ScrollView, Image } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';


export default function Profile({ navigation }) {

    //récupération du token dans le store
    const token = useSelector(store => store.token)
    //variable contenant les infos de l'utilisateur
    const [user, setUser] = useState({});


    useEffect(() => {
        if (token === '') {
            navigation.navigate('StackNav', { screen: 'Log' });
        } else {
            async function getUserInfos() {
                //attention ADRESSE IP à changer en fonction
                let rawResponse = await fetch(`http://192.168.1.42:3000/users/get-user-infos?token=${token}`);
                let response = await rawResponse.json();
                // si le token correspond on met à jour les infos pour dynamiser la page, sinon on renvoie sur la page LOG (à changer ci-dessous)
                setUser(response.user)
            }; getUserInfos();
        }
    }, [token]);

    console.log(token)
    //récupération des infos de l'utilisateur à l'initialisation du composant




    // --- stars by note --- //
    const starByNote = (s) => {
        return s();
    }

    if (user.notes == undefined) {
        return <View />
    } else {
        let userNotes = user.notes.map(function (el, i) {
            return <View key={i} style={styles.card}>
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
                                        stars.push(<Icon style={styles.star} name="star" size={27} color="#FAE16C" />)
                                    } else stars.push(<Icon style={styles.star} name="star" size={27} color="#FEF5CB" />)
                                }
                                return stars
                            })}
                        </View>
                        <Text style={{ color: '#194454', fontWeight: 'bold' }}>{el.comment}</Text>
                    </View>
                </View>
            </View>
        })


        return (
            <NativeBaseProvider>

                <View style={styles.header}>
                    <Text style={styles.headerText}>Mon compte</Text>
                </View>

                <View style={styles.container} >

                    <Ionicons style={styles.logOut} name="log-out-outline" size={30} color="#8395a7" />

                    <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Avatar
                                size="xl"
                                source={require('../assets/logo_matth_transparent.png')}
                            />
                            <Icon name="edit" size={15} color={'#194454'} style={styles.editAvatar} />
                        </View>

                        <View style={styles.userInfos}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#194454', fontSize: 20 }}>{user.pseudo}</Text>
                                <Icon name="edit" size={15} style={styles.editIcon} />
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

                    {/** si pas de commentaires laissés  */}

                    {/* <View style={styles.card}>
                            <Text style={{ color: '#194454' }}>Vous n'avez pas encore laissé de notes ou commentaires</Text>
                        </View> */}

                    {/** si il y a des commentaires laissés pas l'utilisateur  */}
                    <ScrollView>
                        {userNotes}
                    </ScrollView>

                </View >

            </NativeBaseProvider>
        )
    }
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
})