import React from 'react'
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({ navigation }: { navigation: any}) => {
  return (
    <View style={styles.container} >
        <Text style={styles.title}>Escoge una de las 3 opciones</Text>

        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('WesternHoroscope')}
        >   
            <Text style={styles.buttonText}>Horóscopo Occidental</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ChineseHoroscope')}
        >
            <Text style={styles.buttonText}>Horóscopo Chino</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('VedicHoroscope')}
        >
            <Text style={styles.buttonText}>Horóscopo Védico</Text>
        </TouchableOpacity>
    </View>
  )
}

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fdf6e4', 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#5a4fcf', 
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#5a4fcf', 
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 25, 
        marginVertical: 10,
        width: width * 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, 
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Home;