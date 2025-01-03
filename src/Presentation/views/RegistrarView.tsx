import React, { useState } from 'react'
import { styles } from './LoginView'
import { MeshGradient } from '@kuss/react-native-mesh-gradient'
import { HostDimensions } from '../hooks/HostDimensions'
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

export const RegistrarView = () => {

  const {screenHeight} = HostDimensions()
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      mode: "date",
      display: Platform.OS === 'ios' ? "calendar" : "spinner",
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setDate(selectedDate);
          setFormattedDate(selectedDate.toLocaleDateString());
        }
      },
    });
  };

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: time,
      mode: "time",
      display: "clock",
      onChange: (event, selectedTime) => {
        if (selectedTime) {
          setTime(selectedTime);
          setFormattedTime(selectedTime.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23"
        }))
        }
      },
    });
  };
    
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
                <TextInput style={styles.input}></TextInput>
              </View>
              <View style={styles.lblInputBox}>
                <Text style={styles.label}>Fecha y Hora de Nacimiento</Text>
                <View style = {formStyle.splitInputBox}>
                  <TextInput value = {formattedDate} onPress={() => showDatePicker()} placeholderTextColor={"rgba(62, 65, 72, 0.8)"}
                    placeholder='Fecha' style={[styles.input, formStyle.twinInput, {marginRight : 10}]}></TextInput>
                  <TextInput placeholderTextColor={"rgba(62, 65, 72, 0.8)"} placeholder='hora'
                    style={[styles.input, formStyle.twinInput]} onPress={() => showTimePicker()} value={formattedTime}></TextInput>
                </View>
              </View>
              <View style={styles.lblInputBox}>
                <Text style={styles.label}>País y Ciudad</Text>
                <View style = {formStyle.splitInputBox}>
                  <TextInput placeholderTextColor={"rgba(62, 65, 72, 0.8)"} placeholder='País' style={[styles.input, formStyle.twinInput, {marginRight : 10}]}></TextInput>
                  <TextInput placeholderTextColor={"rgba(62, 65, 72, 0.8)"} placeholder='Ciudad' style={[styles.input, formStyle.twinInput]}></TextInput>
                </View>
              </View>
              <View style={styles.lblInputBox}>
                <Text style={styles.label}>Usuario</Text>
                <TextInput style={styles.input}></TextInput>
              </View>
              <View style={styles.lblInputBox}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput secureTextEntry={true} style={styles.input}></TextInput>
              </View>
              <View style={[styles.lblInputBox, { marginTop: 20 }]}>
                <Pressable style={[styles.presso, { marginTop: 20, width: 160}]}>
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
