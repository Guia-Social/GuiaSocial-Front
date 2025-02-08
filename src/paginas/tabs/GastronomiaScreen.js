import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Importo el mock para los eventos
import EventoMock from '../../mocks/EventoMock.json';

export function GastronomiaScreen() {
  const navigation = useNavigation();
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // Filtramos los eventos que tienen tipo "GASTRONOMIA"
    const eventosGastronomia = EventoMock.filter(evento => evento.tipo_de_evento === 'Gastronomía');
    setEventos(eventosGastronomia);
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
            <Text style={styles.filterFood}>GASTRONOMIA</Text>
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
<<<<<<< HEAD
      
=======
     
>>>>>>> e3afab375f44e4f0af3e8cc0c4ccb6452e653cde
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
<<<<<<< HEAD
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
  
=======
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
 
>>>>>>> e3afab375f44e4f0af3e8cc0c4ccb6452e653cde
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
<<<<<<< HEAD
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
=======
>>>>>>> e3afab375f44e4f0af3e8cc0c4ccb6452e653cde
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
});