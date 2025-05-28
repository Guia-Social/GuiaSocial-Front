import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import debounce from 'lodash.debounce';
import MapView, { Marker } from 'react-native-maps';

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
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
          <Image
            source={evento.fotoPerfil ? { uri: evento.fotoPerfil } : defaultProfileImage}
            style={{ width: 40, height: 40, borderRadius: 15, marginRight: 10 }}
          />
          <Text style={{ color: '#000', paddingHorizontal: 3, paddingVertical: 7, fontSize: 24 }}>
            {evento.usuarioNombre || 'Usuario desconocido'}
          </Text>
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
