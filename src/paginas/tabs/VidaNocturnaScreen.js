import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

// Lista de eventos nocturnos
const eventosNocturnos = [
    {
      id: '1',
      nombre: 'Fiesta en la Discoteca X',
      descripcion: '¡Únete a la fiesta más épica de la ciudad con DJs en vivo!',
      imagen: 'https://www.ejemplo.com/fiesta1.jpg'
    },
    {
      id: '2',
      nombre: 'Noches de Salsa',
      descripcion: 'Baila salsa toda la noche en el club Y.',
      imagen: 'https://www.ejemplo.com/fiesta2.jpg'
    },
    {
      id: '3',
      nombre: 'Concierto en Vivo',
      descripcion: 'Disfruta de un concierto en vivo de tu banda favorita.',
      imagen: 'https://www.ejemplo.com/fiesta3.jpg'
    }
]

export function VidaNocturnaScreen() {

    const navigation = useNavigation();

  // Renderiza la lista de eventos
  const renderItem = ({ item }) => (
    <View style={styles.eventoContainer}>
      <Image source={{ uri: item.imagen }} style={styles.imagenEvento} />
      <Text style={styles.nombreEvento}>{item.nombre}</Text>
      <Text style={styles.descripcionEvento}>{item.descripcion}</Text>
    </View>
  )

  return (
    <View style={styles.container}>

        <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>Eventos Nocturnos</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image 
                    source={require('../../../assets/boton-cerrar-opciones.png')}
                />
            </TouchableOpacity>
        </View>
        <FlatList
            data={eventosNocturnos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      backgroundColor: '#f5f5f5',
    },

    tituloContainer: {
        flexDirection: 'row',
        gap: 100,
    },

    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'left'
    },

    eventoContainer: {
      marginBottom: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 15,
      elevation: 5
    },

    imagenEvento: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 10
    },

    nombreEvento: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5
    },

    descripcionEvento: {
      fontSize: 14,
      color: '#777'
    }
})