import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MyPlants from './src/screens/MyPlants';
import NavBar from './src/screens/NavBar';
import AddAPlant from './src/screens/AddAPlant';
import ListOfPlants from './src/screens/ListOfPlants';
import PhotoLibrary from './src/screens/PhotoLibrary';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();

  

  return (
      <NavigationContainer>
        <NavBar/>
        <Stack.Navigator initialRouteName="PlantsList">
          <Stack.Screen name="PlantsList" component={ListOfPlants}  />
          <Stack.Screen name="AddPlant" component={AddAPlant} />
          <Stack.Screen name="PhotoLibrary" component={PhotoLibrary} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}