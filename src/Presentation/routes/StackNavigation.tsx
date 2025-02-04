import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react'
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WesternHoroscope } from '../components/WesternHoroscope';
import { ChineseHoroscope } from '../components/ChineseHoroscope';
import { VeredicHoroscope } from '../components/VeredicHoroscope';
import Home from '../components/HomeScreen';
import { RegistrarView } from '../views/RegistrarView';
import { LoginView } from '../views/LoginView';
import { NavigationContainer } from '@react-navigation/native';


export type RootStackParams = {
    Login: undefined,
    Registrar: undefined,
    Home: undefined,
    WesternHoroscope: undefined,
    ChineseHoroscope: undefined,
    VedicHoroscope: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {

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
                <Stack.Screen name="Login" component={LoginView} options={
                    {
                        title: "title",
                        headerShown: false
                    }
                } />
                <Stack.Screen name="Registrar" component={RegistrarView} options={{
                    title: "Registrar",
                    headerShown: false
                }} />
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
    )
}
