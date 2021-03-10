import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function App(){
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(5);
  
  function generatePass(){
    let pass = "";
    for(let i = 0, n = charset.length; i < size; i++){
      pass += charset.charAt(Math.floor(Math.random() * n));
    }

    setPassword(pass);
  }

  function copyPass(){
    Clipboard.setString(password);
    alert('Senha copiada com sucesso!');
  }

  return(
    <View style={styles.container}>
      <Image 
        source={require('./src/assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>{ size } Caracteres</Text>
      <View style={styles.area}>

        <Slider 
          style={{height: 50}}
          minimumValue={5}
          maximumValue={15}
          minimumTrackTintColor ="#ff0000"
          maximumTrackTintColor = "#000000"
          value={size}
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      {password !== "" && (
        <View style={styles.area}>
          <Text style={styles.password} onLongPress={copyPass}> { password } </Text>
        </View>
      )}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3ff",
  },
  logo:{
    marginBottom: 60,
  },
  title:{
    fontSize: 30,
    fontWeight: "bold",
  },
  area:{
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#ffffff",
    width: "90%",
    borderRadius: 7,
  },
  button:{
    backgroundColor: "#ffa200",
    width: "80%",
    height: 50,
    borderRadius: 7,
    marginBottom: 25,
    
    justifyContent: "center",
    alignItems: "center",

  },
  buttonText:{
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  password:{
    padding: 10,
    textAlign:"center",
    fontSize: 20,
  }
})