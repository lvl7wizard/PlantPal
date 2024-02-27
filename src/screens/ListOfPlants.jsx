import { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { PlantContext } from '../Contexts/PlantContext';
import PlantCard from '../Components/PlantCard';
import { UserContext } from '../Contexts/UserContext';
import { getUserPlants } from '../utils/PlantPalAPI';
import Loading from '../Components/Loading';
import GradientBackground from '../Components/GradientBackround';


export default function ListOfPlants({navigation}) {
  const { user, setUser } = useContext(UserContext);
  const { myPlantsList, setMyPlantsList } = useContext(PlantContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdded, setIsAdded] = useState(false)
  // const navigation = useNavigation();
  
  useEffect(() => {
    getUserPlants(user.username).then((response) => {
      // console.log('LIST OF PLANTS RENDERED');
      // setUser(response.user);
      // console.log(response.plants);
      setMyPlantsList(response.plants);
      setIsLoading(false);
    });
  }, [isDeleted, isAdded]);

  if (isLoading) {
    return <Loading />;
  }

  if (myPlantsList.length !== 0) {
    return (
      <GradientBackground>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {myPlantsList.map((plant) => (
            <View key={Math.random()} style={styles.plant}>
              <PlantCard
                plant={plant}
                setIsDeleted={setIsDeleted}
                isDeleted={isDeleted}
                setIsLoading={setIsLoading}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('AddPlant')}
          >
            <Text style={styles.text}>Add a Plant</Text>
          </Pressable>
        </View>
      </View>
      </GradientBackground>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.blockText}>Welcome {user.username}</Text>
        <Text style={styles.blockText}>You have no plants!</Text>
        <Image
          source={{ uri: 'https://i.ibb.co/C9xPQjr/SadPlant.png' }}
          style={{ width: 150, height: 150, marginBottom: 30 }}
        />
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('TakeAPhoto')}
        >
          <Text style={{ fontSize: 16, color: '#fff' }}>Add Plant</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  // plant: {
  //   padding: 10,
  //   margin: 20,
  //   backgroundColor: '#836b40',
  //   color: 'white',
  //   fontSize: 24,
  //   textAlign: 'center',
  // },
  blockText: {
    marginVertical: 20,
    fontSize: 24,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "min-content",
    padding: 10,
    margin: 70,
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    color: 'white',
  },
  plant: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 5,
    marginHorizontal: 10,
    marginVertical: 30
   },
});
