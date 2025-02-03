import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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
    <>
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Opciones')}>
            <Ionicons name="menu" size={40} color="#fff"></Ionicons>
          </TouchableOpacity>

          {/* Degradado aplicado al borde del calendario */}
          <LinearGradient
            colors={['#22c55e', '#9333ea']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}
          >
            <TouchableOpacity style={styles.calendarButton} onPress={() => navigation.navigate('Calendario')}>
              <Text style={styles.calendarTitle}>CALENDARIO</Text>
              <Ionicons name="chevron-down" size={24} color="#fff"></Ionicons>
            </TouchableOpacity>
          </LinearGradient>

        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Perfil')}>
          <Ionicons name="person-circle" size={50} color="#fff"></Ionicons>
        </TouchableOpacity>
      </View>

      {/* Scroll horizontal de categorías de eventos */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventCategories}
      >

        <TouchableOpacity style={styles.eventCategoryButton} onPress={() => navigation.navigate('Gastronomia')}>
          <Text style={styles.eventCategoryButtonText}>GASTRONOMÍA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton} onPress={() => navigation.navigate('vidaNocturna')}>
          <Text style={styles.eventCategoryButtonText}>VIDA NOCTURNA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton} onPress={() => navigation.navigate('turismo')}>
          <Text style={styles.eventCategoryButtonText}>TURISMO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton} onPress={() => navigation.navigate('musica')}>
          <Text style={styles.eventCategoryButtonText}>MÚSICA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton} onPress={() => navigation.navigate('teatroYEspectaculo')}>
          <Text style={styles.eventCategoryButtonText}>TEATRO Y ESPECTÁCULOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventCategoryButton} onPress={() => navigation.navigate('Buscar')}>
          <Text style={styles.eventCategoryButtonText}>BUSCAR</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Lista de eventos */}
      <ScrollView>
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
  </View>
      {/* Boton localizaciones cercanas */}
      <View style={styles.buttonLocation}>
        {/* Degradado aplicado al borde del calendario */}
        <LinearGradient
          colors={['#22c55e', '#9333ea']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <TouchableOpacity style={styles.backgroundContainer} onPress={() => navigation.navigate('SearchNearbyLocation')}>
            <Image
              source={require('../../../assets/direccion-vector.png')}
              style={styles.iconLocationImage}
            />
            <View style={styles.containerTextButton} >
              <Text style={styles.nearEvents}>Eventos cerca de</Text>
              <Text style={styles.nearEventsLocation}>Sevilla - San Bernardo</Text>
            </View>
            <View style={styles.iconArrowUpImageContainer}>
              <Image
                source={require('../../../assets/flecha.png')}
                style={styles.iconArrowUpImage}
              />
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 10,
    paddingBottom: 20,
    backgroundColor: '#23272A',
  },
 
  gradientBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23272A',
    borderWidth: 1,
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },

  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#23272A',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  calendarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },

  eventCategories: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    paddingVertical: 20,
    paddingHorizontal: 5,
    marginBottom: 20, 
  },

  eventCategoryButton: {
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 0, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 50, 
  },

  eventCategoryButtonText: {
    color: '#000000', 
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',  
    flex: 1, 
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
    borderRadius: 15,
    marginBottom: 10,
  },

  eventTitle: {
    padding: 10,
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },

  eventLocation: {
    paddingHorizontal: 10,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  eventCity: {
    paddingHorizontal: 10,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  eventStreet: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  /* Estilos boton localizacion cercana */
  buttonLocation: {
    position: 'absolute',
    bottom: 20, 
    left: '5%',
    width: '90%',
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 1000, 
  },
  

  backgroundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23272A',
    borderRadius: 100,
    paddingVertical: 10, 
    paddingHorizontal: 16, 
  },

  
  nearEvents: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'normal',
    marginBottom: 5,
  },
  
  nearEventsLocation: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  
  
iconLocationImage: {
  width: 24,
  height: 24,
  resizeMode: 'contain',
  marginRight: 20, 
},


iconArrowUpImageContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 8, 
},

iconArrowUpImage: {
  width: 24, 
  height: 18,
  resizeMode: 'contain', 
  marginLeft: 12, 
},
});
