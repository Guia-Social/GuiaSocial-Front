import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Importo el mock para los eventos
import EventoMock from '../../mocks/EventoMock.json';

export function TurismoScreen() {
  const navigation = useNavigation();
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // Filtramos los eventos que tienen tipo "MUSICA"
    const eventosMusica = EventoMock.filter(evento => evento.tipo_de_evento === 'Turismo');
    setEventos(eventosMusica);
  }, []);

  const openMap = (url) => {
    // Usamos Linking para abrir el enlace en Google Maps
    Linking.openURL(url).catch(err => console.error("No se pudo abrir la ubicación", err));
  };

  // Función para navegar a la página de inicio
  const goHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.homeButton} onPress={goHome}>
          <Ionicons name="home" size={30} color="#fff" />
        </TouchableOpacity>

        <LinearGradient
          colors={['#22c55e', '#9333ea']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <TouchableOpacity style={styles.filterFoodButton}>
            <Text style={styles.filterFood}>TURISMO</Text>
            {/* <Ionicons name={isDropdownVisible ? "chevron-up" : "chevron-down"} size={24} color="#fff" /> */}
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventCategories}>
        {/* Agregar los botones de categorías de eventos */}
        <TouchableOpacity style={styles.eventCategoryButton} onPress={() => navigation.navigate('Gastronomia')}>
          <Text style={styles.eventCategoryButtonText}>GASTRONOMÍA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton} onPress={() => navigation.navigate('vidaNocturna')}>
          <Text style={styles.eventCategoryButtonText}>VIDA NOCTURNA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton} onPress={() => navigation.navigate('turismo')}>
          <Text style={styles.eventCategoryButtonText}>TURISMO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton} onPress={() => navigation.navigate('musica')}>
          <Text style={styles.eventCategoryButtonText}>MÚSICA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton} onPress={() => navigation.navigate('teatroYEspectaculo')}>
          <Text style={styles.eventCategoryButtonText}>TEATRO Y ESPECTÁCULOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton} onPress={() => navigation.navigate('Buscar')}>
          <Text style={styles.eventCategoryButtonText}>BUSCAR</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView>
        <View style={styles.eventList}>
          {eventos.map((evento) => (
            <View key={evento.eventoId} style={styles.eventCard}>
              <Image
                source={require('../../../assets/imagen-evento.png')}
                style={styles.eventImage}
              />
              <Text style={styles.eventTitle}>{evento.nombre}</Text>
              <Text style={styles.eventDescription}>{evento.descripcion}</Text>
              <Text style={styles.eventType}>{evento.tipo_de_evento}</Text>
              <Text style={styles.categoryEventName}>{evento.nombre_categoria}</Text>
              <Text style={styles.eventDate}>Del {evento.fechaInicio} Al {evento.fechaFin}</Text>

              {/* Icono de mapa para abrir la ubicación en Google Maps */}
              <TouchableOpacity style={styles.locationIconEventCity} onPress={() => openMap(evento.ubicacion)}>
                <Image source={require('../../../assets/localizacion.png')} style={styles.locationIconEvent} />
                <Text>{evento.ciudad}</Text>
              </TouchableOpacity>
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
          <TouchableOpacity style={styles.backgroundContainer} onPress={() => navigation.navigate('SearchNearbyLocation')}>
            <Image
              source={require('../../../assets/direccion-vector.png')}
              style={styles.iconLocationImage}
            />
            <View style={styles.containerTextButton} >
              <Text style={styles.nearEvents}>Eventos cerca de</Text>
              <Text style={styles.nearEventsLocation}>Sevilla - San Bernardo</Text>
            </View>
            <View style={styles.iconArrowUpImageContainer}>
              <Image
                source={require('../../../assets/flecha.png')}
                style={styles.iconArrowUpImage}
              />
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
  },

  /* Cabecera */
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

  /* Navegacion horizontal */

  eventCategories: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    paddingVertical: 20,
    paddingHorizontal: 5,
    maxHeight: 60,  // Limita la altura del contenedor
    overflow: 'hidden',  // Recorta el contenido que sobresale
  },

  eventCategoryButton: {
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 0, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 50, 
  },

  eventCategoryButtonText: {
    color: '#000000', 
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',  
    flex: 1, 
  },

  eventCategoryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',  
    flex: 1,
  },
  // profileButton: {
  //   marginRight: 10,
  // },

  eventList: {
    paddingHorizontal: 20,
    marginTop: 30,
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
    fontSize: 20,
    fontWeight: 'bold',
  },

  eventDescription: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  eventType: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  categoryEventName: {
    paddingHorizontal: 10,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'normal',
  },

  eventDate: {
    paddingHorizontal: 10,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  locationIconEvent: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },

  locationIconEventCity: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  /* Estilo boton cercania */
  gradientBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23272A',
    borderWidth: 1,
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },

  buttonLocation: {
    position: 'absolute',
    bottom: 20, 
    left: '5%',
    width: '90%',
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 1000, 
  },
  
  backgroundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23272A',
    borderRadius: 100,
    paddingVertical: 10, 
    paddingHorizontal: 16, 
  },

  nearEvents: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'normal',
    marginBottom: 5,
  },
  
  nearEventsLocation: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  
  iconLocationImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 20, 
  },

  iconArrowUpImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8, 
  },

  iconArrowUpImage: {
    width: 24, 
    height: 18,
    resizeMode: 'contain', 
    marginLeft: 12, 
  },
});