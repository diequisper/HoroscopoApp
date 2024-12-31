/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginView } from './LoginView';
import { MeshGradient } from '@kuss/react-native-mesh-gradient';
import { HostDimensions } from '../hooks/HostDimensions';
import { HostDimos } from '../constants/HostDimensions';
import { WesternHoroscope } from '../components/WesternHoroscope';
import { ChineseHoroscope } from '../components/ChineseHoroscope';
import { VeredicHoroscope } from '../components/VeredicHoroscope';
import Home from '../components/HomeScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';


const Stack = createStackNavigator();

function App(): React.JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? ( 
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#cb0318ff', 
            },
            headerTitleStyle: {
              color: '#fff', 
              fontSize: 20, 
              fontWeight: 'bold', 
              textShadowColor: 'rgba(0, 0, 0, 0.3)', 
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            },
            headerTintColor: '#fff',
          }}>
          <Stack.Screen name='Home' component={Home} 
            options={
              { 
                title: 'Inicio',
                headerRight: () => (
                  <TouchableOpacity
                    onPress={handleLogout}
                    style={{
                      marginRight: 15, // Espacio del borde derecho
                      padding: 5, // Área de toque más grande
                    }}
                  > 
                    <Image
                      source={require('../assets/images/sign-out.png')}
                      style={{ width: 24, height: 24, tintColor: "white" }}
                      
                    />
                  </TouchableOpacity>
                )
              }
            } 
          />
          <Stack.Screen name="WesternHoroscope" component={WesternHoroscope} options={{ title: 'Horóscopo Occidental' }} />
          <Stack.Screen name="ChineseHoroscope" component={ChineseHoroscope} options={{ title: 'Horóscopo Chino' }} />
          <Stack.Screen name="VedicHoroscope" component={VeredicHoroscope} options={{ title: 'Horóscopo Védico' }} />
        </Stack.Navigator>
      ) : ( 
        <LoginView onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
}

export default App;
