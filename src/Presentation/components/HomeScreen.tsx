import { MeshGradient } from '@kuss/react-native-mesh-gradient';
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>

            <MeshGradient
                colors={['#570000ff', '#940310ff', '#cb0318ff', '#911111ff']}
                style={styles.background}
            />

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

    },
    background: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 100, 
        marginTop: -100,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    button: {
        backgroundColor: '#cb0318ff',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        marginVertical: 10,
        width: width * 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});

export default Home;