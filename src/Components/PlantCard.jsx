import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt, faShower, faSun } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useContext } from 'react';
import { deletePlant } from '../utils/PlantPalAPI';
import { UserContext } from "../Contexts/UserContext";
import { ProgressBar } from 'react-native-paper';

export default function PlantCard({ plant, setIsDeleted, isDeleted, setIsLoading }) {

  const [waterDays, setWaterDays] = useState(0);
  const [foodDays, setFoodDays] = useState(0);
  const [waterBarPercentage, setWaterBarPercentage] = useState(0)
  const [foodBarPercentage, setFoodBarPercentage] = useState(0)

  const { user } = useContext(UserContext);

  const currentDate = Date.now();

  useEffect(() => {

    const maxDays = 30;
  
    const calculatePercentage = (days) => {
      return days > maxDays ? 1 : days / maxDays;
    };
  
    const waterDaysValue = Math.round((plant.waterDate - currentDate) / (24 * 3600000));
    const foodDaysValue = Math.round((plant.foodDate - currentDate) / (24 * 3600000));
  
    setWaterDays(waterDaysValue);
    setFoodDays(foodDaysValue);
  
    setWaterBarPercentage(calculatePercentage(waterDaysValue));
    setFoodBarPercentage(calculatePercentage(foodDaysValue));
  }, []);
  

  
  const deleteHandler = () => {
    setIsLoading(true)
    // delete the plant from database
    deletePlant(user.username, plant._id).then((code) => {
      console.log(code)
      setIsDeleted(!isDeleted)
      console.log("Deleted");
    })
    // refresh the list or optimistic rendering
  }

  return (
    <>
     <View style={styles.blockText}>
        <Image
          source={{ uri: plant.image_url }}
          style={{ width: "100%", aspectRatio: 1/1 }}
        />
      </View>
      <View style={styles.blockText}>
        <Text style={{ color: 'white' }}>Name: {plant.name}</Text>
      </View>
      <View style={styles.blockText}>
        <Text style={{ color: 'white' }}>Species: {plant.description}</Text>
      </View>
      <View style={styles.blockText}>
        <Text style={{ color: 'white', marginBottom: 10 }}>
          Water:{' '}
          {plant.waterDate
            ? waterDays === 0
            ? 'Today'
            : `${waterDays} days`
            : 'loading...'}
        </Text>
        <View style={{width: "85%"}}>
            <ProgressBar animatedValue={waterBarPercentage} color="blue" style={{ height: 7, borderRadius: 50 }}/>
        </View>
      </View>

      <View style={styles.blockText}>
      <Text style={{ color: 'white', marginBottom: 10 }}>
          Feed:{' '}
          {plant.foodDate
            ? foodDays === 0
              ? 'Today'
              : `${foodDays} days`
            : 'loading...'}
        </Text>
        <View style={{width: "85%"}}>
            <ProgressBar animatedValue={foodBarPercentage} color="lightgreen" style={{ height: 7, borderRadius: 50 }}/>
        </View>
      </View>
      <View>
          <View style={styles.bottomIcons}>
              <FontAwesomeIcon icon={faShower} color="cyan" size={30} />
              <FontAwesomeIcon icon={faSun} color="yellow" size={30} />
              <Pressable  onPress={deleteHandler}>
              <FontAwesomeIcon icon={faTrashAlt} color="red" size={30} />
            </Pressable>
            
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  blockText: {
    marginVertical: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    color: 'white',
    width: 'min-content',
    padding: 10,
  },
  text: {
    color: 'white',
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    marginVertical: 10,
  }
});
