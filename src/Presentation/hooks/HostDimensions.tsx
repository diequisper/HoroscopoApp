import {useEffect, useState} from 'react'
import { Dimensions, Keyboard } from 'react-native';

export const HostDimensions = () => {

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    const onKeyboardDidShow = (e: any) => setKeyboardHeight(e.endCoordinates.height);
    const onKeyboardDidHide = () => setKeyboardHeight(0);

    const showListener = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideListener = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return { screenHeight, keyboardHeight };
}
