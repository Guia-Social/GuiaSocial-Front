import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, Keyboard } from 'react-native';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import * as Location from 'expo-location'; // Usamos expo-location para permisos y ubicación


export function AnadirScreen() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('gastronomia');
  const [fechaInicio, setFechaInicio] = useState(new Date()); // Fecha de inicio
  const [fechaFin, setFechaFin] = useState(new Date()); // Fecha de fin
  const [mostrarFechaInicio, setMostrarFechaInicio] = useState(false);
  const [mostrarFechaFin, setMostrarFechaFin] = useState(false);
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

  const onDateChange = (event, selectedDate, tipoFecha) => {
    if (tipoFecha === 'inicio') {
      setMostrarFechaInicio(false);
      setFechaInicio(selectedDate);
    } else if (tipoFecha === 'fin') {
      setMostrarFechaFin(false);
      setFechaFin(selectedDate);
    }
  };

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

  // Solicitamos permisos para acceder a la cámara y la galería
  const obtenerPermisoCamara = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync(); // Usar 'requestCameraPermissionsAsync'
    if (status !== 'granted') {
      alert('Permiso de cámara no concedido');
    }
  };

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

    await obtenerPermisoCamara(); // Solicita permiso antes de abrir la cámara
 
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

  const crearEvento = () => {
    if (!nombre || !descripcion || !categoria || !fechaInicio || !fechaFin || !direccion || !imagen) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setError('');
    // Aquí iría la lógica para crear el evento (guardar en una base de datos, API, etc.)
    // Si no hay errores, navega a la pantalla de inicio (Home)
    navigation.navigate('Home');
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
          placeholderTextColor="#FFF"
        />
        <TextInput
          value={descripcion}
          onChangeText={setDescripcion}
          style={[styles.input, styles.largeInput]}
          placeholder="Descripción del Evento"
          placeholderTextColor="#FFF"
          maxLength={500}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          onSubmitEditing={() => Keyboard.dismiss()}
          blurOnSubmit={true}

        />

        <View style={styles.pickerContainer}>
          <Picker selectedValue={categoria} onValueChange={(itemValue) => setCategoria(itemValue)} style={styles.picker}>
            <Picker.Item label="Categoría del evento" value="" />
            <Picker.Item label="Gastronomía" value="gastronomia" />
            <Picker.Item label="Vida Nocturna" value="vida_nocturna" />
            <Picker.Item label="Turismo" value="turismo" />
            <Picker.Item label="Música" value="musica" />
            <Picker.Item label="Teatro y Espectáculos" value="teatro" />
          </Picker>
        </View>

        {/* Botón para seleccionar fecha de inicio */}
        <TouchableOpacity onPress={() => setMostrarFechaInicio(true)} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Fecha de Inicio</Text>
        </TouchableOpacity>

        {/* Mostrar la fecha de inicio seleccionada */}
        {fechaInicio && (
          <Text style={styles.selectedDateText}>
            Fecha de Inicio: {fechaInicio.toLocaleDateString()}
          </Text>
        )}

        {/* DateTimePicker para la fecha de inicio */}
        {mostrarFechaInicio && (
          <DateTimePicker
            value={fechaInicio}
            mode="date"
            display="default"
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 31))}
            onChange={(event, selectedDate) => onDateChange(event, selectedDate, 'inicio')}
          />
        )}

        {/* Botón para seleccionar fecha de fin */}
        <TouchableOpacity onPress={() => setMostrarFechaFin(true)} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Fecha de Fin</Text>
        </TouchableOpacity>

        {/* Mostrar la fecha de fin seleccionada */}
        {fechaFin && (
          <Text style={styles.selectedDateText}>
            Fecha de Fin: {fechaFin.toLocaleDateString()}
          </Text>
        )}

        {/* DateTimePicker para la fecha de fin */}
        {mostrarFechaFin && (
          <DateTimePicker
            value={fechaFin}
            mode="date"
            display="default"
            minimumDate={fechaInicio} // La fecha de fin no puede ser antes de la fecha de inicio
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 31))}
            onChange={(event, selectedDate) => onDateChange(event, selectedDate, 'fin')}
          />
        )}

        <TextInput
          value={direccion}
          onChangeText={setDireccion}
          style={styles.input}
          placeholder="Escribe la dirección"
          placeholderTextColor="#FFF"
        />
        {error && <Text style={styles.errorText}>{error}</Text>}

        <MapView
          style={styles.map}
          region={region}
          onPress={(e) => setUbicacion(e.nativeEvent.coordinate)}
        >
          <Marker coordinate={ubicacion} />
        </MapView>

        <View style={styles.imageContainer}>
          {imagen && <Image source={{ uri: imagen }} style={styles.image} />}
          <TouchableOpacity onPress={elegirFuenteImagen} style={imagen ? styles.cambiarImagenContainer : styles.imagePickerContainer}>
            {imagen ? (
              <Text style={styles.cambiarImagenTexto}>Cambiar imagen</Text>
            ) : (
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1375/1375157.png' }} 
                style={styles.imagePreview} 
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Botón para crear evento */}
        <TouchableOpacity onPress={crearEvento} style={styles.buttonEvento}>
          <Text style={styles.buttonText}>Crear Evento</Text>
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
    padding: 30,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    marginTop: 175,
  },
  input: {
    backgroundColor: '#323639',
    color: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  largeInput: {
    height: 150, 
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#323639',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    color: '#FFF',
  },
  button: {
    backgroundColor: '#323639',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonEvento: {
    backgroundColor: '#323639',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
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
  selectedDateText: {
    fontSize: 13,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover', 
    marginBottom: 20,
  },
  cambiarImagenContainer: {
    backgroundColor: '#323639',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  cambiarImagenTexto: {
    color: '#FFF',
    fontSize: 16,
  },
  imagePickerContainer: {
    width: 150,
    height: 150,
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#323639',
    overflow: 'hidden',
  },

  imagePreview: {
    width: 100, 
    height: 100,
    resizeMode: 'contain', 
  },
});
