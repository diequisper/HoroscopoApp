import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { AuthRepository } from '../../Data/repositories/AuthRepository';
import { UseAuthStore } from '../hooks/UseAuthStore';
import { User } from '../../Domain/entities/User';
import { StorageAdapter } from '../../Data/sources/local/LocalStorage';
 
export const WesternHoroscope = () => {
  const authRepo = new AuthRepository()
  const useAuthStore = UseAuthStore()
  const [respTodays, setRespTs] = useState<string>("");
  const [getThisUser, setThisUser] = useState<User>()
  const [signow, setSignow] = useState<string>("");

  async function getUserStoredInfo(){
    const thisUser = await useAuthStore.verify()
    if(thisUser){
      setThisUser(thisUser)
    }
  }

  async function getTodays(){
    const hcToday = await authRepo.askGemini(`Genera el horóscopo occidental de hoy para una persona
      nacida el ${getThisUser?.birthDate} a las ${getThisUser?.timeBirth} en ${getThisUser?.city}, ${getThisUser?.country}.
      Ámbitos a incluir:
      1. Energía General: Análisis basado en los tránsitos planetarios y su impacto en su signo solar y ascendente.  
      2. Amor y Relaciones: Cómo influyen Venus y la Luna en su vida sentimental, con énfasis en casas astrológicas relevantes.  
      3. Carrera y Finanzas: Impacto de Saturno, Júpiter y Mercurio en su desarrollo profesional y estabilidad económica.  
      4. Salud y Bienestar: Influencia de Marte y la Luna en su estado físico y emocional.  
      5. Influencias Planetarias del Día: Explicación detallada de cómo afectan los tránsitos planetarios a su signo y ascendente.  
      6. Numerología del Día: Cálculo basado en la fecha de hoy y su relación con su número de vida.  
      7. Número y Color de la Suerte: Basado en la influencia planetaria y numerológica del día.  

      Formato:  
      - Presenta la información en párrafos estructurados y con un tono claro y técnico.  
      - Incluye referencias a las casas astrológicas cuando sea relevante.  
      - Usa términos astrológicos precisos y evita generalizaciones.
      - No uses formatos de negritas
      - Solo 1 parrafo de 2 lineas por ámbitos
      - No incluyas nada más que no sean los ámbitos
      - No enumeres los ámbitos

      Si hay algún tránsito planetario importante que afecte su signo zodiacal y ascendente, inclúyelo en la lectura.`)
      await StorageAdapter.setItem('thisHcTodayW', hcToday)
    return hcToday
  }

  async function getSignoW(){
    const signow = await authRepo.askGemini(`Respuesta corta, sin puntos ni añadiduras: ¿A qué signo del horoscopo occidental pertenece una persona
      nacida el ${getThisUser?.birthDate} a las ${getThisUser?.timeBirth}?`)
    await StorageAdapter.setItem('thisSignoW', signow.trim())
    return signow
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
        const thisHcTodayW = await StorageAdapter.getItem('thisHcTodayW') ?? "";
        const thisSignoW = await StorageAdapter.getItem('thisSignoW') ?? "";
  
        if (!thisHcTodayW) {
          const result = await getTodays();
          setRespTs(result);
        } else {
          setRespTs(thisHcTodayW);
        }
  
        if (!thisSignoW) {
          const thisSignow = await getSignoW();
          setSignow(thisSignow);
        } else {
          setSignow(thisSignoW);
        }
      };
      fetchHoroscope();
    }
  }, [getThisUser]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Horóscopo Occidental del día:</Text>
      <Image
        source={require('../assets/images/horoscp.jpeg')} 
        style={styles.image}
      />
      <Text style={styles.subHeader}>{signow.trim()}</Text>
      <ScrollView style={styles.textContainer}>
        <Text style={styles.detailsText}>{respTodays}</Text>
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