import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, Button, Image, TouchableOpacity, 
  StyleSheet, ScrollView, Alert, Keyboard 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import * as Location from 'expo-location'; // ✅ Solo una importación
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AnadirScreen() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('gastronomia');
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [mostrarFechaInicio, setMostrarFechaInicio] = useState(false);
  const [mostrarFechaFin, setMostrarFechaFin] = useState(false);
  const [ubicacion, setUbicacion] = useState({ latitude: 37.3886, longitude: -5.9823 });
  const [direccion, setDireccion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState('');
  const [tipoEvento, setTipoEvento] = useState('amigos');
  const [ciudad, setCiudad] = useState('');
  const [region, setRegion] = useState({
    latitude: 37.3886,
    longitude: -5.9823,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const navigation = useNavigation();
  const API_KEY = 'a169ac268a904bb694f11b32f20dbc55';

  const onDateChange = (event, selectedDate, tipoFecha) => {
    if (tipoFecha === 'inicio') {
      setMostrarFechaInicio(false);
      setFechaInicio(selectedDate || fechaInicio);
    } else if (tipoFecha === 'fin') {
      setMostrarFechaFin(false);
      setFechaFin(selectedDate || fechaFin);
    }
  };

  const obtenerUbicacion = async (direccion) => {
    if (direccion.trim() === '') {
      setError('');
      setUbicacion({ latitude: 37.3886, longitude: -5.9823 });
      setRegion({ latitude: 37.3886, longitude: -5.9823, latitudeDelta: 0.01, longitudeDelta: 0.01 });
      return;
    }

    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(direccion)}&key=${API_KEY}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setUbicacion({ latitude: lat, longitude: lng });
        setRegion({ latitude: lat, longitude: lng, latitudeDelta: 0.01, longitudeDelta: 0.01 });
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
      setRegion({ latitude: 37.3886, longitude: -5.9823, latitudeDelta: 0.01, longitudeDelta: 0.01 });
      setError('');
    }
  }, [direccion]);

  const obtenerPermisoCamara = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso de cámara no concedido');
    }
  };

  const seleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const tomarFoto = async () => {
    await obtenerPermisoCamara();
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
        { text: 'Galería', onPress: seleccionarImagen },
        { text: 'Cámara', onPress: tomarFoto },
        { text: 'Cancelar', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

<<<<<<< HEAD
=======
  const crearEvento = async () => {
    if (!nombre || !descripcion || !categoria || !fechaInicio || !fechaFin || !direccion || !imagen || !tipoEvento || !ciudad) {
      setError('Por favor, completa todos los campos.');
      return;
    }
  
    setError('');
  
    try {
      const token = await AsyncStorage.getItem('token'); // Obtener el token
  
      if (!token) {
        Alert.alert('Error', 'No se encontró el token de autenticación. Inicia sesión nuevamente.');
        return;
      }
  
      const eventoData = {
        nombre: nombre,
        descripcion: descripcion,
        categoriaNombre: categoria,
        tipoEvento: tipoEvento,
        fechaInicio: fechaInicio.toISOString(),
        fechaFin: fechaFin.toISOString(),
        ubicacion: direccion,
        ciudadNombre: ciudad,
        imagen: imagen,
        usuarioNombre: "admin" //Provisional
      };
  
      const response = await fetch('http://192.168.107.73:8080/api/v1/evento/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Agregar el token en la cabecera
        },
        body: JSON.stringify(eventoData)
      });

      // const data = await response.json();
  
      // ⚠️ Verifica si la respuesta tiene contenido antes de parsearla
      const responseText = await response.text(); 
      console.log('Respuesta del servidor:', responseText);

      if (!responseText) {
        throw new Error('El servidor devolvió una respuesta vacía.');
      }

      const data = JSON.parse(responseText); // Solo intentar parsear si hay contenido
  
      if (response.ok) {
        Alert.alert('Éxito', 'Evento creado correctamente.');
        navigation.navigate('Home');
      } else {
        setError(data.message || 'Error al crear el evento');
      }
    } catch (error) {
      console.error('Error al crear evento:', error);
      setError('Error al conectar con el servidor.');
    }
  };
  

>>>>>>> origin/develop
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Añadir nuevo evento</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={50} color="black" style={styles.closeButton} />
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <TextInput value={nombre} onChangeText={setNombre} style={styles.input} placeholder="Nombre del Evento" placeholderTextColor="#FFF" />
        <TextInput
          value={descripcion}
          onChangeText={setDescripcion}
          style={[styles.input, styles.largeInput]}
          placeholder="Descripción del Evento"
          placeholderTextColor="#FFF"
          maxLength={500}
          multiline={true}
          numberOfLines={4}
        />

        <View style={styles.pickerContainer}>
          <Picker selectedValue={categoria} onValueChange={setCategoria} style={styles.picker}>
            <Picker.Item label="Categoría del evento" value="" />
            <Picker.Item label="Gastronomía" value="gastronomia" />
            <Picker.Item label="Vida Nocturna" value="vida_nocturna" />
            <Picker.Item label="Turismo" value="turismo" />
            <Picker.Item label="Música" value="musica" />
            <Picker.Item label="Teatro y Espectáculos" value="teatro" />
          </Picker>
        </View>

        <TouchableOpacity onPress={() => setMostrarFechaInicio(true)} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Fecha de Inicio</Text>
        </TouchableOpacity>

        {mostrarFechaInicio && <DateTimePicker value={fechaInicio} mode="date" display="default" onChange={(e, date) => onDateChange(e, date, 'inicio')} />}

        <TouchableOpacity onPress={() => setMostrarFechaFin(true)} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Fecha de Fin</Text>
        </TouchableOpacity>

        {mostrarFechaFin && <DateTimePicker value={fechaFin} mode="date" display="default" onChange={(e, date) => onDateChange(e, date, 'fin')} />}
      </View>
    </ScrollView>
  );
}
