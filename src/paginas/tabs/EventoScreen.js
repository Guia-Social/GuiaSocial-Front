import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';  // Importamos MapView de react-native-maps

export function EventoScreen({ route, navigation }) {
  const { evento } = route.params; // Recibimos el evento que pasamos desde HomeScreen

  const openMap = (url) => {
    Linking.openURL(url).catch((err) => console.error('No se pudo abrir la ubicación', err));
  };

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
          <Text style={styles.eventSubtitle}>{evento.tipo_de_evento}</Text>
          <Text style={styles.eventCity}>{evento.ciudad}</Text>
        </View>

        <Text style={styles.eventDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Taciti non tempor enim cubilia
          netus velit dictum felis nisi. Lobortis facilisis id bibendum felis nisi.
        </Text>

        {/* Mapa de Google */}
        <View style={styles.mapContainer}>
          {/* Aquí se agrega el mapa de Google con react-native-maps */}
          <MapView
            style={styles.mapView}
            initialRegion={{
              latitude: evento.latitud,  // Asume que 'latitud' y 'longitud' son parte del evento
              longitude: evento.longitud,
              latitudeDelta: 0.0922, // Ajusta el zoom inicial
              longitudeDelta: 0.0421, // Ajusta el zoom inicial
            }}
          >
            <Marker coordinate={{ latitude: evento.latitud, longitude: evento.longitud }} />
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
