
import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import { Typeahead, Box, Heading, useColorMode, NativeBaseProvider, Center, Image } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


const data = [
    { id: 1, name: 'La Bière des Loups', icon: require('../assets/brewery.png') },
    { id: 2, name: 'La Blonde', note: 4, icon: require('../assets/beer.png') },
    { id: 3, name: 'La rousse', note: 3, icon: require('../assets/beer.png') },
    { id: 4, name: 'La brune', note: 5, icon: require('../assets/beer.png') },
    { id: 5, name: 'Demi-Lune', icon: require('../assets/brewery.png') },
    { id: 6, name: 'La Champ Libre', note: 5, icon: require('../assets/beer.png') },
    { id: 7, name: 'Lyon Ceylan', note: 4, icon: require('../assets/beer.png') },
    { id: 8, name: 'Bière George', icon: require('../assets/brewery.png') },
    { id: 9, name: 'Princesse Pale Ale', note: 3, icon: require('../assets/beer.png') },
    { id: 10, name: 'More is Bitter', note: 4, icon: require('../assets/beer.png') },
    { id: 11, name: 'Munica Brune', note: 2, icon: require('../assets/beer.png') },
]
function TypeaheadUsingComponentWithRenderItem() {

    const [filterText, setFilterText] = React.useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const filteredItems = React.useMemo(() => {
        return data.filter(
            (item) => item.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1
        );
    }, [filterText]);

    const selectSearch = (item) => {
        if(data[item - 1].note){
            // dispatch({type: 'updateBeer', beerInfo: data[item - 1]})
            navigation.navigate('BeerInfo')
        }else {
            // dispatch({type: 'updateBrewery', brewery: data[item - 1]})
            navigation.navigate('Stack')
        }
        
    }


    return (
        <Typeahead
            options={filteredItems}
            onChange={setFilterText}
            getOptionLabel={(item) => item.name}
            getOptionKey={(item) => item.id}
            onSelectedItemChange={(value) => selectSearch(value)}
            renderItem={(item) => {

                let stars = [];
                if(item.note){
                    for(let i = 0; i < 5; i++){
                        if(item.note > i) stars.push(<Icon name="star" color="#FAE16C" size={20} />)
                        else stars.push(<Icon name="star" color="#FEF5CB" size={20} />)
                    }
                }                

                return (
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#194454"}}>
                        <Box flexDirection="row" justifyContent="space-between" p={4}>
                            <View>
                                <Text style={{ fontSize: 22, color: '#194454', fontWeight: 'bold' }}>{item.name}</Text>
                                {item.note ? <View style={{flexDirection: 'row'}}>{stars}</View> : <View/>}
                            </View>
                            <Image source={item.icon} alt="icon" style={{ width: 30, height: 30 }} />
                        </Box>
                    </View>
                );
            }}
            toggleIcon={({ isOpen }) => {
                return isOpen ? <Icon /> : <Icon name="search" style={styles.icon} size={25} color="#8395a7" />;
            }}
            dropdownHeight={('400px')}
        />
    );
}


export default function Search() {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <View style={styles.topBar} >
                    <Text style={styles.text}>Loc'Ale</Text>
                </View>
                <TypeaheadUsingComponentWithRenderItem />
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
    }
})