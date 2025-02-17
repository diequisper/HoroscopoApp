import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WesternHoroscope } from '../components/WesternHoroscope';
import { ChineseHoroscope } from '../components/ChineseHoroscope';
import { VeredicHoroscope } from '../components/VeredicHoroscope';
import Home from '../components/HomeScreen';
import { RegistrarView } from '../views/auth/RegistrarView';
import { LoginView } from '../views/auth/LoginView';
import { UseAuthStore } from '../hooks/UseAuthStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StorageAdapter } from '../../Data/sources/local/LocalStorage';


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

    const {logout} = UseAuthStore()
    const navigation = useNavigation<NavigationProp<RootStackParams>>()

    return (
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
                                    onPress={async () => {logout(); 
                                        navigation.navigate("Login");
                                        await StorageAdapter.removeItem('thisSignoW')
                                        await StorageAdapter.removeItem('thisHcTodayW')
                                        await StorageAdapter.removeItem('thisSignoC')
                                        await StorageAdapter.removeItem('thisHcTodayC')}}
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
    )
}
