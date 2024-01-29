import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Register from './components/Authentification/Register';
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Артем чуча</Text>
    //   <StatusBar style="auto" />
    // </View>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Register">
          <Drawer.Screen name="Регистрация" component={Register} />
        </Drawer.Navigator>
      </NavigationContainer>
  );
}
