import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Homepage() {
    return (
        <View style={styles.container}>
            <Text>Homepage</Text>
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
