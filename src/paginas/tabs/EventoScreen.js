import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import debounce from 'lodash.debounce';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../ip';
import { LinearGradient } from 'expo-linear-gradient';

export function EventoScreen({ route, navigation }) {
  const { evento } = route.params;
  const defaultProfileImage = require("../../../assets/logoGiraldillo.png");

  const [ubicacion, setUbicacion] = useState({ latitude: 37.3886, longitude: -5.9823 });
  const [region, setRegion] = useState({
    latitude: 37.3886,
    longitude: -5.9823,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [direccion, setDireccion] = useState(evento.ubicacion || '');
  const [error, setError] = useState('');

  const [usuarioLogeadoID, setUsuarioLogeadoID] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [estaApuntado, setEstaApuntado] = useState(false);

  const API_KEY = 'a169ac268a904bb694f11b32f20dbc55';

  const obtenerUbicacion = async (direccion) => {
    if (direccion.trim() === '') {
      setError('');
      setUbicacion({ latitude: 37.3886, longitude: -5.9823 });
      setRegion({
        latitude: 37.3886,
        longitude: -5.9823,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      return;
    }

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(direccion)}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setUbicacion({ latitude: lat, longitude: lng });
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setError('');
      } else {
        setError('Dirección no encontrada');
      }
    } catch (err) {
      setError('Error al buscar la dirección');
      console.error(err);
    }
  };

  const obtenerUbicacionDebounced = debounce(obtenerUbicacion, 1000);

  const apuntarse = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('No se encontró el token');
      return;
    }

    const response = await fetch(`http://${CONFIG.IP}:8080/api/v1/usuarioEnEventos/apuntarse/${usuarioLogeadoID}/${evento.id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Te has apuntado al evento');
      setEstaApuntado(true); // Estado local si lo usas
    } else {
      console.error('Error al apuntarse:', response.statusText);
    }
  } catch (error) {
    console.error('Error al apuntarse: ', error);
  }
};

const desapuntarse = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('No se encontró el token');
      return;
    }

    const response = await fetch(`http://${CONFIG.IP}:8080/api/v1/usuarioEnEventos/desapuntarse/${usuarioLogeadoID}/${evento.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Te has desapuntado del evento');
      setEstaApuntado(false); // Estado local si lo usas
    } else {
      console.error('Error al desapuntarse:', response.statusText);
    }
  } catch (error) {
    console.error('Error al desapuntarse: ', error);
  }
};

  const comprobarSiEstaApuntado = async (userId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('No se encontró el token');
      return;
    }

    // Comprobar si ha recibido bien del fetch user data el id, porque no veas
    console.log('Usuario ID:', userId);
    console.log('Evento ID:', evento.id);

    const response = await fetch(`http://${CONFIG.IP}:8080/api/v1/usuarioEnEventos/apuntado/${userId}/${evento.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      setEstaApuntado(result); // true o false
    } else {
      console.error('Error al comprobar si estás apuntado:', response.statusText);
    }
  } catch (error) {
    console.error('Error al comprobar si estás apuntado: ', error);
  }
};

  useEffect(() => {
    if (direccion.trim()) {
      obtenerUbicacionDebounced(direccion);
    } else {
      setUbicacion({ latitude: 37.3886, longitude: -5.9823 });
      setRegion({
        latitude: 37.3886,
        longitude: -5.9823,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setError('');
    }
  }, [direccion]);

  useEffect(() => {
          // Función para obtener el nombre del usuario desde la API
          const fetchUserData = async () => {
              try {
                  const token = await AsyncStorage.getItem('token'); // Recuperar el token
                  console.log('Token que se está enviando:', token);
                  if (token) {
                      const response = await fetch(`http://${CONFIG.IP}:8080/api/v1/user/me`, {
                          method: 'GET',
                          headers: {
                              'Authorization': `Bearer ${token}`, // Enviar el token en el header
                              'Content-Type': 'application/json',
                          }
                      });
  
                      if (response.ok) {
                          const data = await response.json();
                          setUsuarioLogeadoID(data.userId);
                          setNombreUsuario(data.username);

                          console.log('NOMBRE del usuario logueado:', data.username);

                          // Una vez que el ID del usuario se ha obtenido correctamente,
                          // ahora sí llamamos a comprobarSiEstaApuntado
                          comprobarSiEstaApuntado(data.userId);

                      } else {
                          console.error('Error fetching user data:', response.statusText);
                      }
                  }
              } catch (error) {
                  console.error('Error fetching user data: ', error);
              }
          };
  
          fetchUserData();
      }, []);

      const eliminarEvento = async (eventoId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    await fetch(`http://${CONFIG.IP}:8080/api/v1/evento/eliminar/${eventoId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    navigation.navigate('Home'); // O 'Profile' si prefieres volver ahí
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
  }
};


  return (
    <View style={styles.container}>
      {/* Barra de título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Imagen del evento */}
        <Image source={{ uri: evento.imagen }} style={styles.eventImage} />

        {/* Nombre del usuario y foto de perfil */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between' }}>
          {/* Con el estilo de arriba aplica para que salga cada uno en una esquina, y el de abajo para que el nombre y la foto salgan juntitos */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Image
            source={evento.fotoPerfil ? { uri: evento.fotoPerfil } : defaultProfileImage}
            style={{ width: 40, height: 40, borderRadius: 15, marginRight: 10 }}
          />
          <Text style={{ color: '#000', paddingHorizontal: 3, paddingVertical: 7, fontSize: 24 }}>
            {evento.usuarioNombre || 'Usuario desconocido'}
          </Text>
          </View>

          <TouchableOpacity onPress={estaApuntado ? desapuntarse : apuntarse}>
            <LinearGradient
              colors={estaApuntado ? ['#f87171', '#ef4444'] : ['#22c55e', '#9333ea']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                {estaApuntado ? 'Desapuntarse' : 'Apuntarse'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Detalles del evento */}
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{evento.nombre}</Text>
          <Text style={styles.eventDescription}>{evento.descripcion}</Text>
        </View>

        {/* Tipo de evento y nombre de la ubicacion */}
        <Text style={styles.eventSubtitle}>Tipo: {evento.tipoEvento}</Text>
        <Text style={styles.eventCity}>
          Ubicación: {evento.ubicacion} {'\n'}
          (Para acceder a la ubicacion directamente desde Google Maps, toca en la Baliza)
        </Text>

        {/* Mapa que muestra la ubicacion exacta */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapView}
            region={region}
            pointerEvents="none" // Para que no se pueda mover el mapa
          >
            <Marker coordinate={ubicacion} />
          </MapView>
          {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        </View>

        {/* Fechas de inicio y fin */}
        <Text style={styles.eventDate}>Del {evento.fechaInicio} al {evento.fechaFin}</Text>

  {nombreUsuario &&
  nombreUsuario === evento.usuarioNombre && (
    <TouchableOpacity
      onPress={() =>
        Alert.alert(
          '¿Eliminar evento?',
          'Esta acción no se puede deshacer.',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Eliminar',
              onPress: () => eliminarEvento(evento.id),
              style: 'destructive'
            },
          ]
        )
      }
      style={{ marginTop: 20, alignSelf: 'center' }}
    >
      <Text style={{ color: 'red', fontWeight: 'bold' }}>Eliminar Evento</Text>
    </TouchableOpacity>
)}


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#23272A',
    padding: 20,
  },
  eventTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  scrollView: {
    paddingBottom: 20,
  },
  eventImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  eventDetails: {
    padding: 20,
  },
  eventSubtitle: {
    paddingLeft: 20,
    paddingTop: 30,
    fontSize: 18,
    color: '#23272A',
    marginBottom: 5,
  },
  eventCity: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 16,
    color: '#7B7B7B',
  },
  eventDescription: {
    paddingTop: 20,
    fontSize: 20,
  },
  mapContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  mapView: {
    width: '90%',
    height: 250,
    borderRadius: 10,
  },

  eventDate: {
    paddingHorizontal: 10,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 10,
  },
});
