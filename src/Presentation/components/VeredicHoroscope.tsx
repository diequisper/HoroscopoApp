import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const VeredicHoroscope = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Hola soy Horoscope Vedico</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fdf6e4',
    },
    text: {
        fontSize: 22,
        color: '#5a4fcf',
        fontWeight: 'bold',
    },
});
