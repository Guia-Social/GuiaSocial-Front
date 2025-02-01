import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons"; 
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

export function BuscarScreen() {
  const navigation = useNavigation();
  return (

        <View style={styles.container}>
            {/* Cabecera */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Buscar</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={50} color="black" style={styles.closeButton} />
                </TouchableOpacity>
            </View>

            <View style={styles.seacrhContainer}>
      <Text style={styles.title}>Buscador</Text>
      <Text style={styles.subtitle}>¿Buscas un evento en especifico?</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar"
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      <Text style={styles.message}>Escribe al menos 3 caracteres para poder buscar</Text>
    </View>
</View>
    
  );
};

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
      seacrhContainer: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        marginTop: 20,
        marginHorizontal: 15,
        borderRadius: 20,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
      },
      subtitle: {
        fontSize: 14,
        color: '#000',
        marginBottom: 10,
      },
      inputContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
      },
      input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        paddingLeft: 10,    
        
      },
      icon: {
        marginRight: 10,
      },
      button: {
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#000',
        width: '100%',
      },
      buttonText: {
        color: '#000',
        fontSize: 16,
      },
      message: {
        color: 'red',
        marginTop: 10,
      },
  }
  );