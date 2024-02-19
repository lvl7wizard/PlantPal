import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MyPlants from './src/screens/MyPlants';
import NavBar from './src/screens/NavBar';


export default function App() {
  return (
    <View>
      <NavBar/>
      <MyPlants/>
    </View>
  );
}
