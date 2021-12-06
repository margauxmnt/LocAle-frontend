import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

export default function BeerInfo() {

    // const [pageScroll, setPageScroll] = useState(true)

    return (
        <ScrollView nestedScrollEnabled={true} style={styles.container} >
            <View style={styles.topBar} >
                <Icon style={styles.icon} name="chevron-left" size={30} color="#fff" />
                <Text style={styles.text}>Beer Name</Text>
            </View>
            <View style={styles.infos}>
                <Image style={styles.image} source={require('../assets/Champ-Libre-1-768x1152.jpeg')} />
                <View>
                    <View style={styles.badge}>
                        <Image style={styles.iconInfo} source={require('../assets/beer.png')} />
                        <Text style={styles.badgebackground}>American Pale Ale</Text>
                    </View>
                    <View style={styles.badge}>
                        <Image style={styles.iconInfo} source={require('../assets/pas-dalcool.png')} />
                        <Text style={styles.badgebackground}>5,2% Alc.</Text>
                    </View>
                    <Text style={styles.slogan}>La Blonde pour "Quand il fait soif".</Text>
                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                        <Text style={styles.avis}>L'avis des buveurs</Text>
                        <View style={styles.starContainer}>
                            <Icon style={styles.star} name="star" size={30} color="#FAE16C" />
                            <Icon style={styles.star} name="star" size={30} color="#FAE16C" />
                            <Icon style={styles.star} name="star" size={30} color="#FAE16C" />
                            <Icon style={styles.star} name="star" size={30} color="#FAE16C" />
                            <Icon style={styles.star} name="star" size={30} color="#FEF5CB" />
                            <Text>(12)</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#194454', marginBottom: 10 }}>Où puis-je la trouver ?</Text>
            <View style={{ backgroundColor: '#FEF5CB', width: '100%', height: 300 }}>
                {/* map */}
            </View>

            {/* liste vendeurs */}
            <ScrollView nestedScrollEnabled={true} style={{ backgroundColor: '#194454', width: '100%', height: 260 }}>
                <View style={styles.sellerCard}>
                    <Icon5 style={styles.star} name="map-marker-alt" size={30} color="#FAE16C" />
                    <Text style={{ fontSize: 25, color: '#194454' }}>Demi-Lune</Text>
                    <Text style={{ color: 'lightgrey' }}>14h - 18h</Text>
                </View>
                <View style={styles.sellerCard}>
                    <Icon5 style={styles.star} name="map-marker-alt" size={30} color="#FAE16C" />
                    <Text style={{ fontSize: 25, color: '#194454' }}>Demi-Lune</Text>
                    <Text style={{ color: 'lightgrey' }}>14h - 18h</Text>
                </View>
                <View style={styles.sellerCard}>
                    <Icon5 style={styles.star} name="map-marker-alt" size={30} color="#FAE16C" />
                    <Text style={{ fontSize: 25, color: '#194454' }}>Demi-Lune</Text>
                    <Text style={{ color: 'lightgrey' }}>14h - 18h</Text>
                </View>
                <View style={styles.sellerCard}>
                    <Icon5 style={styles.star} name="map-marker-alt" size={30} color="#FAE16C" />
                    <Text style={{ fontSize: 25, color: '#194454' }}>Demi-Lune</Text>
                    <Text style={{ color: 'lightgrey' }}>14h - 18h</Text>
                </View>
                <View style={styles.sellerCard}>
                    <Icon5 style={styles.star} name="map-marker-alt" size={30} color="#FAE16C" />
                    <Text style={{ fontSize: 25, color: '#194454' }}>Demi-Lune</Text>
                    <Text style={{ color: 'lightgrey' }}>14h - 18h</Text>
                </View>
            </ScrollView>

            {/* section avis */}
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#194454', margin: 10 }}>Les derniers avis</Text>
            <View style={styles.notes}>
                <Text style={styles.addnote}><Icon name="plus" size={30} color="lightgrey" />   Laisser mon avis ...</Text>

                <View style={styles.card}>
                    <View style={styles.starContainer}>
                        <Icon style={styles.star} name="star" size={27} color="#FAE16C" />
                        <Icon style={styles.star} name="star" size={27} color="#FAE16C" />
                        <Icon style={styles.star} name="star" size={27} color="#FAE16C" />
                        <Icon style={styles.star} name="star" size={27} color="#FAE16C" />
                        <Icon style={styles.star} name="star" size={27} color="#FEF5CB" />
                    </View>
                    <View>
                        <View style={styles.cardInfo}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ margin: 10, backgroundColor: 'grey', height: 32, width: 32, borderRadius: 50 }} />
                                <Text>Pseudo</Text>
                            </View>
                            <Text style={{fontSize: 11}}>17/02/2021</Text>
                        </View>
                        <Text style={{ fontSize: 18, width: 180 }}>Une très bonne découverte !</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.starContainer}>
                        <Icon style={styles.star} name="star" size={27} color="#FAE16C" />
                        <Icon style={styles.star} name="star" size={27} color="#FAE16C" />
                        <Icon style={styles.star} name="star" size={27} color="#FAE16C" />
                        <Icon style={styles.star} name="star" size={27} color="#FAE16C" />
                        <Icon style={styles.star} name="star" size={27} color="#FEF5CB" />
                    </View>
                    <View>
                        <View style={styles.cardInfo}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ margin: 10, backgroundColor: 'grey', height: 32, width: 32, borderRadius: 50 }} />
                                <Text>Pseudo</Text>
                            </View>
                            <Text style={{fontSize: 11}}>17/02/2021</Text>
                        </View>
                        <Text style={{ fontSize: 18, width: 180 }}>Une très bonne découverte !</Text>
                    </View>
                </View>               
                

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infos: {
        width: '100%',
        height: 380,
        flexDirection: 'row',
        padding: 10,
    },
    topBar: {
        width: '100%',
        height: 90,
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
        margin: 10,
        marginBottom: 0,
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