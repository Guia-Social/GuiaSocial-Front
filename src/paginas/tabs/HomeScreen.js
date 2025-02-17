import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function HomeScreen() {
  const navigation = useNavigation();

  const [eventos, setEventos] = useState([]);
  const [location, setLocation] = useState(null);  // Guardar ubicación del usuario
  const [errorMsg, setErrorMsg] = useState(null);  // Mensaje de error en caso de problemas
  const [city, setCity] = useState("Cargando...");  // Ciudad actual
  

  useEffect(() => {
    // Función para obtener los eventos
    const fetchEventos = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No hay un token disponible.');
          return;
        }
  
        // Recordad cambiar la ip
        const response = await fetch('http://192.168.0.27:8080/api/v1/evento/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error HTTP! Status: ${response.status}`);
        }
  
        // Almacenar los datos
        const data = await response.json();
        console.log('Eventos obtenidos:', data); // 👉 Verifica en consola qué devuelve la API
  
        // Para almacenar los datos como contenido
        if (Array.isArray(data.content)) {
          setEventos(data.content); // 👉 Solo almacenamos los eventos
        } else {
          setEventos([]); // Evita errores si no es un array
        }
      } catch (error) {
        console.error('Error obteniendo eventos:', error);
        setEventos([]); // Evita el error si la API falla
      }
    };

    fetchEventos();

    // Función para obtener la ubicación
    const getLocation = async () => {
      try {
        // Solicitar permisos de ubicación en el primer plano
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso de ubicación denegado');
          return;
        }

        let locationData = await Location.getCurrentPositionAsync({}); // Obtener ubicación
        setLocation(locationData.coords); // Guardar las coordenadas

        // Obtener la ciudad a partir de las coordenadas
        const geocode = await Location.reverseGeocodeAsync({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        });

        if (geocode.length > 0) {
          setCity(geocode[0].city || "Ubicación no disponible"); // Si encontramos la ciudad
        }
      } catch (error) {
        setErrorMsg('Error al obtener la ubicación');
        console.error(error);
      }
    };

    // Llamar a la función para obtener la ubicación
    getLocation();

  }, []); // Solo se ejecuta al montar el componente

  const openMap = (url) => {
    Linking.openURL(url).catch(err => console.error("No se pudo abrir la ubicación", err));
  };

  const handleEventPress = (evento) => {
    console.log(evento);
    navigation.navigate('EventoScreen', { evento });
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
        <TouchableOpacity style={styles.eventList}>
          {eventos.map((evento) => (
            <View key={evento.eventoId} style={styles.eventCard}>
              <Image
                source={{ uri: evento.imagen }}
                style={styles.eventImage}
              />
              <Text style={styles.eventTitle}>{evento.nombre}</Text>
              <Text style={styles.eventDescription}>{evento.descripcion}</Text>
              <Text style={styles.eventType}>{evento.tipoEvento}</Text>
              <Text style={styles.categoryEventName}>{evento.categoriaNombre}</Text>
              <Text style={styles.eventDate}>Del {evento.fechaInicio} Al {evento.fechaFin}</Text>

              {/* Icono de mapa para abrir la ubicación en Google Maps */}
              <TouchableOpacity style={styles.locationIconEventCity} onPress={() => openMap(evento.ubicacion)}>
                <Image source={require('../../../assets/localizacion.png')} style={styles.locationIconEvent} />
                <Text>{evento.ciudad}</Text>
              </TouchableOpacity>

              {/* Al pulsar sobre un evento, ir a la pantalla EventoScreen */}
              <TouchableOpacity onPress={() => handleEventPress(evento)}>
                <Text style={styles.viewEventText}>Ver evento</Text>
              </TouchableOpacity>
            </View>
          ))}
        </TouchableOpacity>
      </ScrollView>

      {/* Boton localizaciones cercanas */}
      <View style={styles.buttonLocation}>
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
            <View style={styles.containerTextButton}>
              <Text style={styles.nearEvents}>Eventos cerca de</Text>
              {/* Mostrar la ciudad obtenida */}
              <Text style={styles.nearEventsLocation}>
                {location ? `${city}` : 'Cargando...'}
              </Text>
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

  /* Navegacion horizontal */

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
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover', 

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

  eventType: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  categoryEventName: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'normal',
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

  locationIconEvent: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },

  locationIconEventCity: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});