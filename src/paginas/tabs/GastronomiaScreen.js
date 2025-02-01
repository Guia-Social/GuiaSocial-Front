import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export function GastronomiaScreen() {
  const navigation = useNavigation();

  // Estado para el filtro de tipo de comida
  const [selectedTipoComida, setSelectedTipoComida] = useState('todos');  // Inicializa el estado

  // Ejemplo de lista de tipos de comida
  const tiposComida = ['todos', 'italiana', 'mexicana', 'japonesa', 'vegetariana'];

  // Ejemplo de eventos
  const eventos = [
    { id: '1', tipo: 'italiana', nombre: 'Pizza Party', descripcion: 'Evento exclusivo con pizzas gourmet.' },
    { id: '2', tipo: 'mexicana', nombre: 'Taco Fiesta', descripcion: 'Disfruta de tacos al estilo mexicano.' },
    { id: '3', tipo: 'japonesa', nombre: 'Sushi Night', descripcion: 'Noche de sushi y sake.' },
    { id: '4', tipo: 'vegetariana', nombre: 'Veggie Feast', descripcion: 'Una fiesta gastronómica con platos vegetarianos deliciosos.' },
    { id: '5', tipo: 'francesa', nombre: 'Baguette Bonanza', descripcion: 'Disfruta de baguettes y otros manjares franceses.' },
    { id: '6', tipo: 'tailandesa', nombre: 'Thai Spice', descripcion: 'Explora la auténtica cocina tailandesa con especias y sabores únicos.' },
    { id: '7', tipo: 'española', nombre: 'Paella Fiesta', descripcion: 'Disfruta de la mejor paella acompañada de mariscos frescos.' },
    { id: '8', tipo: 'americana', nombre: 'BBQ Bash', descripcion: 'Celebra con una parrillada americana al aire libre.' },
    { id: '9', tipo: 'china', nombre: 'Dim Sum Delight', descripcion: 'Evento exclusivo para los amantes del dim sum y platos chinos.' },
    { id: '10', tipo: 'indiana', nombre: 'Curry Night', descripcion: 'Una noche de curries tradicionales y platos picantes de la India.' },
    { id: '11', tipo: 'peruana', nombre: 'Ceviche Fest', descripcion: 'Una fiesta con ceviches frescos y mariscos de la costa peruana.' },
    { id: '12', tipo: 'griega', nombre: 'Mediterranean Feast', descripcion: 'Disfruta de mezze y platos mediterráneos tradicionales.' },
    { id: '13', tipo: 'sudamericana', nombre: 'Asado Argentino', descripcion: 'Ven a disfrutar de un asado argentino con cortes tradicionales.' },
    { id: '14', tipo: 'vegana', nombre: 'Vegan Revolution', descripcion: 'Un evento 100% vegano con una variedad de platos deliciosos y creativos.' },
    { id: '15', tipo: 'americana', nombre: 'Burger Bonanza', descripcion: 'Crea tu propia hamburguesa con ingredientes frescos y sabrosos.' },
  ];

  // Filtrar los eventos según el tipo de comida seleccionado
  const eventosFiltrados = eventos.filter(
    evento => selectedTipoComida === 'todos' || evento.tipo === selectedTipoComida
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Eventos Exclusivos de Gastronomía</Text>

        {/* Filtro de tipo de comida */}
        <Picker
          selectedValue={selectedTipoComida}
          onValueChange={(itemValue) => setSelectedTipoComida(itemValue)}
          style={styles.picker}
        >
          {tiposComida.map(tipo => (
            <Picker.Item key={tipo} label={tipo.charAt(0).toUpperCase() + tipo.slice(1)} value={tipo} />
          ))}
        </Picker>

        {/* Botón "Volver al inicio" */}
        <TouchableOpacity
          style={styles.volverButton}
          onPress={() => navigation.navigate('Home')}  // Cambia 'Home' al nombre de tu pantalla de inicio
        >
          <Text style={styles.volverButtonText}>Volver al inicio</Text>
        </TouchableOpacity>

        {/* Lista de eventos */}
        <FlatList
          data={eventosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.eventoContainer}>
              <Text style={styles.eventoTitle}>{item.nombre}</Text>
              <Text>{item.descripcion}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  eventoContainer: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  eventoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  volverButton: {
    backgroundColor: '#4CAF50',  // Estilo de color verde
    padding: 15,
    borderRadius: 5,
    marginTop: 100,
    alignItems: 'center',
    height: 50,
  },
  volverButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
