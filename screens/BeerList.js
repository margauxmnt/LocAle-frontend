import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function BeerList() {
    return (
        <View style={styles.container}>
            <Text>BeerList</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
