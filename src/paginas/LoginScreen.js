import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export function LoginScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const GradientText = ({ text, style }) => (
    <MaskedView maskElement={<Text style={[style, { backgroundColor: 'transparent' }]}>{text}</Text>}>
      <LinearGradient colors={['#22c55e', '#9333ea']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );

  const handleLogin = async () => {
    if (!name || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch("http://192.168.0.31:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        setError("Nombre de usuario o contraseña incorrectos");
        return;
      }

      const data = await response.json();
      await AsyncStorage.setItem("token", data.token);
      navigation.navigate('Home');
    } catch (error) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logoGiraldillo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>GUÍA SOCIAL</Text>

      <TextInput
        style={styles.input}
        placeholder="Introduzca su nick"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Introduzca su contraseña"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}



      {/* Botón Log in con fondo degradado */}
      <TouchableOpacity onPress={handleLogin}>
        <LinearGradient colors={['#22c55e', '#9333ea']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Crear cuenta con texto degradado */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <GradientText text=" Crear cuenta" style={styles.registerLink} />
        </TouchableOpacity>
      </View>

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
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#323639',
    color: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },

  loginButton: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#b8b8b8',
    fontSize: 14,
  },
  registerLink: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});

