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
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="MyPlants" component={ListOfPlants} options={{title:"My Plants"}}/>
            <Stack.Screen name="AddPlant" component={AddAPlant} options={{title:"Add Plant"}}/>
            <Stack.Screen name="Selector" component={Selector} options={{title:"Choose Method"}}/>
            <Stack.Screen name="PhotoLibrary" component={PhotoLibrary} options={{title:"Photo Library"}}/>
            <Stack.Screen name="TakeAPhoto" component={TakeAPhoto} options={{title:"Take Photo"}}/>
            <Stack.Screen name="PlantDetails" component={PlantDetails} options={{title: "Plant Details"}}/>
            <Stack.Screen name="IdentifyingPlant" component={IdentifyingPlant} options={{title:"Identify Plant"}}/>
            <Stack.Screen name="Gallery" component={Gallery}/>

          </Stack.Navigator>
        </NavigationContainer>
            </GradientBackground>
      </UserProvider>
    </PlantProvider>
  );
}
