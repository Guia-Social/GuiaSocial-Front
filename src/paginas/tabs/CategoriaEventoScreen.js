import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CONFIG from '../ip';
import * as Location from "expo-location";


import AsyncStorage from '@react-native-async-storage/async-storage';
const apiKey = "dccdbf11ee724d5b82743b0d62e62f1a";
const defaultProfileImage = require('../../../assets/logoGiraldillo.png');

export function CategoriaEventoScreen() {
  const navigation = useNavigation();
  const [eventos, setEventos] = useState([]);
  const [userLocationText, setUserLocationText] = useState("Detectando ubicación...");
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { categoriaId, categoriaNombre } = route.params;

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No hay un token disponible.');
          return;
        }

        // Esta pantalla es la fusion de todas las antiguas screen de eventos que habia antes, gracias a VidaNocturnaScreen por el cuerpo.
        // En memoria de GastronomiaScreen, TurismoScreen, MusicaScreen y TeatroEspectaculosScreen
        const response = await fetch(`http://${CONFIG.IP}:8080/api/v1/evento/categoria/${categoriaId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (Array.isArray(data.content)) {
          setEventos(data.content);
        } else {
          setEventos([]);
        }
      } catch (error) {
        console.error('Error al obtener eventos:', error);
        setEventos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, [categoriaId]);

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

  // Función para navegar a la página de inicio
  const goHome = () => {
    navigation.navigate('Home');
  };

  const handleEventPress = (evento) => {
    console.log(evento);
    navigation.navigate('EventoScreen', { evento });
  };  

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.homeButton} onPress={goHome}>
          <Ionicons name="home" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Un boton que muestra el nombre del filtro que se está aplicando */}
        <LinearGradient
          colors={['#22c55e', '#9333ea']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <TouchableOpacity style={styles.filterFoodButton}>
            {/* LLamo a el nombre de la categoria del HomeScreen para usarlo posteriormente aquí */}
            <Text style={styles.filterFood}>{categoriaNombre.toUpperCase()}</Text>
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
      <ScrollView>
        <View style={styles.eventList}>
          {eventos.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#fff'}}>No hay eventos disponibles</Text>
      ) : (
        eventos.map((evento) => (
            <View key={evento.eventoId} style={styles.eventCard}>
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
              <Text style={styles.eventDate}>Del {evento.fechaInicio} Al {evento.fechaFin}</Text>
              </TouchableOpacity>
            </View>
          )))}
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
    marginBottom: 20, 
    overflow: 'hidden',  
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

  profileButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

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