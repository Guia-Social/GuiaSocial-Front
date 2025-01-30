import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export function PruebaScroll() {
  const navigation = useNavigation(); // Para navegar a la pantalla anterior

  return (
        <View style={styles.headerContainer}>
            {/* Título de la cabecera */}
            <Text style={styles.headerTitle}>PruebaScroll</Text>
        
            {/* Botón de cerrar (X) */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image 
                source={require('../../../assets/boton-cerrar-opciones.png')}
                style={styles.closeButton}
                />
            </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    alignItems: 'center',  
    backgroundColor: '#BCBCBC',  
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
    color: '#000',  
    fontSize: 30,  
    marginTop: 80,
  },

  // boton buscar
  searchButton: {
    backgroundColor: '#BCBCBC',  
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',  
    justifyContent: 'center',
    flexDirection: 'column',  
  },
  searchIcon: {
    width: 20,  
    height: 20,  
    marginRight: 10,  
  },
  searchButtonText: {
    color: '#fff',  
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventsAvaible: {
    color: '#000',  
    fontSize: 12,
    marginTop: 5,
  },
});