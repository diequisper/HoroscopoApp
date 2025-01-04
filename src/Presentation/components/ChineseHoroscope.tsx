import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export const ChineseHoroscope = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Horóscopo Chino del día:</Text>
      <Image
        source={require('../assets/images/horoscp.png')} // Cambia la ruta al ícono que representa el horóscopo
        style={styles.image}
      />
      <Text style={styles.subHeader}>Gallo de Madera</Text>
      <ScrollView style={styles.textContainer}>
        <Text style={styles.detailsText}>
          Naciste en el año del “Gallo”, un signo asociado con la inteligencia,
          la confianza y la energía trabajadora. Las personas del “Gallo” suelen
          ser organizadas, detallistas y con una fuerte ética laboral. Tu
          elemento es la “Madera”, lo que indica creatividad, crecimiento y una
          naturaleza generosa. Las personas de este elemento tienden a ser
          empáticas y diplomáticas.
        </Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    backgroundColor: '#FFE4E1', // Fondo claro para el texto
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#800000', // Botones oscuros
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
