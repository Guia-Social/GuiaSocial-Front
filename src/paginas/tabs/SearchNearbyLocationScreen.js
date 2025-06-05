import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import CONFIG from "../ip";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SearchNearbyLocationScreen() {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const apiKey = "dccdbf11ee724d5b82743b0d62e62f1a";

  const defaultProfileImage = require("../../../assets/logoGiraldillo.png");

  const cities = [
    { id: 4, name: "Sevilla" },
    { id: 5, name: "Huelva" },
    { id: 6, name: "Lisboa" },
  ];

  const handleInputChange = (text) => {
    setInputText(text);
    if (text.trim() === "") {
      setFilteredCities([]);
    } else {
      const filtered = cities.filter((ciudad) =>
        ciudad.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  };

  const handleEventPress = (evento) => {
    console.log(evento);
    navigation.navigate("EventoScreen", { evento });
  };

  // const handleSelectCity = async (ciudad) => {
  //   setInputText(ciudad.name);
  //   setFilteredCities([]);
  //   setIsLoading(true);

  //   try {
  //     const token = await AsyncStorage.getItem("token");
  //     const response = await fetch(
  //       `http://${CONFIG.IP}:8080/api/v1/evento/ciudad/${ciudad.id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     setEventos(Array.isArray(data.content) ? data.content : []);
  //   } catch (error) {
  //     console.error("Error buscando eventos:", error);
  //     Alert.alert("Error", "No se pudieron obtener los eventos.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSelectCity = async (ciudad) => {
  let ciudadId;
  let ciudadName;

  if (typeof ciudad === "object") {
    // Caso normal: objeto ciudad desde lista
    ciudadId = ciudad.id;
    ciudadName = ciudad.name;
    setInputText(ciudadName);
  } else if (typeof ciudad === "number") {
    // Caso desde NearbyLocation: solo id
    ciudadId = ciudad;
    // ciudadName = ""; // Opcional: puedes buscar el nombre si quieres
  } else {
    console.warn("handleSelectCity recibió un parámetro no válido:", ciudad);
    return;
  }

  setFilteredCities([]);
  setIsLoading(true);

  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(
      `http://${CONFIG.IP}:8080/api/v1/evento/ciudad/${ciudadId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setEventos(Array.isArray(data.content) ? data.content : []);
  } catch (error) {
    console.error("Error buscando eventos:", error);
    Alert.alert("Error", "No se pudieron obtener los eventos.");
  } finally {
    setIsLoading(false);
  }
};

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso denegado para acceder a la ubicación, no podrás ver eventos cercanos (Directamente).");
        return errorMsg;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      fetchNearbyEvents(latitude, longitude);
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
    }
  };

  const fetchNearbyEvents = async (latitud, longitud) => {
  setIsLoading(true);
  try {
    // 1. Obtener ciudad por lat/lng con OpenCage
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitud}+${longitud}&key=${apiKey}&language=es`
    );
    const data = await response.json();

    const city =
      data.results[0]?.components?.city ||
      data.results[0]?.components?.town ||
      data.results[0]?.components?.village;

    if (!city) {
      console.error("No se encontró ciudad para las coordenadas.");
      setIsLoading(false);
      return;
    }

    console.log("Ciudad detectada:", city);

    // 2. Obtener la ciudad con su id desde el backend
    const token = await AsyncStorage.getItem("token");
    const cityResponse = await fetch(
      `http://${CONFIG.IP}:8080/api/v1/ciudad/nombre/${encodeURIComponent(city)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!cityResponse.ok) {
      console.error("Error al obtener la ciudad del backend:", cityResponse.status);
      Alert.alert(
        "Vaya :(",
        "Actualmente tu ciudad no se encuentra disponible en El Giraldillo para poder hacer eventos. Escríbele un correo a ELGIRALDILLO@eventos.es para solicitar la creación de tu sitio en nuestra base de datos y así poder asistir y crear eventos!"
      );
      setIsLoading(false);
      return;
    }

    const cityData = await cityResponse.json();
    const cityId = parseInt(cityData.id, 10);

    if (!cityId || isNaN(cityId)) {
      console.warn("ID de ciudad no válido o no encontrado:", cityData.id);
      setEvents([]);
      setIsLoading(false);
      return;
    }

    console.log("ID de ciudad parseado correctamente:", cityId);

    // 3. Pasar el id de la ciudad como número al método handleSelectCity para obtener eventos
    handleSelectCity(cityId);
  } catch (error) {
    console.error("Error en fetchNearbyEvents:", error);
    Alert.alert("Error", "No se pudo obtener la ubicación o los eventos.");
  } finally {
    setIsLoading(false);
  }
};


  const renderCiudadItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleSelectCity(item)}
    >
      <Text style={styles.resultText}>{item.name}</Text>
    </TouchableOpacity>
  );

  {/* Aquí se renderiza cada evento en la lista */}
  const renderEvent = ({ item }) => (
    <TouchableOpacity
      key={item.eventoId}
      style={styles.eventCard}
      onPress={() => handleEventPress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.imagen }} style={styles.eventImage} />
      <Text style={styles.eventTitle}>{item.nombre}</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}
      >
        <Image
          source={item.fotoPerfil ? { uri: item.fotoPerfil } : defaultProfileImage}
          style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
        />
        <Text
          style={{ color: "#000", fontWeight: "bold", paddingHorizontal: 3, paddingVertical: 7 }}
        >
          {item.usuarioNombre || "Usuario desconocido"}
        </Text>
      </View>
      <Text style={styles.eventType}>Evento {item.tipoEvento}</Text>
      <Text style={styles.categoryEventName}>Tipo: {item.categoriaNombre}</Text>
      <Text style={styles.eventDate}>Del {item.fechaInicio} al {item.fechaFin}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Cerca de...</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/boton-cerrar-opciones.png")}
            style={styles.closeButton}
          />
        </TouchableOpacity>
      </View>

      {/* Botón para obtener la ubicación actual del usuario */}
      <View style={styles.locationSelector}>
        <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
          <Image
            source={require("../../../assets/direccion-vector.png")}
            style={styles.iconLocationImage}
          />
          <Text style={styles.locationText}>Mi ubicación actual</Text>
        </TouchableOpacity>

        {/* Campo de búsqueda para seleccionar una ciudad manualmente entre todos los disponibles */}
        <View style={styles.locationMunicipalityContainer}>
          <View style={styles.locationTextMunicipality}>
            <Ionicons name="search" size={22} color="white" style={styles.icon} />
            <TextInput
              style={styles.municipalityTextInput}
              placeholder="Ciudad / Pueblo"
              placeholderTextColor="#B0B0B0"
              value={inputText}
              onChangeText={handleInputChange}
            />
          </View>

          {/* Lista de eventos filtrados */}
          {filteredCities.length > 0 && (
            <FlatList
              data={filteredCities}
              renderItem={renderCiudadItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.listaResultados}
            />
          )}
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <FlatList
            data={[...eventos, ...events]}
            renderItem={renderEvent}
            keyExtractor={(item) => item.eventoId}
            style={styles.eventosLista}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    paddingHorizontal: 20,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#BCBCBC",
    paddingHorizontal: 20,
    paddingVertical: 30, 
    height: 150, 
    width: "112%", 
    position: "absolute", 
    top: 0, 
    left: 0, 
  },

  headerTitle: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 60, 
  },

  closeButton: {
    width: 24,
    height: 24,
    marginTop: 60, 
    marginRight: 10,
  },

  locationSelector: {
    marginTop: 200, 
    marginBottom: 20,
  },

  locationButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },

  iconLocationImage: {
    width: 20,
    height: 20,
  },

  eventCard: {
    marginBottom: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    padding: 0,
  },

  locationText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  locationMunicipalityContainer: {
    borderColor: "#A6A6A6",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },

  locationTextMunicipality: {
    flexDirection: "row",
    justifyContent: "flex-start", 
    alignItems: "center", 
    backgroundColor: "#333",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    height: 50,
  },

  icon: {
    marginRight: 10, 
  },

  municipalityTextInput: {
    flex: 1, 
    color: "#FFFFFF", 
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#333", 
    height: 40,
    borderRadius: 8,
    paddingLeft: 10, 
  },

  listaResultados: {
    backgroundColor: "#ffffff",
    marginTop: 4,
    fontSize: 16,
    borderRadius: 8,
  },


  eventImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },

  eventTitle: {
    padding: 10,
    color: '#000000',
    fontSize: 20,
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

});
