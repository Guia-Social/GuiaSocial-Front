import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Importo el JSON
import EventoMock from '../../mocks/EventoMock.json';

export function HomeScreen() {
  const navigation = useNavigation();

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // Asignamos los datos del JSON a la constante eventos
    setEventos(EventoMock);
  }, []);

  const openMap = (url) => {
    // Usamos Linking para abrir el enlace en Google Maps
    Linking.openURL(url).catch(err => console.error("No se pudo abrir la ubicación", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Opciones')}>
          <Ionicons name="menu" size={40} color="#fff" />
        </TouchableOpacity>

        <LinearGradient
          colors={['#22c55e', '#9333ea']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <TouchableOpacity style={styles.calendarButton} onPress={() => navigation.navigate('Calendario')}>
            <Text style={styles.calendarTitle}>CALENDARIO</Text>
            <Ionicons name="chevron-down" size={24} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Perfil')}>
          <Ionicons name="person-circle" size={50} color="#fff" />
        </TouchableOpacity>
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

      {/* Lista de eventos */}
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
              <Text style={styles.eventCity}>{evento.ciudad}</Text>
              <Text style={styles.eventDate}>Del {evento.fechaInicio} Al {evento.fechaFin}</Text>

              {/* Icono de mapa para abrir la ubicación en Google Maps */}
              <TouchableOpacity onPress={() => openMap(evento.ubicacion)}>
                <Ionicons name="map" size={24} color="#000" /><Text style={styles.eventLocation}>Ver en mapa</Text>
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 10,
    paddingBottom: 20,
    backgroundColor: '#23272A',
  },
 
  gradientBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23272A',
    borderWidth: 1,
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },

  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#23272A',
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

  /* Estilos de las cards de los eventos */

  eventCategories: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    paddingVertical: 20,
    paddingHorizontal: 5,
    marginBottom: 20, 
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
    fontSize: 20,
    fontWeight: 'bold',
  },

  eventLocation: {
    paddingHorizontal: 10,
    paddingTop: 10, 
    color: '#000000',
    fontSize: 14,
  },

  eventCity: {
    paddingHorizontal: 10,
    paddingBottom: 15,
    color: '#000000',
    fontSize: 14,
  },

  eventDate: {
    paddingHorizontal: 10,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  eventDescription: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  /* Estilos boton localizacion cercana */
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
