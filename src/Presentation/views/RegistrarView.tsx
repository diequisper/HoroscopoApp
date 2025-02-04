import React, { useRef, useState } from 'react'
import { styles } from './LoginView'
import { MeshGradient } from '@kuss/react-native-mesh-gradient'
import { HostDimensions } from '../hooks/HostDimensions'
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { User } from '../../Domain/User'
import { ToastAndroid } from 'react-native'
import { RootStackParams } from '../routes/StackNavigation'
import { NavigationProp, useNavigation } from '@react-navigation/native'

export const RegistrarView = () => {

  const {screenHeight} = HostDimensions()
  const name = useRef<string>("")
  const country = useRef<string>("");
  const city = useRef<string>("");
  const username = useRef<string>("");
  const password = useRef<string>("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState<Date>(new Date(0));
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      mode: "date",
      display: Platform.OS === 'ios' ? "calendar" : "spinner",
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          if(event.type === "set"){
            setDate(selectedDate);
            setFormattedDate(selectedDate.toLocaleDateString("en-GB", {
              day : "2-digit",
              month : "2-digit",
              year : "2-digit"
            }));
          }
        }
      },
    });
  };

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: time,
      mode: "time",
      display: "spinner",
      onChange: (event, selectedTime) => {
        if(selectedTime){
          if (event.type === "set") {
            setTime(selectedTime);
            setFormattedTime(selectedTime.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23"
          }))}
        }
      },
    });
  };
  
  function registrar(){
    if(!name || !country || !username || !password
        || formattedDate.length < 8 ){

      ToastAndroid.show("Existen campos necesarios en blanco", ToastAndroid.LONG)
      return
    }

    const thisUser : User = new User(1, name.current, date, country.current, username.current, password.current, time, city.current)
    User.users.push(thisUser)
    ToastAndroid.show("Registro exitoso", ToastAndroid.LONG)
    navigation.navigate("Login")
  }

  const handleInput = (input : string, id : string) => {
    if(input != ""){
      switch(id){
        case "name": 
          if (name.current != input) {name.current = input;}
          break;
        case "pais": 
          if (country.current != input) {country.current = input;}
          break
        case "ciudad": 
          if (city.current != input) {city.current = input;}
          break;
        case "usuario": 
          if (username.current != input) {username.current = input;}
          break;
        case "contraseña": 
          if (password.current != input) {password.current = input;}
          break;
        default : break;
      }
    }
  };

  function eraseDateTime(key : string, source : string){
    if(key === "Backspace"){
      switch(source){
        case "time" :
          setFormattedTime("");
          break;
        case "date" :
          switch(formattedDate.length){
            case 8 : 
              setFormattedDate(formattedDate.slice(0, 5));
              break;
            case 5 : 
              setFormattedDate(formattedDate.slice(0, 2));
              break;
            case 2 :
              setFormattedDate("");
              break;
          }
      }
    }
  }
  return (
    <>
      <MeshGradient
        colors={['#570000ff', '#940310ff', '#cb0318ff', '#911111ff']}
        frequency={5}
        speed={5}
        style={{
          flex: 1,
          height: screenHeight,
          pointerEvents: 'none',
          position: 'absolute',
          width: '100%'
        }} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.formbox, formStyle.fullFormBox]}>
          <View style={styles.lblInputBox}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput onEndEditing={(e) => handleInput(e.nativeEvent.text, "name")} style={styles.input}></TextInput>
          </View>
          <View style={styles.lblInputBox}>
            <Text style={styles.label}>Fecha y Hora de Nacimiento</Text>
            <View style = {formStyle.splitInputBox}>
              <TextInput value = {formattedDate} onPress={() => showDatePicker()} placeholderTextColor={"rgba(62, 65, 72, 0.8)"}
               onKeyPress={(e) => eraseDateTime(e.nativeEvent.key, "date")} placeholder='Fecha' style={[styles.input, formStyle.twinInput, {marginRight : 10}]}></TextInput>
              <TextInput placeholderTextColor={"rgba(62, 65, 72, 0.8)"} placeholder='Hora (opcional)' onKeyPress={(e) => eraseDateTime(e.nativeEvent.key, "time")}
                style={[styles.input, formStyle.twinInput]} onPress={() => showTimePicker()} value={formattedTime}></TextInput>
            </View>
          </View>
          <View style={styles.lblInputBox}>
            <Text style={styles.label}>País y Ciudad</Text>
            <View style = {formStyle.splitInputBox}>
              <TextInput placeholderTextColor={"rgba(62, 65, 72, 0.8)"} placeholder='País' onEndEditing={(e) => handleInput(e.nativeEvent.text, "pais")}
              style={[styles.input, formStyle.twinInput, {marginRight : 10}]}></TextInput>
              <TextInput placeholderTextColor={"rgba(62, 65, 72, 0.8)"} placeholder='Ciudad (opcional)'
              onEndEditing={(e) => handleInput(e.nativeEvent.text, "ciudad")} style={[styles.input, formStyle.twinInput]}></TextInput>
            </View>
          </View>
          <View style={styles.lblInputBox}>
            <Text style={styles.label}>Usuario</Text>
            <TextInput style={styles.input}  onEndEditing={(e) => handleInput(e.nativeEvent.text, "usuario")}></TextInput>
          </View>
          <View style={styles.lblInputBox}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput secureTextEntry={true} onEndEditing={(e) => handleInput(e.nativeEvent.text, "contraseña")} style={styles.input}></TextInput>
          </View>
          <View style={[styles.lblInputBox, { marginTop: 20 }]}>
            <Pressable onPress={() => registrar()} style={[styles.presso, { marginTop: 20, width: 160}]}>
              <Text style={[styles.btnText, { fontSize: 16 }]}>Empezar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const formStyle = StyleSheet.create({
  fullFormBox : {
    flex : 1,
    marginTop : 0,
    paddingTop : 40,
    paddingBottom : 40
  },
  splitInputBox : {
    flex : 1, 
    flexDirection : "row",
    justifyContent : "space-between"
  },
  twinInput : {
    flex : 1
  }
})
