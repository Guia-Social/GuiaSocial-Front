import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons"; 


export function HomeScreen() {
  const navigation = useNavigation();

  const eventos = [
    {
      id: 1,
      nombre: 'Antique Theatro',
      lugar: 'Discoteca',
      ubicacion: 'Sevilla',
      calle: 'C. Matemáticos Rey Pastor y Castro, s/n, 41092 Sevilla',
    },
    {
      id: 2,
      nombre: 'Festival de Música',
      lugar: 'Parque Central',
      ubicacion: 'Cádiz',
      calle: 'Av. del Mar, s/n, 11011 Cádiz',
    },
    {
      id: 3,
      nombre: 'Concierto de Jazz',
      lugar: 'Teatro Alameda',
      ubicacion: 'Huelva',
      calle: 'Calle Vázquez López, 12, 21001 Huelva',
    },
    {
      id: 4,
      nombre: 'Concierto de Jazz',
      lugar: 'Teatro Alameda',
      ubicacion: 'Huelva',
      calle: 'Calle Vázquez López, 12, 21001 Huelva',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Opciones')}>
          <Ionicons name="menu" size={40} color="#fff"></Ionicons>
          </TouchableOpacity>

          {/* Degradado aplicado al borde del calendario */}
          <LinearGradient
            colors={['#22c55e', '#9333ea']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}
          >
            <TouchableOpacity style={styles.calendarButton} onPress={() => navigation.navigate('Calendario')}>
              <Text style={styles.calendarTitle}>CALENDARIO</Text>
              <Ionicons name="chevron-down" size={24} color="#fff"></Ionicons>
            </TouchableOpacity>
          </LinearGradient>
          
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Perfil')}>
          <Ionicons name="person-circle" size={50} color="#fff"></Ionicons>
        </TouchableOpacity>
      </View>

      {/* Categorías de eventos */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventCategories}>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>TODOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>GASTRONOMÍA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>VIDA NOCTURNA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>TURISMO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>MÚSICA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>TEATRO Y ESPECTÁCULOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>BUSCAR</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Lista de eventos */}
      <View style={styles.eventList}>
        {eventos.map((evento) => (
          <View key={evento.id} style={styles.eventCard}>
            <Image
              source={require('../../../assets/imagen-evento.png')}
              style={styles.eventImage}
            />
            <Text style={styles.eventTitle}>{evento.nombre}</Text>
            <Text style={styles.eventLocation}>{evento.lugar}</Text>
            <Text style={styles.eventCity}>{evento.ubicacion}</Text>
            <Text style={styles.eventStreet}>{evento.calle}</Text>
          </View>
        ))}
      </View>

      {/* Boton localizaciones cercanas */}
      <LinearGradient
        colors={['#22c55e', '#9333ea']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorderButton}
      >
        <TouchableOpacity style={styles.searchNearByLocationsButton} onPress={() => navigation.navigate('SearchNearbyLocation')}>
          <View style={styles.textContainer}>
            <Image 
              source={require('../../../assets/direccion-vector.png')}
              style={styles.iconImage}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.locationText}>Eventos cerca de</Text>
              <Text style={styles.buttonText}>Sevilla - San Bernardo</Text>
            </View>
            <Image 
              source={require('../../../assets/flecha.png')}
              style={styles.iconArrowImage}
            />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
  },

  scrollContainer: {
    paddingBottom: 20,
    backgroundColor: '#23272A',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#1F1F1F',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuButton: {
    marginRight: 50,
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

  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  calendarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },

  eventCategories: {
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    paddingVertical: 10,
    borderRadius: 10,
  },

  eventCategoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  eventCategoryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },

  eventList: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  eventCard: {
    marginBottom: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    padding: 0,
  },

  eventImage: {
    width: '100%',
    borderRadius: 15,
    marginBottom: 10,
    padding: 100,
  },

  eventTitle: {
    padding: 10,  
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },

  eventLocation: {
    paddingHorizontal: 10,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  eventCity: {
    paddingHorizontal: 10,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  eventStreet: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // Estilos del boton para los eventos cercanos

  // Estilo para el fondo con degradado del botón
  gradientBorderButton: {
    borderRadius: 30,  // Bordes redondeados
    overflow: 'hidden', // Para asegurar que el borde redondeado se aplique
    alignItems: 'center',  // Centra los elementos dentro del botón
    justifyContent: 'center',  // Alinea el contenido en el centro
    flexDirection: 'row',  // Alinea los elementos en una fila
    position: 'absolute',
    top: '43%',  // Ajuste de posición, lo puedes modificar según el diseño
    width: '90%',   // Mantiene el tamaño del botón en un 90% de la pantalla
    left: '5%',     // Centrado horizontal
    borderWidth: 2, // Añade un borde alrededor del botón
    borderColor: '#9333ea', // Color del borde (ajustado para dar visibilidad)
  },

  // Estilo para el botón TouchableOpacity
  searchNearByLocationsButton: {
    flexDirection: 'row',  // Alinea los elementos en una fila
    alignItems: 'center',  // Alinea los iconos y texto verticalmente
    justifyContent: 'space-between',  // Espacia los elementos
    width: '100%',  // El botón ocupa todo el ancho disponible
    backgroundColor: '#2F2F2F',  // Color de fondo
    borderRadius: 20,  // Bordes redondeados
    paddingHorizontal: 40,  // Aumenta el ancho del contenedor para hacerlo más ancho
    paddingVertical: 15,  // Aumenta la altura del botón
  },

  // Estilo para el contenedor de los textos
  textContainer: {
    flexDirection: 'row',  // Alinea los iconos en una fila
    alignItems: 'center',  // Alinea los iconos y texto verticalmente
    width: '80%',           // Ajuste del ancho de los textos
    justifyContent: 'space-between', // Espacio entre los elementos
  },

  // Estilo para el texto "Eventos cerca de"
  locationText: {
    fontSize: 14,  // Tamaño del texto
    color: '#fff',  // Color blanco
    fontWeight: 'normal',  // No en negrita
    marginBottom: 5,  // Espacio entre el texto y el siguiente
  },

  // Estilo para el texto "Sevilla - San Bernardo"
  buttonText: {
    fontSize: 16,  // Tamaño del texto
    color: '#fff',  // Color blanco
    fontWeight: 'bold',  // En negrita
  },

  // Estilo para las imágenes dentro del botón (Dirección)
  iconImage: {
    width: 40,    // Ancho de la imagen
    height: 40,   // Alto de la imagen
    marginHorizontal: 10,  // Espacio entre los iconos y los textos
  },

  // Estilo para la imagen de la flecha
  iconArrowImage: {
    width: 20,    // Ancho de la imagen
    height: 20,   // Alto de la imagen
    resizeMode: 'contain',
  }
});