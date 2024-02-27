import NavBar from './src/Components/NavBar';
import AddAPlant from './src/screens/AddAPlant';
import ListOfPlants from './src/screens/ListOfPlants';
import PhotoLibrary from './src/screens/PhotoLibrary';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlantProvider } from './src/Contexts/PlantContext';
import { UserProvider } from './src/Contexts/UserContext';
import TakeAPhoto from './src/screens/TakeAPhoto';
import Login from './src/screens/Login';
import PlantInfo from './src/screens/PlantInfo';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <PlantProvider>
      <UserProvider>
        <NavigationContainer>
          <NavBar />
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="MyPlants" component={ListOfPlants} />
            <Stack.Screen name="AddPlant" component={AddAPlant} />
            <Stack.Screen name="PhotoLibrary" component={PhotoLibrary} />
            <Stack.Screen name="TakeAPhoto" component={TakeAPhoto} />
            <Stack.Screen name="PlantInfo" component={PlantInfo}/>
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </PlantProvider>
  );
}
