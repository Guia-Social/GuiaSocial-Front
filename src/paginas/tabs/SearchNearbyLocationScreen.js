import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location"; 

export function SearchNearbyLocationScreen() {
  const navigation = useNavigation();
  
  // Variables
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("Cargando...");  // Ciudad actual
  const [cities, setCities] = useState([]);  // Lista de ciudades
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // Controlar si el dropdown está abierto
  const apiKey = "dccdbf11ee724d5b82743b0d62e62f1a";
  const [loadingCities, setLoadingCities] = useState(true);

  // Hacer fetch a las ciudades cuando la pantalla se carga
  useEffect(() => {
    fetchCities();
    getLocation();  // Obtener la ubicación cuando la pantalla se carga
  }, []);

  // Función para obtener las ciudades del backend
  const fetchCities = async () => {
    try {
      setLoadingCities(true); // Activar la carga
      const response = await fetch("http://192.168.0.27:8080/api/v1/ciudad/all"); // Nueva URL

      if (!response.ok) {
        throw new Error(`Error al obtener las ciudades: ${response.statusText}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data)) {
        setCities(data); 
      } else {
        setCities([]);
      }
    } catch (error) {
      console.error("Error obteniendo las ciudades:", error);
      setCities([]); 
    } finally {
      setLoadingCities(false); // Desactivar la carga
    }
  };

  // Función para obtener la ubicación del usuario
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData.coords); // Guardar las coordenadas

      // Obtener la ciudad a partir de las coordenadas
      const geocode = await Location.reverseGeocodeAsync({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });

      if (geocode.length > 0) {
        setCity(geocode[0].city || "Ubicación no disponible"); // Si encontramos la ciudad
      }
    } else {
      alert("Permiso para acceder a la ubicación denegado");
    }
  };

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

  // Función para manejar la selección de ciudad
  const handleCitySelect = (city) => {
    setCity(city); // Establecer la ciudad seleccionada
    setIsDropdownOpen(false); // Cerrar el desplegable
  };

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
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}  // Toggle para abrir/cerrar el desplegable
        >
          <Image
            source={require("../../../assets/direccion-vector.png")}
            style={styles.iconLocationImage}
          />
          <Text style={styles.locationText}>{city}</Text>
        </TouchableOpacity>

        {/* Mostrar mensaje de carga si las ciudades están cargando */}
        {loadingCities ? (
          <Text style={styles.dropdownItemText}>Cargando ciudades...</Text>
        ) : (
          // Desplegable de ciudades
          isDropdownOpen && (
            <View style={styles.dropdownContainer}>
              {cities.length > 0 ? (
                cities.map((cityItem, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleCitySelect(cityItem.nombre)}
                  >
                    <Text style={styles.dropdownItemText}>{cityItem.nombre}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.dropdownItemText}>No se encontraron ciudades</Text>
              )}
            </View>
          )
        )}

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
