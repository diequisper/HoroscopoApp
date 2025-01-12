import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
 
export const VeredicHoroscope = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Horóscopo Vedico del día:</Text>
      <Image
        source={require('../assets/images/horoscp.jpeg')} 
        style={styles.image}
      />
      <Text style={styles.subHeader}>Ashwini (Aries)</Text>
      <ScrollView style={styles.textContainer}>
        <Text style={styles.detailsText}>
        Las personas regidas por Ashwini Nakshatra tienen un día lleno de energía y dinamismo. Es ideal para iniciar proyectos, viajar o resolver problemas rápidamente. Mantén el equilibrio emocional y evita la impulsividad.
        </Text>
      </ScrollView>
    </View>
  )
}
 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B22222',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  subHeader: {
    fontSize: 18,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#FFE4E1',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
    width: '100%',
  },
  detailsText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'justify',
  },
});