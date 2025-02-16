import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location"; 

const SearchNearbyLocationScreen = () => {
  const navigation = useNavigation(); // Para navegar a la pantalla anterior
  const [inputText, setInputText] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);

  const apiKey = "dccdbf11ee724d5b82743b0d62e62f1a";

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      fetchNearbyEvents(latitude, longitude);
    } else {
      alert("Permiso para acceder a la ubicación denegado");
    }
  };

  const fetchNearbyEvents = async (latitud, longitud) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitud}+${longitud}&key=${apiKey}`);
      const data = await response.json();

      if (data.results && data.results[0]) {
        const city = data.results[0].components.city || "Ubicación desconocida";
        const eventsResponse = await fetch(`YOUR_BACKEND_URL/events?city=${city}`);
        const eventsData = await eventsResponse.json();
        setEvents(eventsData.events);
      } else {
        console.error("No se encontró ciudad para las coordenadas.");
      }
    } catch (error) {
      console.error("Error al obtener la ciudad:", error);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Cerca de...</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../../../assets/boton-cerrar-opciones.png")} style={styles.closeButton} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
        <Image source={require("../../../assets/direccion-vector.png")} style={styles.iconLocationImage} />
        <Text style={styles.locationText}>Mi ubicación actual</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchNearbyLocationScreen; // ✅ Exportación corregida

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1C1C1C", paddingHorizontal: 20 },
  headerContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#BCBCBC", paddingHorizontal: 20, paddingVertical: 30, height: 150, width: "112%", position: "absolute", top: 0, left: 0 },
  headerTitle: { color: "#000", fontSize: 24, fontWeight: "bold", marginTop: 60 },
  closeButton: { width: 24, height: 24, marginTop: 60, marginRight: 10 },
  locationButton: { backgroundColor: "#333", padding: 12, borderRadius: 8, flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 10, gap: 10 },
  iconLocationImage: { width: 20, height: 20 },
  locationText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }
});
