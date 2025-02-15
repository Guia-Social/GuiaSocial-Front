import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';

export function AnadirScreen() {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('gastronomia');
  const [fecha, setFecha] = useState(new Date());
  const [mostrarFecha, setMostrarFecha] = useState(false);
  const [ubicacion, setUbicacion] = useState({ latitude: 37.3886, longitude: -5.9823 });
  const [direccion, setDireccion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState('');
  const [region, setRegion] = useState({
    latitude: 37.3886,
    longitude: -5.9823,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const navigation = useNavigation();

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

  const seleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const tomarFoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const elegirFuenteImagen = () => {
    Alert.alert(
      'Seleccionar Imagen',
      'Elige de dónde deseas seleccionar la imagen:',
      [
        {
          text: 'Galería',
          onPress: seleccionarImagen,
        },
        {
          text: 'Cámara',
          onPress: tomarFoto,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Añadir nuevo evento</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={50} color="black" style={styles.closeButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
          placeholder="Nombre del Evento"
        />
        
        <View style={styles.pickerContainer}>
          <Picker selectedValue={categoria} onValueChange={(itemValue) => setCategoria(itemValue)}>
            <Picker.Item label="Gastronomía" value="gastronomia" />
            <Picker.Item label="Vida Nocturna" value="vida_nocturna" />
            <Picker.Item label="Turismo" value="turismo" />
            <Picker.Item label="Música" value="musica" />
            <Picker.Item label="Teatro y Espectáculos" value="teatro" />
          </Picker>
        </View>
        
        <TouchableOpacity onPress={() => setMostrarFecha(true)} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Fecha</Text>
        </TouchableOpacity>
        {mostrarFecha && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 31))}
            onChange={(event, selectedDate) => {
              setMostrarFecha(false);
              if (selectedDate) setFecha(selectedDate);
            }}
          />
        )}
        
        <TextInput
          value={direccion}
          onChangeText={setDireccion}
          style={styles.input}
          placeholder="Escribe la dirección"
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <MapView
          style={styles.map}
          region={region}
          onPress={(e) => setUbicacion(e.nativeEvent.coordinate)}
        >
          <Marker coordinate={ubicacion} />
        </MapView>
        
        {imagen && <Image source={{ uri: imagen }} style={styles.image} />}
        <TouchableOpacity onPress={elegirFuenteImagen} style={styles.imagePickerContainer}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.imagePreview} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 150,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerTitle: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 80,
  },
  closeButton: {
    position: 'absolute',
    left: -35,
    top: 15,
  },
  formContainer: {
    margin: 20,
    flex: 1,
    padding: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    marginTop: 150,
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: '#333',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  imagePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
  },
});
