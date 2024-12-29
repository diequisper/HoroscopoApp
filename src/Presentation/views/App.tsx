/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
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


const Stack = createStackNavigator();

function App(): React.JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = () => {
    setIsLoggedIn(true); 
  };


  return (
    <NavigationContainer>
      {isLoggedIn ? ( 
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} options={{ title: 'Inicio' }} />
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
