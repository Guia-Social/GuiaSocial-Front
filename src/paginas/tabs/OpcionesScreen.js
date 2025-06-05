import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons"; 

export function OpcionesScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Opciones</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={50} color="black" style={styles.closeButton} />
        </TouchableOpacity>
      </View>
      {/* Botón de Buscar */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Buscar')}>
        <View style={styles.content}>
          <Ionicons name="search" size={22} color="black" style={styles.icon} />
          <Text style={styles.title}>Buscar</Text>
        </View>
        <Text style={styles.subtitle}>Encuentra lo que buscar entre todos los eventos disponibles.</Text>
      </TouchableOpacity>
      {/* Botón de Crear */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Anadir')}>
        <View style={styles.content}>
          <Ionicons name="add" size={25} color="black" style={styles.icon} />
          <Text style={styles.title}>Añadir nuevo evento</Text>
        </View>
        <Text style={styles.subtitle}>Publica tu propio evento en Social Connect y compártelo.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
  },
  headerContainer: {
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    alignItems: 'center',  
    backgroundColor: '#D9D9D9',  
    paddingHorizontal: 20,  
    paddingVertical: 20,  
    height: 150,  
  },
  headerTitle: {
    color: '#000',  
    fontSize: 24,  
    fontWeight: 'bold',  
    marginTop: 80,
  },
  closeButton: {
    position: 'absolute',  
    left: -35,
    top: 15,
  },
  button: {
    backgroundColor: '#D9D9D9',  
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    marginHorizontal: 15,
    flexDirection: 'column',  
  },
  content: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 5,

  },
  icon: {

    marginRight: 10,  
  },
  title: {
    color: '#000',  
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#000',  
    fontSize: 14,
    marginTop: 5,
  },
});
