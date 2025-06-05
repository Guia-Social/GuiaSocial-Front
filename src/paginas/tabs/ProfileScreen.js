import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import CONFIG from '../ip';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Image, Alert } from 'react-native';

export function ProfileScreen() {
    const [userName, setUserName] = useState(''); // Estado para guardar el nombre del usuario
    const navigation = useNavigation();
    const [imagen, setImagen] = useState(null);
    const [usuarioLogeadoID, setUsuarioLogeadoID] = useState(null);
    const [eventos, setEventos] = useState([]);
    const [misEventos, setMisEventos] = useState([]);
    const [mostrarEventosCreados, setMostrarEventosCreados] = useState(false);
    const defaultProfileImage = require('../../../assets/logoGiraldillo.png');
    

    // Solicitamos permisos para acceder a la cámara y la galería
      const obtenerPermisoCamara = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync(); // Usar 'requestCameraPermissionsAsync'
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
        console.log('Resultado de la selección de imagen:', result);

        if (!result.canceled && result.assets.length > 0) {
          const uri = result.assets[0].uri;
          setImagen(uri);
          setTimeout(() => actualizarFoto(uri), 100); // pasamos el URI directamente
        } else {
          Alert.alert('Error', 'No se seleccionó ninguna imagen');
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
          actualizarFoto(); // ⬅️ Llamada para subir la imagen después de seleccionarla
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

      const actualizarFoto = async (imagenUri) => {
        if (!imagenUri) {
          Alert.alert('Error', 'Por favor, selecciona una imagen antes de actualizar.');
          return;
        }

        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            Alert.alert('Error', 'No se encontró el token de autenticación.');
            return;
          }

          // Para garantizar que la imagen se gaurda, la pasamos a JPEG
          // y la comprimimos a 1 (máxima calidad)
          const manipResult = await ImageManipulator.manipulateAsync(
            imagenUri,
            [], // sin cambios
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
          );

          const formData = new FormData();
          // Si, me he pasado 2 dias intendtando arreglar esto todo para darme cuenta de que el problema era que no estaba usando el nombre correcto
          // Usaba fotoPerfil en vez de file, por ende intnetaba meter la imagen en un campo llamado fotoPerfil cuando usa file... En mi vida se me va a olvidar.
          formData.append('file', {
            uri: manipResult.uri,
            name: 'perfil.jpg',
            type: 'image/jpeg',
          });

          const response = await fetch(`http://${CONFIG.IP}:8080/api/v1/user/me/foto`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          });

          if (response.ok) {
            // Alert.alert('Éxito', 'Foto de perfil actualizada.');
            navigation.navigate('Home');
          } else {
            const text = await response.text();
            console.log("Código de estado:", response.status);
            console.log("Respuesta cruda del servidor:", text);

            let errorData;
            try {
              errorData = text ? JSON.parse(text) : { message: 'Error desconocido del servidor.' };
            } catch (e) {
              errorData = { message: 'Error del servidor: ' + text };
            }

            Alert.alert('Error', errorData.message);
          }
        } catch (error) {
          console.error('Error al actualizar la foto de perfil:', error);
          Alert.alert('Error', 'Error al conectar con el servidor.');
        }
      };



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
                        const data = await response.json(); // Parsear la respuesta a JSON
                        setUserName(data.username); 
                        setImagen(data.fotoPerfil);
                        setUsuarioLogeadoID(data.userId);

                        fetchEventoIdsUsuario(data.userId);
                        fetchEventosDelUsuario(data.userId);
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

    const handleEventPress = (evento) => {
    console.log(evento); // Muestra toda la información de los eventos obtenidos por la consola
    navigation.navigate('EventoScreen', { evento });
  };  

    const fetchEventoIdsUsuario = async (usuarioLogeadoID) => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Id de usuario:', usuarioLogeadoID);

        const response = await fetch(`http://${CONFIG.IP}:8080/api/v1/usuarioEnEventos/eventos/${usuarioLogeadoID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener IDs de eventos: ${response.status}`);
        }

        if (response.ok){
          const data = await response.json();
          const eventoIds = data.content.map(item => item.eventoId); // Extrae solo los IDs
          console.log('IDs de eventos obtenidos:', eventoIds);

          fetchEventosAsistidos(eventoIds);
          return eventoIds;
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error obteniendo los eventoIds:', error);
        return [];
      }
    };

    const fetchEventosAsistidos = async (eventoIds) => {
      try {
        const token = await AsyncStorage.getItem('token');

        const response = await fetch(`http://${CONFIG.IP}:8080/api/v1/evento/eventosQueAsiste`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventoIds),
        });

        if (!response.ok) {
          throw new Error(`Error al obtener eventos: ${response.status}`);
        }

        const eventos = await response.json();

        

        //Para almacenar los datos como contenido
        if (Array.isArray(eventos)) {
          setEventos(eventos); // 👉 Solo almacenamos los eventos
        } else {
          setEventos([]); // Evita errores si no es un array
        }
        return eventos;
      } catch (error) {
        console.error('Error obteniendo eventos:', error);
        return [];
      }
    };

    const fetchEventosDelUsuario = async (usuarioLogeadoID) => {
      try {
        const token = await AsyncStorage.getItem('token');

        const response = await fetch(`http://${CONFIG.IP}:8080/api/v1/evento/usuario/${usuarioLogeadoID}`, {
          method: 'GET', // Cambia a GET si no necesitas enviar datos
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener eventos: ${response.status}`);
        }

        const eventos = await response.json();
        console.log('Eventos creados del usuario obtenidos:', eventos);

        if (Array.isArray(eventos.content)) {
          setMisEventos(eventos.content);
          console.log('Eventos creados por el usuario:', eventos.content); 
        } else {
          setMisEventos([]);
          console.log('No se encontraron eventos creados por el usuario o la respuesta no es un array.');
        }
        return eventos;
      } catch (error) {
        console.error('Error obteniendo eventos del usuario:', error);
        return [];
      }
    };

    const eliminarEvento = async(eventoId) => {
      try {
        const token = await AsyncStorage.getItem('token');
        await fetch(`http://${CONFIG.IP}:8080/api/v1/evento/eliminar/${eventoId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        // Refresca la lista después de borrar
        fetchEventosDelUsuario(usuarioLogeadoID); 
        
      }catch (error) {
        console.error('Error al eliminar el evento:', error);
        return [];
    };
  };

  

    const handleLogout = async () => {
        // Eliminar el token de AsyncStorage
        await AsyncStorage.removeItem('token');
        
        // Restablecer la navegación para que no se pueda volver a la pantalla anterior
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], // Navega directamente a la pantalla de login
        });
    };

    console.log("Mostrar eventos creados:", mostrarEventosCreados);
    console.log("Eventos obtenidos al final:", eventos);
    console.log("Mis eventos obtenidos al final:", misEventos);
    return (
      <View style={styles.container}>
        {/* Perfil de usuario */}
        <View style={styles.profileContainer}>
            <TouchableOpacity onPress={elegirFuenteImagen}>
              <Image
                source={imagen ? { uri: imagen } : require('../../../assets/logoGiraldillo.png')}
                style={{ width: 120, height: 120, borderRadius: 75, marginBottom: 10, marginTop: 40 }}
              />
            </TouchableOpacity>

            <Text style={styles.userName}>{userName || 'Cargando...'}</Text> {/* Mostrar nombre del usuario */}
        </View>

      <View style={styles.buttonRow}>
        {/* Botón para volver a la página principal */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <LinearGradient colors={['#22c55e', '#9333ea']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.homeButton}>
            <Text style={styles.logoutButtonText}>Volver al inicio</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
  <TouchableOpacity
    style={[
      styles.toggleButton,
      !mostrarEventosCreados && styles.activeButton
    ]}
    onPress={() => setMostrarEventosCreados(false)}
  >
    <Text style={styles.toggleButtonText}>Mis Planes</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.toggleButton,
      mostrarEventosCreados && styles.activeButton
    ]}
    
    onPress={() => setMostrarEventosCreados(true)}
  >
    <Text style={styles.toggleButtonText}>Mis Creaciones</Text>
  </TouchableOpacity>
</View>

        {/* Lista de eventos */}
              <ScrollView>
                <View style={styles.eventList}>
                  {(mostrarEventosCreados ? misEventos : eventos).map((evento) => (
                    console.log(evento),
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
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',  // Centrar contenido verticalmente
    alignItems: 'center',  // Centrar contenido horizontalmente
    paddingHorizontal: 20, // Añadir un poco de margen a los lados para que no esté pegado
  },
  
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  
  homeButton: {
    // width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    // alignItems: 'center',
    // marginTop: 10,
    overflow: 'hidden',
  },
  
  logoutButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 10,
    // width: '80%',
    borderRadius: 5,
    // alignItems: 'center',
    // marginTop: 15,
    overflow: 'hidden',
  },
  
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 20,
  marginTop: 10,
  gap: 10
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

  toggleButton: {
  backgroundColor: '#2c2c2c',
  paddingVertical: 10,
  paddingHorizontal: 12,
  borderRadius: 10,
  marginHorizontal: 5,
},

activeButton: {
  backgroundColor: '#9333ea',
},

toggleButtonText: {
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: 12,
  textAlign: 'center',
}

});
