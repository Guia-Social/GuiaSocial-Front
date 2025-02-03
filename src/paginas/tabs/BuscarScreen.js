import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; 

export function BuscarScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Lista de elementos en la que buscar coincidencias
  const items = [
    { name: 'Fiesta en la Discoteca X', screen: 'VidaNocturnaScreen' },
    { name: 'Noches de Salsa', screen: 'VidaNocturnaScreen' },
    { name: 'Concierto en Vivo', screen: 'MusicaScreen' },
    { name: 'Festival de Música', screen: 'MusicaScreen' },
    { name: 'Antique Theatro', screen: 'TeatroYEspectaculoScreen' },
    { name: 'Jazz en el Teatro Alameda', screen: 'TeatroYEspectaculoScreen' },
    { name: 'Concierto de Rock', screen: 'MusicaScreen' }
  ];

  // Navegar a la página de inicio
  const goHome = () => {
    navigation.navigate('Home');
  };

  // Función para manejar el cambio de texto en el campo de búsqueda
  const handleSearchTextChange = (text) => {
    setSearchText(text);
    if (text.length >= 3) {
      const results = items.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Función para navegar a la pantalla seleccionada
  const navigateToEvent = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        {/* Botón de inicio */}
        <TouchableOpacity style={styles.homeButton} onPress={goHome}>
          <Ionicons name="home" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Botón BUSCAR */}
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
        {searchText.length < 3 && (
          <Text style={styles.message}>Escribe al menos 3 caracteres para poder buscar</Text>
        )}

        {/* Mostrar los resultados de la búsqueda */}
        {searchResults.length > 0 && (
          <ScrollView style={styles.resultsContainer}>
            {searchResults.map((result, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.resultItem}
                onPress={() => navigateToEvent(result.screen)}  // Navega al evento correspondiente
              >
                <Text style={styles.resultText}>{result.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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

  searchBox: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 40,  // Espacio para separar del header
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
    borderBottomWidth: 2, // Línea horizontal debajo del campo
    borderBottomColor: '#ccc', // Color de la línea
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
    marginTop: 10,  // El mensaje de error está debajo del botón
  },

  button: {
    backgroundColor: '#fff',  // Fondo blanco
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',  // Borde negro
    marginBottom: 10,  // Espacio debajo del botón
  },

  buttonText: {
    color: '#000',  // Texto negro
    fontWeight: 'bold',
    fontSize: 16,
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
    fontSize: 16,
    color: '#333',
  },
});
