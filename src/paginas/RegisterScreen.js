import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';  
import { LinearGradient } from 'expo-linear-gradient';
import CONFIG from './ip';


export function RegisterScreen() {
  const [nick, setNick] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const navigation = useNavigation();  

  const registrarEnSQL = async () => {
    const userData = { name: nick, password: contrasena, email: correo };

    try {
      const response = await fetch(`http://${CONFIG.IP}:8080/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar en SQL");
      }

      navigation.navigate('Login');
    } catch (error) {
      console.error("Error al registrar en SQL:", error.message);
    }
  };

  const handleRegister = async () => {
    if (contrasena !== confirmarContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (nick && correo && contrasena && confirmarContrasena) {
      Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada', [{ text: 'OK', onPress: registrarEnSQL }]);
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logoGiraldillo.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>EL GIRALDILLO</Text>

      <TextInput style={styles.input} placeholder="Introduzca su nick" placeholderTextColor="#ccc" value={nick} onChangeText={setNick} />
      <TextInput style={styles.input} placeholder="Introduzca su correo" placeholderTextColor="#ccc" keyboardType="email-address" value={correo} onChangeText={setCorreo} />
      <TextInput style={styles.input} placeholder="Introduzca su contraseña" placeholderTextColor="#ccc" secureTextEntry value={contrasena} onChangeText={setContrasena} />
      <TextInput style={styles.input} placeholder="Confirmar contraseña" placeholderTextColor="#ccc" secureTextEntry value={confirmarContrasena} onChangeText={setConfirmarContrasena} />

      <TouchableOpacity onPress={handleRegister}>
        <LinearGradient colors={['#22c55e', '#9333ea']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.button}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    backgroundColor: '#323639',
    color: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
