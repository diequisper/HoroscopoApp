/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginView } from './LoginView';
import { WesternHoroscope } from '../components/WesternHoroscope';
import { ChineseHoroscope } from '../components/ChineseHoroscope';
import { VeredicHoroscope } from '../components/VeredicHoroscope';
import Home from '../components/HomeScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RegistrarView } from './RegistrarView';

export type RootStackParams = {
  Login : undefined,
  Registrar : undefined,
  Home : undefined, 
  WesternHoroscope : undefined,
  ChineseHoroscope : undefined,
  VedicHoroscope : undefined
}

const Stack = createStackNavigator<RootStackParams>();

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
          <Stack.Screen name="Login" component={LoginView} options={{title : "Login"}}/>
          <Stack.Screen name="Registrar" component={RegistrarView} options={{title : "Registrar"}}/>
          <Stack.Screen name='Home' component={Home} 
            options={
              { 
                title: 'Inicio',
                headerRight: () => (
                  <TouchableOpacity
                    onPress={handleLogout}
                    style={{
                      marginRight: 15,
                      padding: 5,
                    }}
                  >
                    <Image
                      source={require('../assets/images/sign-out.png')}
                      style={{ width: 24, height: 24, tintColor: 'white' }}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name="WesternHoroscope" component={WesternHoroscope} options={{ title: 'Horóscopo Occidental' }} />
            <Stack.Screen name="ChineseHoroscope" component={ChineseHoroscope} options={{ title: 'Horóscopo Chino' }} />
            <Stack.Screen name="VedicHoroscope" component={VeredicHoroscope} options={{ title: 'Horóscopo Védico' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
