import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { AuthRepository } from '../../Data/repositories/AuthRepository';
import { UseAuthStore } from '../hooks/UseAuthStore';
import { StorageAdapter } from '../../Data/sources/local/LocalStorage';
import { User } from '../../Domain/entities/User';

export const ChineseHoroscope = () => {
    const authRepo = new AuthRepository()
    const useAuthStore = UseAuthStore()
    const [respTodays, setRespTs] = useState<string>("");
    const [getThisUser, setThisUser] = useState<User>()
    const [signoc, setSignoc] = useState<string>("");
  
    async function getUserStoredInfo(){
      const thisUser = await useAuthStore.verify()
      if(thisUser){
        setThisUser(thisUser)
      }
    }
  
    async function getTodays(){
      const hcToday = await authRepo.askGemini(`Genera el horóscopo chino de hoy para una persona
        nacida el ${getThisUser?.birthDate} a las ${getThisUser?.timeBirth} en ${getThisUser?.city}, ${getThisUser?.country}.
        Ámbitos a incluir:
        1. Energía General: Análisis basado en el signo del zodiaco chino, su elemento y los tránsitos energéticos del día.
        2. Amor y Relaciones: Cómo influyen el Yin/Yang y los 5 elementos en su vida sentimental, con énfasis en compatibilidades y desafíos.
        3. Carrera y Finanzas: Impacto de las combinaciones elementales en su éxito laboral y estabilidad económica.
        4. Salud y Bienestar: Influencias energéticas del día en su vitalidad física y equilibrio emocional.
        5. Tránsitos Energéticos del Día: Explicación detallada de cómo afectan los ciclos de los elementos a su signo.
        6. BaZi y Pilar del Destino: Cálculo del Tronco Celestial y la Rama Terrestre de su día de nacimiento y su interacción con el día actual.
        7. Numerología China del Día: Cálculo basado en la fecha hoy y su relación con su número de vida en la tradición china.
        8. Número y Color de la Suerte: Basado en la influencia energética del día.
  
        Formato:  
        - Presenta la información en párrafos estructurados y con un tono claro y técnico.  
        - Incluye referencias a los elementos y energías predominantes cuando sea relevante.
        - Usa términos astrológicos chinos precisos y evita generalizaciones.
        - No uses formatos de negritas
        - Solo 1 parrafo de 2 lineas por ámbito
        - No incluyas nada más que no sean los ámbitos
        - No enumeres los ámbitos
  
        Si hay algún tránsito energético importante que afecte su signo chino, inclúyelo en la lectura.`)
        await StorageAdapter.setItem('thisHcTodayC', hcToday)
      return hcToday
    }
  
    async function getSignoW(){
      const signoc = await authRepo.askGemini(`Respuesta corta, sin puntos ni añadiduras: ¿A qué signo del horoscopo chino pertenece una persona
        nacida el ${getThisUser?.birthDate} a las ${getThisUser?.timeBirth}?`)
      await StorageAdapter.setItem('thisSignoC', signoc.trim())
      return signoc
    }
  
    useEffect(() => {
      const fetchUser = async () => {
        await getUserStoredInfo();
      };
      fetchUser();
    }, []);
    
    useEffect(() => {
      if (getThisUser) {
        const fetchHoroscope = async () => {
          const thisHcTodayC = await StorageAdapter.getItem('thisHcTodayC') ?? "";
          const thisSignoC = await StorageAdapter.getItem('thisSignoC') ?? "";
    
          if (!thisHcTodayC) {
            const result = await getTodays();
            setRespTs(result);
          } else {
            setRespTs(thisHcTodayC);
          }
    
          if (!thisSignoC) {
            const thisSignoc = await getSignoW();
            setSignoc(thisSignoc);
          } else {
            setSignoc(thisSignoC);
          }
        };
        fetchHoroscope();
      }
    }, [getThisUser]);
    
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Horóscopo Chino del día:</Text>
      <Image
        source={require('../assets/images/horoscp2.png')}
        style={styles.image}
      />
      <Text style={styles.subHeader}>{signoc.trim()}</Text>
      <ScrollView style={styles.textContainer}>
        <Text style={styles.detailsText}>{respTodays}</Text>
      </ScrollView>
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
