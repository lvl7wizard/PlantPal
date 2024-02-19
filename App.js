import { StyleSheet, Text, View } from 'react-native';
import NavBar from './src/screens/NavBar';
import IdentifyPlant from './src/screens/IdentifyPlant';
import PlantInfoCard from './src/screens/PlantInfoCard';

export default function App() {
  return (
    <View style={styles.container}>
      <NavBar/>
      <IdentifyPlant/>
      <PlantInfoCard/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
