import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export function CalendarScreen() {
  const navigation = useNavigation();

  const getDates = () => {
    const dates = [];
    const currentDate = new Date();
    for (let i = 0; i < 31; i++) {
      const dateCopy = new Date(currentDate);
      dateCopy.setDate(currentDate.getDate() + i);
      const formattedDate = dateCopy.toLocaleDateString('es-ES', {
        weekday: 'long', 
        day: 'numeric', 
        month: 'long'
      });
      dates.push(formattedDate);
    }
    return dates;
  };

  const dates = getDates();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Calendario</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={50} color="black" style={styles.closeButton} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {dates.map((date, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.dateButton}
            onPress={() => navigation.navigate('EventosDelDia', { date })} // Pasamos la fecha seleccionada
          >
            <Text style={styles.dateText}>{date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 150,
  },
  headerTitle: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 80,
  },
  closeButton: {
    position: 'absolute',
    left: -35,
    top: 15,
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  dateButton: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  dateText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

