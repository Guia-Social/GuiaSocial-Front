import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import CONFIG from '../ip';
import * as Location from "expo-location";

// Antiguos Mocks que se usaban antes de tener el backend listo
// import EventoMock from '../../mocks/EventoMock.json';

import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultProfileImage = require('../../../assets/logoGiraldillo.png');

  const apiKey = "dccdbf11ee724d5b82743b0d62e62f1a";

export function HomeScreen() {
  const navigation = useNavigation();

  const [eventos, setEventos] = useState([]);
  const [userLocationText, setUserLocationText] = useState("Detectando ubicación...");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Directamente nada mas arrancar hacemos el fetch de los eventos
    const fetchEventos = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No hay un token disponible.');
          return;
        }
  
        const response = await fetch(`http://${CONFIG.IP}:8080/api/v1/evento/all`, {
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

        //Para almacenar los datos como contenido
        if (Array.isArray(data.content)) {
          setEventos(data.content); // 👉 Solo almacenamos los eventos
        } else {
          setEventos([]); // Evita errores si no es un array
        }
      } catch (error) {
        console.error('Error obteniendo eventos:', error);
        setEventos([]); // Evita el error si la API falla
      } finally {
        setLoading(false);
      }
    };
  
    fetchEventos();
  }, []);


  const handleEventPress = (evento) => {
    console.log(evento); // Muestra toda la información de los eventos obtenidos por la consola
    navigation.navigate('EventoScreen', { evento });
  };  

  useEffect(() => {
    getUserLocation();
  }, []);


  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setUserLocationText("Permiso de ubicación denegado");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const openCageRes = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=es`
      );
      const data = await openCageRes.json();

      const city =
        data.results[0]?.components?.city ||
        data.results[0]?.components?.town ||
        data.results[0]?.components?.village;

      const suburb =
        data.results[0]?.components?.suburb ||
        data.results[0]?.components?.neighbourhood ||
        data.results[0]?.components?.county;

      if (city) {
        const locationString = suburb ? `${city} - ${suburb}` : city;
        setUserLocationText(locationString);
      } else {
        setUserLocationText("Ubicación desconocida");
      }
    } catch (error) {
      console.error("Error al obtener ubicación:", error);
      setUserLocationText("Error al detectar ubicación");
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>

        {/* Menú hamburguesa */}
        <TouchableOpacity onPress={() => navigation.navigate('Opciones')}>
          <Ionicons name="menu" size={40} color="#fff" />
        </TouchableOpacity>

        {/* Sistema de calendario*/}
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

        {/* Botón de Perfil */}
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Perfil')}>
          <Image
            source={defaultProfileImage}
            style={styles.profileImage}
          />

        </TouchableOpacity>
      </View>

      {/* Barra de categorías */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventCategories}>
        {/* Agregar los botones de categorías de eventos */}
        <TouchableOpacity
          style={styles.eventCategoryButton}
          onPress={() => navigation.navigate('categoriaEventoScreen', { categoriaId: 14, categoriaNombre: 'GASTRONOMÍA' })}
        >
          <Text style={styles.eventCategoryButtonText}>GASTRONOMÍA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.eventCategoryButton}
          onPress={() => navigation.navigate('categoriaEventoScreen', { categoriaId: 15, categoriaNombre: 'VIDA NOCTURNA' })}
        >
          <Text style={styles.eventCategoryButtonText}>VIDA NOCTURNA</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.eventCategoryButton}
          onPress={() => navigation.navigate('categoriaEventoScreen', { categoriaId: 16, categoriaNombre: 'TURISMO' })}
        >
          <Text style={styles.eventCategoryButtonText}>TURISMO</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.eventCategoryButton}
          onPress={() => navigation.navigate('categoriaEventoScreen', { categoriaId: 13, categoriaNombre: 'MÚSICA' })}
        >
          <Text style={styles.eventCategoryButtonText}>MÚSICA</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.eventCategoryButton}
          onPress={() => navigation.navigate('categoriaEventoScreen', { categoriaId: 4, categoriaNombre: 'TEATRO Y ESPECTÁCULOS' })}
        >
          <Text style={styles.eventCategoryButtonText}>TEATRO Y ESPECTÁCULOS</Text>
        </TouchableOpacity>
        {/* El boton de buscar evento por nombre */}
        <TouchableOpacity style={styles.eventCategoryButton} onPress={() => navigation.navigate('Buscar')}>
          <Text style={styles.eventCategoryButtonText}>BUSCAR</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Lista de eventos */}
      {eventos.length > 0 && (
      <ScrollView>
        <View style={styles.eventList}>
          {eventos.map((evento) => (
            <TouchableOpacity
              key={evento.eventoId}
              style={styles.eventCard}
              onPress={() => handleEventPress(evento)}
              activeOpacity={0.8}
            >
              <Image 
                source={{ uri: evento.imagen }} 
                style={styles.eventImage} 
              />
              <Text style={styles.eventTitle}>{evento.nombre}</Text>
              {/* <Text style={styles.eventDescription}>{evento.descripcion}</Text> */}
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                <Image
                  source={evento.fotoPerfil ? { uri: evento.fotoPerfil } : defaultProfileImage}
                  style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
                />
                <Text style={{ color: '#000', fontWeight: 'bold', paddingHorizontal: 3, paddingVertical: 7 }}>
                  {evento.usuarioNombre || 'Usuario desconocido'}
                </Text>
              </View>
              <Text style={styles.eventType}>Evento {evento.tipoEvento}</Text>
              <Text style={styles.categoryEventName}>Tipo: {evento.categoriaNombre}</Text>
              <Text style={styles.eventDate}>Del {evento.fechaInicio} al {evento.fechaFin}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      )}

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
              <Text style={styles.nearEvents}>Buscar eventos cerca de:</Text>
              <Text style={styles.nearEventsLocation}>{userLocationText || 'Ubicación Desconocida'}</Text>
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

  title:{
    fontSize: 25,
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

  logo: {
    width: 200,
    height: 200,
    borderRadius: 20,
    alignSelf: 'center',
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
  },
  profileButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
