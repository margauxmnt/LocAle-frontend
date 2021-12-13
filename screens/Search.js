
import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Typeahead, Box, Heading, useColorMode, NativeBaseProvider, Center, Image } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';


function TypeaheadUsingComponentWithRenderItem(props) {

    const [filterText, setFilterText] = React.useState('');
    const dispatch = useDispatch();
    const [data, setData] = useState([])


    useEffect(() => {
        (async () => {
            const request = await fetch('http://192.168.1.111:3000/get-beers-n-notes')
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

    const selectSearch = (item) => {
        if (data[item].note !== undefined) {
            (async () => {
                const request = await fetch(`http://192.168.1.111:3000/get-beer/${data[item].id}`)
                const result = await request.json()
                dispatch({ type: 'updateBeer', beerInfo: result })
            })()
            props.navigation.navigate('Homepage', { screen: 'BeerInfo' })
        } else {
            (async () => {
                const request = await fetch(`http://192.168.1.111:3000/get-brewery/${data[item].id}`);
                const result = await request.json()
                dispatch({ type: 'selectedBrewerie', brewery: result })
            })()
            props.navigation.navigate('Homepage')
        }
    }


    return (
        <Typeahead
            options={filteredItems}
            onChange={setFilterText}
            getOptionLabel={(item) => item.name}
            getOptionKey={(item) => item.key}
            onSelectedItemChange={(value) => selectSearch(value)}
            dropdownHeight={800}
            renderItem={(item) => {

                let stars = [];
                if (item.note) {
                    for (let i = 0; i < 5; i++) {
                        if (item.note > i) stars.push(<Icon name="star" color="#FAE16C" size={20} />)
                        else stars.push(<Icon name="star" color="#FEF5CB" size={20} />)
                    }
                }

                return (
                    <View style={{ borderBottomWidth: 1, borderBottomColor: "#194454", backgroundColor: "#fff" }}>
                        <Box flexDirection="row" justifyContent="space-between" p={4}>
                            <View>
                                <Text style={{ fontSize: 22, color: '#194454', fontWeight: 'bold' }}>{item.name}</Text>
                                {item.note ? <View style={{ flexDirection: 'row' }}>{stars}</View> : <View />}
                            </View>
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
                    <Image style={styles.logo} alt='logo' source={require('../assets/logo_matth_transparent.png')} />
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