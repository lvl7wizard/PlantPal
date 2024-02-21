import NavBar from './src/screens/NavBar';
import AddAPlant from './src/screens/AddAPlant';
import ListOfPlants from './src/screens/ListOfPlants';
import PhotoLibrary from './src/screens/PhotoLibrary';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlantProvider } from './src/Contexts/PlantContext';
import TakeAPhoto from './src/screens/TakeAPhoto';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <PlantProvider>
      <NavigationContainer>
        <NavBar />
        <Stack.Navigator initialRouteName="PlantsList">
          <Stack.Screen name="MyPlants" component={ListOfPlants} />
          <Stack.Screen name="AddPlant" component={AddAPlant} />
          <Stack.Screen name="PhotoLibrary" component={PhotoLibrary} />
          <Stack.Screen name="TakeAPhoto" component={TakeAPhoto} />
        </Stack.Navigator>
      </NavigationContainer>
    </PlantProvider>
  );
}
