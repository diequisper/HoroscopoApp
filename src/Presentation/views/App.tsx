/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import { LoginView } from './LoginView';
import { MeshGradient } from '@kuss/react-native-mesh-gradient';
import { HostDimensions } from '../hooks/HostDimensions';
import { HostDimos } from '../constants/HostDimensions';

function App(): React.JSX.Element {
  
  return (
      <SafeAreaView style = {{flex : 1}}>
        <MeshGradient
            colors={['#570000ff', '#940310ff', '#cb0318ff', '#911111ff']}
            style={{
              flex: 1,
              height: HostDimos.screenHeight,
              pointerEvents: 'none',
              position: 'absolute',
              width: '100%'
            }} />
        <LoginView></LoginView>
      </SafeAreaView>
  );
}

export default App;
