import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export function GastronomiaScreen({ image, name, foodType, address }) {
  const navigation = useNavigation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Clasificaciones de restaurantes
  const categorias = [
    'Asiatica',
    'Mediterranea',
    'Vegetariana',
    'Carne',
    'Mexicana',
    'Italiana',
    'Pescados y mariscos'
  ];

  // Función para alternar la visibilidad del menú desplegable
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Navegar a la página de inicio
  const goHome = () => {
    navigation.navigate('Home');  // Aquí 'Home' es el nombre de la ruta que lleva al HomeScreen.js
  };

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        {/* Botón de inicio */}
        <TouchableOpacity style={styles.homeButton} onPress={goHome}>
          <Ionicons name="home" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Botón FILTRO */}
        <LinearGradient
          colors={['#22c55e', '#9333ea']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <TouchableOpacity style={styles.filterFoodButton} onPress={toggleDropdown}>
            <Text style={styles.filterFood}>GASTRONOMÍA</Text>
            <Ionicons name={isDropdownVisible ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Desplegable con las categorías de restaurantes */}
      {isDropdownVisible && (
        <View style={styles.dropdownMenu}>
          {categorias.map((categoria, index) => (
            <TouchableOpacity key={index} style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>{categoria}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Aquí va el contenido de la página de Gastronomía */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.restaurantPost}>
          {/* Imagen del restaurante */}
          <Image source={{ uri: image }} style={styles.restaurantImage} />

          {/* Información del restaurante */}
          <View style={styles.infoContainer}>
            <Text style={styles.restaurantName}>{name}</Text>
            <Text style={styles.foodType}>{foodType}</Text>
            <Text style={styles.address}>{address}</Text>

            {/* Botón para ver más detalles */}
            <TouchableOpacity style={styles.button} onPress={() => alert('Ver detalles')}>
              <Text style={styles.buttonText}>Ver Detalles</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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

  gradientBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 2,
    paddingHorizontal: 2,
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

  dropdownMenu: {
    backgroundColor: '#333',
    width: 150, // Ancho más estrecho
    borderRadius: 10,
    marginTop: 5,
    position: 'absolute',
    top: 100, // Asegura que se abra justo debajo del botón
    left: '50%',
    transform: [{ translateX: -75 }], // Centra el desplegable
    paddingVertical: 5,
    zIndex: 1,
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },

  dropdownItemText: {
    color: '#fff',
    fontSize: 16,
  },

  contentContainer: {
    paddingHorizontal: 20,
  },

  restaurantPost: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 20,
  },

  restaurantImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  infoContainer: {
    padding: 15,
  },

  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  foodType: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },

  address: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },

  button: {
    marginTop: 15,
    backgroundColor: '#22c55e',
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
