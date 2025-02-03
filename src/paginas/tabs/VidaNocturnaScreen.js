import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

// Lista de eventos nocturnos
const eventosNocturnos = [
    {
      id: '1',
      nombre: 'Fiesta en la Discoteca X',
      descripcion: '¡Únete a la fiesta más épica de la ciudad con DJs en vivo!',
      imagen: 'https://www.ejemplo.com/fiesta1.jpg'
    },
    {
      id: '2',
      nombre: 'Noches de Salsa',
      descripcion: 'Baila salsa toda la noche en el club Y.',
      imagen: 'https://www.ejemplo.com/fiesta2.jpg'
    },
    {
      id: '3',
      nombre: 'Concierto en Vivo',
      descripcion: 'Disfruta de un concierto en vivo de tu banda favorita.',
      imagen: 'https://www.ejemplo.com/fiesta3.jpg'
    }
]

export function VidaNocturnaScreen() {

  const navigation = useNavigation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Clasificaciones de restaurantes
  const categorias = [
    'Todos',
    'Discotecas',
    'Conciertos',
    'Pub',
    'Bares de copas',
    'Salsa'
  ];

  // Función para alternar la visibilidad del menú desplegable
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Renderiza la lista de eventos
  const renderItem = ({ item }) => (
    <View style={styles.eventoContainer}>
      <Image source={{ uri: item.imagen }} style={styles.imagenEvento} />
      <Text style={styles.nombreEvento}>{item.nombre}</Text>
      <Text style={styles.descripcionEvento}>{item.descripcion}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        {/* Botón de inicio */}
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Botón FILTRO (centrado) */}
        <LinearGradient
          colors={['#22c55e', '#9333ea']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <TouchableOpacity style={styles.eventNightFilter} onPress={toggleDropdown}>
            <Text style={styles.eventNightFilterTitle}>EVENTOS NOCTURNOS</Text>
            <Ionicons name={isDropdownVisible ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Espaciado adicional para alinear el filtro en el centro */}
        <View style={styles.placeholder}></View>
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

      {/* Lista de eventos */}
      <FlatList
        data={eventosNocturnos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Esto asegura que los elementos estén distribuidos de manera equitativa
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#1F1F1F',
  },

  homeButton: {
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
    flexGrow: 1, // Esto hace que el filtro se estire en el espacio disponible
    justifyContent: 'center',
    marginLeft: 30, // Añadir un poco de espacio a la izquierda
    marginRight: 30, // Añadir un poco de espacio a la derecha
  },

  eventNightFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  eventNightFilterTitle: {
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

  eventoContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 5
  },

  imagenEvento: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10
  },

  nombreEvento: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },

  descripcionEvento: {
    fontSize: 14,
    color: '#777'
  },

  placeholder: {
    flexGrow: 1,
  },
});
