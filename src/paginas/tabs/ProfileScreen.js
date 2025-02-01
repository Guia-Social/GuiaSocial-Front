import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export function ProfileScreen() {
    const navigation = useNavigation();
    return (
        
      <View style={styles.container}>
        {/* Perfil de usuario */}
        <View style={styles.profileContainer}>
            <Ionicons name="person-circle" size={150} color="#fff"></Ionicons>
            <Text style={styles.userName}>Nombre de usuario</Text>
        </View>

        {/* Eventos */}
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Eventos</Text>
            <Text style={styles.sectionItem}>Nº Eventos asistidos: 10</Text>
            <Text style={styles.sectionItem}>Eventos disponibles: 25</Text>
        </View>

        {/* Eventos favoritos */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Favoritos</Text>
          <Text style={styles.sectionItem}>Nº Eventos asistidos favoritos: 6</Text>
        </View>

        {/* Amigos del usuario */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Amigos</Text>
          <Text style={styles.sectionItem}>Nº Amigos: 14</Text>
          <Text style={styles.sectionItem}>Solicitudes de amistad: 9</Text>
        </View>

        {/* Botón para volver a la pagina principal */}
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logoutButtonText}>Volver al inicio</Text>
        </TouchableOpacity>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingTop: 30,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContainer: {
    width: '80%',
    backgroundColor: '#1e1e1e',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    color: '#70c100',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionItem: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  homeButton: {
    backgroundColor: '#70C100',
    paddingVertical: 12,
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});