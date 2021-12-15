
import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Typeahead, Box, Heading, useColorMode, NativeBaseProvider, Center, Image } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IPADRESS from '../AdressIP';


function TypeaheadUsingComponentWithRenderItem(props) {

    const [filterText, setFilterText] = useState('');
    const dispatch = useDispatch();
    const [data, setData] = useState([])


    useEffect(() => {
        (async () => {
            const request = await fetch(`http://${IPADRESS}:3000/get-beers-n-notes`)
            const result = await request.json();
            result.forEach(el => el.note !== undefined ? el.icon = require('../assets/beer.png') : el.icon = require('../assets/brewery.png'))
            setData(result)
        })()

    }, [])


    const filteredItems = React.useMemo(() => {
        return data.filter(
            (item) => item.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1
        );
    }, [filterText]);

    const selectSearch = async (item) => {
        if (item !== null) {
            if (data[item].note !== undefined) {
                const request = await fetch(`http://${IPADRESS}:3000/get-beer/${data[item].id}`)
                const result = await request.json()
                dispatch({ type: 'updateBeer', beerInfo: result })
                setFilterText('')
                props.navigation.navigate('StackNav', { screen: 'BeerInfo' })
            } else {
                const request = await fetch(`http://${IPADRESS}:3000/get-brewery/${data[item].id}`);
                const result = await request.json()
                dispatch({ type: 'selectedBrewerie', brewery: result })
                setFilterText('')
                props.navigation.navigate('StackNav', {screen: 'Homepage'})
            }
        }
    }


    return (
        <Typeahead
            value={''}
            options={filteredItems}
            inputValue={filterText}
            onChange={(v) => setFilterText(v)}
            getOptionLabel={(item) => item.name}
            getOptionKey={(item) => item.key}
            onSelectedItemChange={(value) => selectSearch(value)}
            dropdownHeight={800}
            renderItem={(item) => {

                let stars = [];
                if (item.note) {
                    for (let i = 0; i < 5; i++) {
                        if (item.note > i) stars.push(<Icon name="star" color="#F9D512" size={20} />)
                        else stars.push(<Icon name="star" color="#FDF0AA" size={20} />)
                    }
                }
                
                let avis = [];
                if(stars.length !== 0){
                    avis.push(<View style={{ flexDirection: 'row' }}>{stars}</View>)
                }else if(item.note === null){
                    avis.push(<Text style={{color: '#194454'}}>Pas encore d'avis ...</Text>)
                } 

                return (
                    <View style={{ borderBottomWidth: 1, borderBottomColor: "#194454", backgroundColor: "#fff" }}>
                        <Box flexDirection="row" justifyContent="space-between" p={4}>
                            <View>
                                <Text style={{ fontSize: 22, color: '#194454', fontWeight: 'bold' }}>{item.name}</Text>
                                {avis}
                            </View>
                            {item.brewery ? <Text style={{color: '#194454', marginTop: 10}}>{item.brewery}</Text> : <View/>}
                            <Image source={item.icon} alt="icon" style={{ width: 30, height: 30 }} />
                        </Box>
                    </View>
                );
            }}
            toggleIcon={({ isOpen }) => {
                return isOpen ? <Icon /> : <Icon name="search" style={styles.icon} size={25} color="#8395a7" />;
            }}
        />
    );
}


export default function Search(props) {

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <View style={styles.topBar} >
                    <Text style={styles.text}>Loc'Ale</Text>
                </View>
                <TypeaheadUsingComponentWithRenderItem navigation={props.navigation} />
                <View style={styles.imageContainer}>
                    <Image style={styles.logo} alt='logo' source={require('../assets/logo_loc_ale_contour_bleufonce.png')} />
                </View>
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    topBar: {
        width: '100%',
        height: 80,
        backgroundColor: '#194454',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 35,
        fontWeight: 'bold',
        color: "#fff",
    },
    icon: {
        marginRight: '90%'
    },
    typeAhead: {
        backgroundColor: 'red'
    },
    beer: {
        borderWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: "#194454",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 20,
    },
    logo: {
        width: 350,
        height: 350,
        opacity: 0.5,
        zIndex: -10,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})