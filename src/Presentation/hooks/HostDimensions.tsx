import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Keyboard } from 'react-native';

export const HostDimensions = () => {

  const screenHeight = Dimensions.get("window").height
  let keybHeight = 0;
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (e) => {
      keybHeight = e.endCoordinates.height;
      console.log(`keyboard: ${keybHeight}`);
    });
  
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      keybHeight = 0;
      console.log(`keyboard hidden`);
    });
  
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return {
    screenHeight,
    keybHeight
  }
}
