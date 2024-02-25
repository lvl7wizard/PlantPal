import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
        <Text style={{ color: 'white' }}>Description: {plant.description}</Text>
      </View>
      <View style={styles.blockText}>
        <Text style={{ color: 'white' }}>
          Water:{' '}
          {plant.waterDate
            ? waterDays === 0
            ? 'Today'
            : `${waterDays} days`
            : 'loading...'}
        </Text>
        <View style={{width: 200}}>
            <ProgressBar animatedValue={waterBarPercentage} color="blue" />
          <Text style={[styles.blockText, styles.text]}>💧 Water Me</Text>
        </View>
      </View>

      <View style={styles.blockText}>
      <Text style={{ color: 'white' }}>
          Feed:{' '}
          {plant.foodDate
            ? foodDays === 0
              ? 'Today'
              : `${foodDays} days`
            : 'loading...'}
        </Text>
        <View style={{width: 200}}>
            <ProgressBar animatedValue={foodBarPercentage} color="lightgreen" />
            <Text style={[styles.blockText, styles.text]}>🍴 Feed Me</Text>
        </View>
      </View>
      <View>
        <View style={styles.topRow}>
          <View>
          </View>
          <Pressable style={styles.bottomRightContainer} onPress={deleteHandler}>
            <FontAwesomeIcon icon={faTrash} color="red" size={30} />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  blockText: {
    marginBottom: 10,
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomRightContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
});
