import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../ip';

export function BuscarScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para obtener eventos desde la API según el texto ingresado
  const fetchEventos = async (nombre) => {
    if (nombre.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No hay un token disponible.');
        setLoading(false);
        return;
      }

      // Cambiar la IP si es necesario
      const response = await fetch(`http://${CONFIG.IP}:8080/api/v1/evento/nombre/${nombre}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Eventos obtenidos:', data);

      if (Array.isArray(data.content)) {
        setSearchResults(data.content); // Solo almacenar los eventos
      } else {
        setSearchResults([]); // Evita errores si la respuesta no es un array
      }
    } catch (error) {
      console.error('Error obteniendo eventos:', error);
      setSearchResults([]); // En caso de fallo, lista vacía
    } finally {
      setLoading(false);
    }
  };

  // Maneja el cambio de texto y llama a la API
  const handleSearchTextChange = (text) => {
    setSearchText(text);
    fetchEventos(text);
  };

  // Navegar a la pantalla seleccionada
  const handleEventPress = (evento) => {
    if (!evento || !evento.id) {
      Alert.alert('Error', 'Evento no válido');
      return;
    }
    navigation.navigate('EventoScreen', { evento });
  };


  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterFoodButton}>
          <Text style={styles.filterFood}>BUSCAR</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido del buscador */}
      <View style={styles.searchBox}>
        <Text style={styles.title}>Buscador</Text>
        <Text style={styles.subtitle}>¿Buscas un evento específico?</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={20} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Buscar"
            value={searchText}
            onChangeText={handleSearchTextChange}
            maxLength={50}
          />
        </View>

        {/* Mensaje si no hay suficientes caracteres */}
        {searchText.length < 3 && (
          <Text style={styles.message}>Escribe al menos 3 caracteres para buscar</Text>
        )}

        {/* Cargando resultados */}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {/* Mostrar los resultados de la búsqueda */}
        {!loading && searchResults.length > 0 ? (
          <ScrollView style={styles.resultsContainer}>
            {searchResults.map((result, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.resultItem}
                // onPress={() => navigation.navigate('EventoScreen', { eventoId: result.id })}
                onPress={() => handleEventPress(result)}

                // onPress={() => navigateToEvent(result.screen)}
              >
                <Text style={styles.resultText}>{result.nombre}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                  <Image
                    source={result.fotoPerfil ? { uri: result.fotoPerfil } : defaultProfileImage}
                    style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
                  />
                  <Text style={{ color: '#000', fontWeight: 'bold', paddingHorizontal: 3, paddingVertical: 7 }}>
                    {result.usuarioNombre || 'Usuario desconocido'}
                  </Text>
                  <Text style={styles.eventDate}>Del {result.fechaInicio} al {result.fechaFin}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : !loading && searchText.length >= 3 && (
          <Text style={styles.noResults}>No hay eventos encontrados</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#1F1F1F',
  },

  homeButton: {
    marginRight: 20,
    padding: 10,
  },

  filterFoodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  filterFood: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },

  eventDate: {
    paddingHorizontal: 10,
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },

  searchBox: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 40,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: '#000',
  },

  message: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },

  resultsContainer: {
    marginTop: 20,
  },

  resultItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  resultText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  noResults: {
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
    marginTop: 10,
  },
});

