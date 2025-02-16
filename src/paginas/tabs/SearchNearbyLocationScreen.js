import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location"; 

export function SearchNearbyLocationScreen() {
  const navigation = useNavigation(); // Para navegar a la pantalla anterior

  // Variables
  const [inputText, setInputText] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [location, setLocation] = useState(null);
  
  const apiKey = "dccdbf11ee724d5b82743b0d62e62f1a";

  // Función para obtener la ubicación del usuario
  const getLocation = async () => {
    // Solicitamos el permiso para acceder a la ubicación
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = location.coords;
      fetchNearbyEvents(latitude, longitude); 
    } else {
      alert("Permiso para acceder a la ubicación denegado");
    }
  };

  // Función que maneja la búsqueda de eventos con latitud y longitud
  const fetchNearbyEvents = async (latitude, longitude) => {
    setIsLoading(true);

    try {
      // Realizamos un fetch a la API de OpenCage para obtener la ciudad basada en las coordenadas
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
      );
      const data = await response.json();
      console.log("Datos de la API OpenCage:", data); 

      if (data.results && data.results[0]) {
        const city = data.results[0].components.city || "Ubicación desconocida"; 
        console.log("Ciudad encontrada:", city);

        try {
          const eventsResponse = await fetch(
            `YOUR_BACKEND_URL/events?city=${city}`
          );
          if (!eventsResponse.ok) {
            throw new Error("Error al obtener los eventos");
          }
          const eventsData = await eventsResponse.json();
          console.log("Eventos encontrados:", eventsData); 
          setEvents(eventsData.events); 
        } catch (eventError) {
          console.error("Error al obtener eventos:", eventError);
        }
      } else {
        console.error("No se encontró ciudad para las coordenadas.");
      }
    } catch (error) {
      console.error("Error al obtener la ciudad:", error);
    }

    setIsLoading(false);
  };

  // Manejador para el evento de "onSubmitEditing" que se ejecuta al presionar "Enter"
  const handleKeyPress = (event) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Limpiar cualquier tiempo anterior
    }

    // Crear un nuevo timeout para evitar peticiones repetidas mientras se escribe
    const timeout = setTimeout(() => handleSearch(inputText), 500); 
    setDebounceTimeout(timeout);
  };

  // Función para manejar el texto del input (con debouncing)
  const handleSearch = async (text) => {
    setInputText(text);
    if (text.length < 3) {
      setEvents([]); 
      return;
    }

    setIsLoading(true);

    try {
      // Realizamos un fetch a la API de OpenCage para obtener la ciudad basada en las coordenadas
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${text}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        const city = data.results[0].components.city || "Ubicación desconocida";
        const eventsResponse = await fetch(`YOUR_BACKEND_URL/events?city=${city}`);
        const eventsData = await eventsResponse.json();
        setEvents(eventsData.events);
      } else {
        console.error("No se encontró ciudad para el texto.");
      }
    } catch (error) {
      console.error("Error al obtener la ciudad:", error);
    }

    setIsLoading(false);
  };

  // Función para renderizar cada evento
  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.eventItem}>
      <Image source={{ uri: item.imagen }} style={styles.eventImage} />
      <Text style={styles.eventTitle}>{item.nombre}</Text>
      <Text style={styles.eventDate}>
        Del {item.fechaInicio} al {item.fechaFin}
      </Text>
      <Text style={styles.eventDescription}>{item.descripcion}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Título de la cabecera */}
        <Text style={styles.headerTitle}>Cerca de...</Text>

        {/* Botón de cerrar (X) */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/boton-cerrar-opciones.png")} 
            style={styles.closeButton}
          />
        </TouchableOpacity>
      </View>

      {/* Selector de ubicación */}
      <View style={styles.locationSelector}>
        <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
          <Image
            source={require("../../../assets/direccion-vector.png")}
            style={styles.iconLocationImage}
          />
          <Text style={styles.locationText}>Mi ubicación actual</Text>
        </TouchableOpacity>

        <View style={styles.locationMunicipalityContainer}>
          <View style={styles.locationTextMunicipality}>
            <Ionicons
              name="search"
              size={22}
              color="white"
              style={styles.icon}
            />
            <TextInput
              style={styles.municipalityTextInput}
              placeholder="Municipio / Metro"
              placeholderTextColor="#B0B0B0" 
              value={inputText}
              onChangeText={setInputText} 
              onSubmitEditing={handleKeyPress} 
            />
          </View>
        </View>

        {/* Mostrar el listado de eventos si existen */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <FlatList
            data={events}
            renderItem={renderEvent}
            keyExtractor={(item) => item.eventoId.toString()} 
            style={styles.eventList}
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

  eventList: {
    marginTop: 10,
  },

  eventItem: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  eventText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  eventImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },

  eventTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  eventDate: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  eventDescription: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 5,
  },
});
