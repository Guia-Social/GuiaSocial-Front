import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export function HomeScreen() {
  const navigation = useNavigation();

  const eventos = [
    {
      id: 1,
      nombre: 'Antique Theatro',
      lugar: 'Discoteca',
      ubicacion: 'Sevilla',
      calle: 'C. Matemáticos Rey Pastor y Castro, s/n, 41092 Sevilla',
    },
    {
      id: 2,
      nombre: 'Festival de Música',
      lugar: 'Parque Central',
      ubicacion: 'Cádiz',
      calle: 'Av. del Mar, s/n, 11011 Cádiz',
    },
    {
      id: 3,
      nombre: 'Concierto de Jazz',
      lugar: 'Teatro Alameda',
      ubicacion: 'Huelva',
      calle: 'Calle Vázquez López, 12, 21001 Huelva',
    },
    {
      id: 4,
      nombre: 'Concierto de Jazz',
      lugar: 'Teatro Alameda',
      ubicacion: 'Huelva',
      calle: 'Calle Vázquez López, 12, 21001 Huelva',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Opciones')}>
            <Image
              source={require('../../../assets/icono-hamburguesa.png')}
              style={styles.iconMenu}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.calendar} onPress={() => navigation.navigate('Calendario')}>
            <Text style={styles.calendarTitle}>CALENDARIO</Text>
            <Image
              source={require('../../../assets/Vector.png')}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Perfil')}>
          <Image
            source={require('../../../assets/icono-perfil.png')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Categorías de eventos */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventCategories}>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>TODOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>GASTRONOMÍA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>VIDA NOCTURNA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>TURISMO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>MÚSICA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>TEATRO Y ESPECTÁCULOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton}>
          <Text style={styles.eventCategoryButtonText}>BUSCAR</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Lista de eventos */}
      <View style={styles.eventList}>
        {eventos.map((evento) => (
          <View key={evento.id} style={styles.eventCard}>
            <Image
              source={require('../../../assets/imagen-evento.png')}
              style={styles.eventImage}
            />
            <Text style={styles.eventTitle}>{evento.nombre}</Text>
            <Text style={styles.eventLocation}>{evento.lugar}</Text>
            <Text style={styles.eventCity}>{evento.ubicacion}</Text>
            <Text style={styles.eventStreet}>{evento.calle}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#1F1F1F',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    marginRight: 20,
  },
  iconMenu: {
    width: 35,
    height: 35,
  },
  calendar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#22C55E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  calendarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  calendarIcon: {
    width: 20,
    height: 20,
  },
  profileButton: {
    marginLeft: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  eventCategories: {
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    paddingVertical: 10,
    borderRadius: 10,
  },
  eventCategoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  eventCategoryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventList: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  eventCard: {
    marginBottom: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 30,
  },
  eventImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    padding: 100,
  },
  eventTitle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventLocation: {
    color: '#000000',
    fontSize: 14,
  },
  eventCity: {
    color: '#000000',
    fontSize: 14,
  },
  eventStreet: {
    color: '#000000',
    fontSize: 14,
  },
});
