import React, {useEffect, useRef, useState } from 'react'
import { Dimensions, Image, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { HostDimos } from '../constants/HostDimensions';
import { MeshGradient } from '@kuss/react-native-mesh-gradient';


export const LoginView = ({ onLogin }: { onLogin: () => void }) => {
  const [svHeight, setSvHeight]  = useState(0)
  const hasLayoutRun = useRef(false);


  const handleLayout = (event: any) => {
    if (hasLayoutRun.current) return;
    const { height } = event.nativeEvent.layout;
    setSvHeight(height)
    hasLayoutRun.current = true;
  };

  return (
    <View>
      <MeshGradient
        colors={['#570000ff', '#940310ff', '#cb0318ff', '#911111ff']}
        style={{
          flex: 1,
          height: HostDimos().screenHeight,
          pointerEvents: 'none',
          position: 'absolute',
          width: '100%'
        }} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.container, { height: HostDimos().screenHeight }]}>
          <View onLayout={handleLayout} style={[styles.foreground, {
            top: (HostDimos().screenHeight / 2) - (svHeight / 2),
            transform: [
              { translateX: -175 }
            ]
          }]}>
            <View style={styles.tbox}>
              <Text style={styles.title}>Horoscopo App</Text>
              <Image source={require('../assets/images/rb_27307.png')} style={{ width: 140, height: 140, marginTop: 20 }} />
            </View>
            <View style={styles.formbox}>
              <View style={styles.lblInputBox}>
                <Text style={styles.label}>Usuario</Text>
                <TextInput style={styles.input}></TextInput>
              </View>
              <View style={styles.lblInputBox}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput secureTextEntry={true} style={styles.input}></TextInput>
              </View>
              <View style={[styles.lblInputBox, { marginTop: 20 }]}>
                <Pressable
                  style={styles.presso}
                  onPress={onLogin}>
                  <Text style={styles.btnText}>Entrar</Text>
                </Pressable>
                <Pressable style={[styles.presso, { marginTop: 20, width: 160, height: 40 }]}>
                  <Text style={[styles.btnText, { fontSize: 16 }]}>Registrar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex : 1
  },
  tbox : {
    flex: 1,
    height : 160,
    alignItems : "center",
  },
  foreground : {
    width : 350,
    position : "absolute",
    left : "50%",
  },
  title : {
    fontSize : 32,
    color : "white",
    fontWeight : "bold"
  },
  formbox : {
    flex : 6,
    paddingLeft : 30,
    paddingRight : 30,
    //backgroundColor : "black",
    flexDirection : "column",
    marginTop : 100
  },
  label : {
    fontSize : 20,
    color : "white",
    //backgroundColor : "orange"
  },
  lblInputBox : {
    //backgroundColor : "red",
    justifyContent : "space-between",
    flexDirection : "column",
    marginBottom : 30
  },
  input : {
    fontSize : 18,
    backgroundColor : "rgba(209, 214, 231, 0.5)",
    borderRadius : 14
  },
  presso : {
    backgroundColor : "rgba(209, 214, 231, 0.5)",
    height : 60,
    width : 200,
    borderRadius : 14,
    alignSelf : "center",
    justifyContent : "center"
  },
  btnText : {
    fontSize : 20,
    fontWeight : "500",
    color : "white",
    alignSelf : "center"
  }
});