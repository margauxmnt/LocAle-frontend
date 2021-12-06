import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BeerInfo() {
    return (
        <View style={styles.container} >
            <View style={styles.topBar} >
                
                <Text><Icon name="chevron-left" size={30} color="#fff" />Beer Name</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        width: '100%',
        height: 100,
        backgroundColor: '#194454',
        // flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
    }
})