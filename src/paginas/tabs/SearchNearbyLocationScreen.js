import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

export function SearchNearbyLocationScreen() {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Título de la cabecera */}
        <Text style={styles.headerTitle}>Cerca de...</Text>

        {/* Botón de cerrar (X) */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require('../../../assets/boton-cerrar-opciones.png')}  
            style={styles.closeButton}
          />
        </TouchableOpacity>
      </View>

      {/* Selector de ubicación */}
      <View style={styles.locationSelector}>
        <TouchableOpacity style={styles.locationButton}>
          <Image
            source={require('../../../assets/direccion-vector.png')}
            style={styles.iconLocationImage}
          />
          <Text style={styles.locationText}>Mi ubicación actual</Text>
        </TouchableOpacity>
        <View style={styles.locationMunicipalityContainer}>
          <View style={styles.locationTextMunicipality}>
            <Ionicons name="search" size={22} color="white" style={styles.icon} />
            <TextInput 
              style={styles.municipalityTextInput} 
              placeholder="Municipio / Metro" 
              placeholderTextColor="#B0B0B0" 
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',  
    paddingHorizontal: 20,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#BCBCBC',
    paddingHorizontal: 20,
    paddingVertical: 30,  
    height: 150,  
    width: '112%',  
    position: 'absolute',  
    top: 0, 
    left: 0, 
  },

  headerTitle: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,  
  },

  closeButton: {
    width: 24,
    height: 24,
    marginTop: 60,  
    marginRight: 10,
  },

  locationSelector: {
    marginTop: 200, 
    marginBottom: 20,
  },

  locationButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },

  iconLocationImage: {
    width: 20,
    height: 20,
  },

  locationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  locationMunicipalityContainer: {
    borderColor: '#A6A6A6',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },

  locationTextMunicipality: {
    flexDirection: 'row',
    justifyContent: 'flex-start',  
    alignItems: 'center', 
    backgroundColor: '#333',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    height: 50,
  },

  icon: {
    marginRight: 10,  
  },

  municipalityTextInput: {
    flex: 1,  
    color: '#FFFFFF', 
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#333',  
    height: 40,
    borderRadius: 8,
    paddingLeft: 10,
  },
});
