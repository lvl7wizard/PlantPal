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
import PlantDetails from './src/screens/PlantDetails';
import GradientBackground from './src/Components/GradientBackround';
import Gallery from './src/screens/Gallery';
import Selector from './src/screens/Selector';
import IdentifyingPlant from './src/screens/IdentifyingPlant';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <PlantProvider>
      <UserProvider>
          <GradientBackground>
        <NavigationContainer>
          {/* <NavBar /> */}
          <Stack.Navigator initialRouteName="Login"  screenOptions={{
          headerStyle: {
            backgroundColor: '#8a9a99',
          },
          headerTintColor: '#fff',
        }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="MyPlants" component={ListOfPlants} />
            <Stack.Screen name="AddPlant" component={AddAPlant} />
            <Stack.Screen name="Selector" component={Selector} />
            <Stack.Screen name="PhotoLibrary" component={PhotoLibrary} />
            <Stack.Screen name="TakeAPhoto" component={TakeAPhoto} />
            <Stack.Screen name="PlantDetails" component={PlantDetails}/>
            <Stack.Screen name="IdentifyingPlant" component={IdentifyingPlant}/>
            <Stack.Screen name="Gallery" component={Gallery}/>

          </Stack.Navigator>
        </NavigationContainer>
            </GradientBackground>
      </UserProvider>
    </PlantProvider>
  );
}
