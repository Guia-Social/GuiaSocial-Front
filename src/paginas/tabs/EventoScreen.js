import React, {useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import debounce from 'lodash.debounce';
import MapView, { Marker } from 'react-native-maps';  // Importamos MapView de react-native-maps

export function EventoScreen({ route, navigation }) {
  const { evento } = route.params; // Recibimos el evento que pasamos desde HomeScreen

  const openMap = (url) => {
    Linking.openURL(url).catch((err) => console.error('No se pudo abrir la ubicación', err));
  };
  const [ubicacion, setUbicacion] = useState({ latitude: 37.3886, longitude: -5.9823 });
  const [region, setRegion] = useState({
      latitude: 37.3886,
      longitude: -5.9823,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    const [direccion, setDireccion] = useState('');
    const [error, setError] = useState('');

    // API de google maps
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
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(direccion)}&key=${API_KEY}`);
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
        <Text style={styles.eventTitle}>{evento.nombre}</Text>
      </View>

      {/* Contenido del evento */}
      <ScrollView contentContainerStyle={styles.scrollView}>

        <Image source={{ uri: evento.imagen }} style={styles.eventImage} />

        <View style={styles.eventDetails}>
          <Text style={styles.eventSubtitle}>{evento.nombre}</Text>
          <Text style={styles.eventSubtitle}>{evento.tipoEvento}</Text>
          <Text style={styles.eventCity}>{evento.ubicacion}</Text>
        </View>

        <Text style={styles.eventDescription}>
        {evento.descripcion}
        </Text>

        {/* Mapa de Google */}
        <View style={styles.mapContainer}>
          {/* Aquí se agrega el mapa de Google con react-native-maps */}
          <MapView
          style={styles.map}
          region={region}
          onPress={(e) => setUbicacion(e.nativeEvent.coordinate)}
        >
          <Marker coordinate={ubicacion} />
        </MapView>
        </View>
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
    color: '#fff',
    fontSize: 24,
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
    fontSize: 18,
    color: '#23272A',
    marginBottom: 5,
  },
  
  eventCity: {
    fontSize: 16,
    color: '#7B7B7B',
  },
  
  eventDescription: {
    padding: 20,
    fontSize: 14,
    color: '#555',
  },
  
  mapContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  
  mapText: {
    fontSize: 18,
    color: '#23272A',
    marginBottom: 10,
  },
  
  mapView: {
    width: '100%',
    height: 250, // Ajustamos el tamaño para que ocupe todo el ancho y un alto adecuado
    borderRadius: 10,
  },
});
