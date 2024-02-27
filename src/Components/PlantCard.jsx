import { View, Text, StyleSheet, Image, Pressable} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashAlt, faShower, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { ProgressBar } from "react-native-paper";
import deletePlantAlert from "./DeletePlantAlert";
import patchPlantAlert from "./PatchPlantAlert";
import { useNavigation } from '@react-navigation/native';

export default function PlantCard({
  plant,
  setIsDeleted,
  setIsLoading,
}) {
  const [waterDays, setWaterDays] = useState(0);
  const [foodDays, setFoodDays] = useState(0);
  const [waterBarPercentage, setWaterBarPercentage] = useState(0);
  const [foodBarPercentage, setFoodBarPercentage] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false)
  const navigation = useNavigation();

  const { user } = useContext(UserContext);

  const currentDate = Date.now();

  useEffect(() => {
    console.log(`PLANT CARD RENDERED: ${plant.name}`)
    const waterInterval = plant.waterInterval / (24 * 3600000)
    const foodInterval = plant.foodInterval / (24 * 3600000)

    const calculateWaterPercentage = (waterDaysValue) => {
      return waterDaysValue > waterInterval ? 1 : waterDaysValue / waterInterval
    }
    
    const calculateFoodPercentage = (foodDaysValue) => {
      return foodDaysValue > foodInterval ? 1 : foodDaysValue / foodInterval
    }
    
    const waterDaysValue = Math.round(
      (plant.waterDate - currentDate) / (24 * 3600000)
    );
    const foodDaysValue = Math.round(
      (plant.foodDate - currentDate) / (24 * 3600000)
    );

    setWaterDays(waterDaysValue);
    setFoodDays(foodDaysValue);

    setWaterBarPercentage(calculateWaterPercentage(waterDaysValue));
    setFoodBarPercentage(calculateFoodPercentage(foodDaysValue));
  }, [isUpdated]);

  const deleteHandler = () => {
    deletePlantAlert(plant.name, user.username, plant._id, setIsDeleted, setIsLoading)
  };

  const patchHandler = ((water_plant = false, feed_plant = false) => {
    patchPlantAlert(water_plant, feed_plant, user.username, plant._id, plant.name, setIsUpdated, setWaterBarPercentage, setFoodBarPercentage)
  })

  return (
    <>
      <View style={styles.blockText}>
        <Pressable onPress={() => {navigation.navigate("PlantInfo", {plant})}}>
        <Image
          source={{ uri: plant.image_url }}
          style={{ width: "100%", aspectRatio: 1 / 1 }}
        />
        </Pressable>
      </View>
      <View style={styles.blockText}>
        <Text style={{ color: "white" }}>Name: {plant.name}</Text>
      </View>
      <View style={styles.blockText}>
        <Text style={{ color: "white" }}>Species: {plant.description}</Text>
      </View>
      <View style={styles.blockText}>
        <Text style={{ color: "white", marginBottom: 10 }}>
          Water:{" "}
          {plant.waterDate
            ? waterDays === 0
              ? "Today"
              : `${waterDays} days`
            : "loading..."}
        </Text>
        <View style={{ width: "85%" }}>
          <ProgressBar
            animatedValue={waterBarPercentage}
            color="blue"
            style={{ height: 12, borderRadius: 50 }}
          />
        </View>
      </View>

      <View style={styles.blockText}>
        <Text style={{ color: "white", marginBottom: 10 }}>
          Feed:{" "}
          {plant.foodDate
            ? foodDays === 0
              ? "Today"
              : `${foodDays} days`
            : "loading..."}
        </Text>
        <View style={{ width: "85%" }}>
          <ProgressBar
            animatedValue={foodBarPercentage}
            color="lightgreen"
            style={{ height: 12, borderRadius: 50 }}
          />
        </View>
      </View>
      <View>
        <View style={styles.bottomIcons}>
          <Pressable onPress={() => patchHandler(true, false)}>
            <FontAwesomeIcon icon={faShower} color="cyan" size={30} />
          </Pressable>
          <Pressable onPress={() => patchHandler(false, true)}>
            <FontAwesomeIcon icon={faSun} color="yellow" size={30} />
          </Pressable>
          <Pressable onPress={deleteHandler}>
            <FontAwesomeIcon icon={faTrashAlt} color="limegreen" size={30} />
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
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    color: "white",
    width: "min-content",
    padding: 10,
  },
  text: {
    color: "white",
  },
  bottomIcons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
});
