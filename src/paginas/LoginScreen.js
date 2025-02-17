import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function LoginScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!name || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const userData = {
      name: name, // Se usa 'name' en lugar de 'email'
      password: password,
    };

    try {
      const response = await fetch("http://192.168.107.73:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        setError("Nombre de usuario o contraseña incorrectos");
        console.error("Error del servidor:", errorResponse);
        return;
      }

      const data = await response.json();
      console.log("Login exitoso:", data);

      // Guardar el token en AsyncStorage
      await AsyncStorage.setItem("token", data.token);

      // Redirigir a la pantalla de inicio
      navigation.navigate('Home');

    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/icono-perfil.png')} style={styles.logo} />
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

      <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste la contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>
          ¿No tienes cuenta?
          <Text style={styles.registerLink} onPress={() => navigation.navigate('Registro')}> Crear cuenta</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
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
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#70c100',
    fontSize: 14,
    textAlign: 'center',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#70c100',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#b8b8b8',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  registerLink: {
    color: '#70c100',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});
