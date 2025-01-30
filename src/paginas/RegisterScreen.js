import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';  

export function RegisterScreen() {

  /* Inicializo las variables para poder usarlas en el registro */
  const [nick, setNick] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  
  const navigation = useNavigation();  // Para tener la navegacion habilitada

  const handleRegister = async () => {
    if (contraseña !== confirmarContraseña) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
    }

    if (nick && nombreCompleto && correo && contraseña && confirmarContraseña) {
        Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada', [
          { text: 'OK', onPress: () => navigation.navigate('Login') } 
        ]);
    } else {
        Alert.alert('Error', 'Por favor, completa todos los campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completar los siguientes campos:</Text>

      {/* Campo de entrada de texto para el nick */}
      <TextInput
        style={styles.input}
        placeholder="Introduzca su nick"
        placeholderTextColor="#aaa"
        value={nick}
        onChangeText={setNick}
      />

      {/* Campo de entrada de texto para el nombre completo del usuario */}
      <TextInput
        style={styles.input}
        placeholder="Introduzca su nombre completo"
        placeholderTextColor="#aaa"
        value={nombreCompleto}
        onChangeText={setNombreCompleto}
      />

      {/* Campo de entrada de texto para el correo electronico */}
      <TextInput
        style={styles.input}
        placeholder="Introduzca su correo"
        placeholderTextColor="#aaa"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />

      {/* Campo de entrada de texto para la contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Introduzca su contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={contraseña}
        onChangeText={setContraseña}
      />

      {/* Campo de entrada de texto para la confirmación de la contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmarContraseña}
        onChangeText={setConfirmarContraseña}
      />

      {/* Boton que finaliza el registro del usuario */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>FINALIZAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 30,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#70c100',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
