/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StackNavigation } from '../routes/StackNavigation';
import { AuthProvider } from '../context/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';


function App(): React.JSX.Element {
    return (
      <NavigationContainer>
        <AuthProvider>
          <StackNavigation />
        </AuthProvider>
      </NavigationContainer>
    );
}

export default App;
