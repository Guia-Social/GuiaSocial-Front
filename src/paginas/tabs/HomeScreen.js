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
    <>
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

      {/* Scroll horizontal de categorías de eventos */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventCategories}
      >
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
      <ScrollView>
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
      </ScrollView>

      {/* Boton localizaciones cercanas */}
      <View style={styles.buttonLocation}>
        {/* Degradado aplicado al borde del calendario */}
        <LinearGradient
          colors={['#22c55e', '#9333ea']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.backgroundContainer}>
            <Image
              source={require('../../../assets/direccion-vector.png')}
              style={styles.iconLocationImage}
            />
            <TouchableOpacity style={styles.containerTextButton} onPress={() => navigation.navigate('SearchNearbyLocation')}>
              <Text style={styles.nearEvents}>Eventos cerca de</Text>
              <Text style={styles.nearEventsLocation}>Sevilla - San Bernardo</Text>
            </TouchableOpacity>
            <View style={styles.iconArrowUpImageContainer}>
              <Image
                source={require('../../../assets/flecha.png')}
                style={styles.iconArrowUpImage}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10, // Añadimos espacio entre la cabecera y las categorías
  },

  eventCategoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginRight: 15, // Espacio entre los botones
    backgroundColor: '#ffffff', // Fondo blanco para los botones
    justifyContent: 'center', // Centra el contenido dentro del botón
    alignItems: 'center', // Asegura que el texto esté centrado
    height: 50, // Asegura que los botones tengan una altura fija
  },

  eventCategoryButtonText: {
    color: '#000000',  // Color de texto negro
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',  // Centra el texto dentro del botón
    flex: 1, // Asegura que el texto ocupe todo el espacio disponible
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

  /* Estilos boton localizacion cercana */
  buttonLocation: {
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'fixed',
    bottom: '7%',
    width: '90%',
    left: '5%',
    borderWidth: 1,
    borderColor: 'transparent',
    paddingVertical: 3,
    paddingHorizontal: 3,
    zIndex: 10000,
  },

  nearByLocationsContainerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#2F2F2F',
    borderRadius: 50,
    paddingHorizontal: 35,
    paddingVertical: 15,
  },

  backgroundContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F2F2F',
    borderRadius: 50,
  },

  containerTextButton: {
    flexDirection: 'column', // Organiza los textos en una columna
    alignItems: 'flex-start', // Centra los textos horizontalmente
    justifyContent: 'flex-start', // Centra los textos verticalmente dentro del contenedor
    marginHorizontal: 7, // Espaciado horizontal
    width: '80%', // Ancho del contenedor de texto
  },
  
  nearEvents: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'normal',
    marginBottom: 5, // Espacio entre las líneas de texto
    textAlign: 'center', // Centra el texto en la línea
    marginLeft: 20,
  },
  
  nearEventsLocation: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center', // Centra el texto en la línea
    marginLeft: 20,
  },
  
  iconLocationImage: {
    width: 16,   // Reducir el tamaño del icono
    height: 16,  // Reducir el tamaño del icono
    marginLeft: 10,
  },
});
