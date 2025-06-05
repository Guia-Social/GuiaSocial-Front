import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Linking, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CONFIG from '../ip';

const defaultProfileImage = require('../../../assets/logoGiraldillo.png');

export function EventosDelDiaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { dia, mes } = route.params;

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEventos = async () => {
      setLoading(true);

      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No hay un token disponible.');
          return;
        }

        const page = 0;
        const size = 10;

        const response = await fetch(`http://${CONFIG.IP}:8080/api/v1/evento/fecha/${mes}-${dia}?page=${page}&size=${size}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Eventos obtenidos:', data); // Verifica en consola qué devuelve la API

        if (Array.isArray(data.content)) {
          setEventos(data.content);
        } else {
          setEventos([]);
        }

      } catch (error) {
        console.error('Error obteniendo eventos:', error);
        setEventos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, [dia, mes]);

  const openMap = (url) => {
    Linking.openURL(url).catch(err => console.error("No se pudo abrir la ubicación", err));
  };

  const goHome = () => {
    navigation.navigate('Home');
  };

  const handleEventPress = (evento) => {
    console.log(evento); // Asegúrate de que este objeto contenga latitud y longitud
    navigation.navigate('EventoScreen', { evento });
  };  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.homeButton} onPress={goHome}>
          <Ionicons name="home" size={30} color="#fff" />
        </TouchableOpacity>

        <LinearGradient
          colors={['#22c55e', '#9333ea']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorderHeader}
        >
          <TouchableOpacity style={styles.filterFoodButton} onPress={() => navigation.navigate('Calendario')}>
            <Text style={styles.filterFood}>Eventos del {dia}/{mes}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#22c55e" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView>
          <View style={styles.eventList}>
            {eventos.length > 0 ? (
              eventos.map((evento) => (
                <View style={styles.eventList}>
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
                        </View>
              ))
            ) : (
              <View>
                <Image
                          source={defaultProfileImage}
                          style={styles.logo}
                        />
              <Text style={styles.noEventsText}>No hay eventos para este día</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}

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

// ... tus estilos aquí como ya los tengas

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

  gradientBorderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },

  logo: {
    width: 200,
    height: 200,
    borderRadius: 20,
    alignSelf: 'center',
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

  eventCategories: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    paddingVertical: 20,
    paddingHorizontal: 5,
    maxHeight: 60,
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

  noEventsText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
