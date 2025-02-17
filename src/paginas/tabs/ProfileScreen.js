import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export function ProfileScreen() {
    const [userName, setUserName] = useState(''); // Estado para guardar el nombre del usuario
    const navigation = useNavigation();

    useEffect(() => {
        // Función para obtener el nombre del usuario desde la API
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token'); // Recuperar el token
                if (token) {
                    const response = await fetch('http://192.168.0.31:8080/api/v1/user/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`, // Enviar el token en el header
                            'Content-Type': 'application/json',
                        }
                    });

                    if (response.ok) {
                        const data = await response.json(); // Parsear la respuesta a JSON
                        setUserName(data.username); // Suponiendo que la API devuelve un campo 'username'
                    } else {
                        console.error('Error fetching user data:', response.statusText);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        // Eliminar el token de AsyncStorage
        await AsyncStorage.removeItem('token');
        
        // Restablecer la navegación para que no se pueda volver a la pantalla anterior
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], // Navega directamente a la pantalla de login
        });
    };

    return (
      <View style={styles.container}>
        {/* Perfil de usuario */}
        <View style={styles.profileContainer}>
            <Ionicons name="person-circle" size={150} color="#fff" />
            <Text style={styles.userName}>{userName || 'Cargando...'}</Text> {/* Mostrar nombre del usuario */}
        </View>

        {/* Botón para volver a la página principal */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <LinearGradient colors={['#22c55e', '#9333ea']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.homeButton}>
                  <Text style={styles.logoutButtonText}>Volver al inicio</Text>
                </LinearGradient>
        </TouchableOpacity>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',  // Centrar contenido verticalmente
    alignItems: 'center',  // Centrar contenido horizontalmente
    paddingHorizontal: 20, // Añadir un poco de margen a los lados para que no esté pegado
  },
  
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  
  homeButton: {
    width: '100%',
    marginTop: '60%',
    paddingVertical: 12,
    paddingHorizontal: 90,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  
  logoutButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
