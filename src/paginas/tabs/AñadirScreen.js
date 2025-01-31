import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export function AñadirScreen() {
        const navigation = useNavigation();
  return (
    <View>
      <Text>AñadirScreen</Text>
    </View>
  )
}