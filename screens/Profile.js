import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeBaseProvider, Avatar, Button, ScrollView } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Profile() {
    return (
        <NativeBaseProvider>

            <View style={styles.header}>
                <Text style={styles.headerText}>Mon compte</Text>
            </View>
            
            <View style={styles.container} >

                <Ionicons style={styles.logOut} name="log-out-outline" size={30} color="#8395a7" />

                <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>

                    <View style={{flexDirection: 'row'}}>
                        <Avatar
                            size="xl"
                            source={require('../assets/logo_matth_transparent.png')}
                        />
                        <Icon name="edit" size={15} color={'#194454'}/>
                    </View>
                    
                    <View style={styles.userInfos}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#194454', fontSize: 20}}>Pseudo</Text>
                            <Icon name="edit" size={15} style={styles.editIcon}/>
                        </View>
                        
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#194454', marginTop: 5, fontSize: 15}}>Email@email.com</Text>
                            <Icon name="edit" size={15} style={styles.editIcon} />
                        </View>
                        
                        <Text style={{color: '#194454', marginTop: 15}}>Date inscription: 12/12/2021</Text>
                    </View>
                </View>

                <View style={{ display: 'flex', alignItems: 'center', marginTop: 60, marginBottom: 60 }}>
                    <Button
                        style={styles.toWishlist}
                        size="lg"
                        leftIcon={<Ionicons name="heart-outline" size={35} color="#fff"/>}
                        _text={{fontSize: 20}}
                        >
                        Mes Favorites
                    </Button>
                </View>

                <View style={styles.notes}>
                        <Text style={styles.historique}>Mon historique de notes</Text>
                    
                    {/** si pas de commentaires laissés  */}
                    <View style={styles.card}>
                        <Text >Vous n'avez pas encore laissé de notes ou commentaires</Text>
                    </View>

                    {/** si il y a des commentaires laissés pas l'utilisateur  */}

                    <ScrollView>
                    </ScrollView>

                </View>

            </View >

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
    toWishlist: {
        backgroundColor: '#FAE16C',
        borderRadius: 50,
        width: '60%',
    },
    notes: {
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: "#194454",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    historique: {
        color: '#194454',
        fontSize: 20,
        padding: 10,
    },
})