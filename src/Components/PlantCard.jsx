import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashAlt, faShower, faSun, faTint } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { ProgressBar } from "react-native-paper";
import deletePlantAlert from "./DeletePlantAlert";
import patchPlantAlert from "./PatchPlantAlert";
import { useNavigation } from "@react-navigation/native";
import FormTitle from "../StyledComponents/FormTitle";
import IconButton from "../StyledComponents/IconButton";

export default function PlantCard({ plant, setIsDeleted, setIsLoading }) {
  const [waterDays, setWaterDays] = useState(0);
  const [foodDays, setFoodDays] = useState(0);
  const [waterBarPercentage, setWaterBarPercentage] = useState(0);
  const [foodBarPercentage, setFoodBarPercentage] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigation = useNavigation();

  const { user } = useContext(UserContext);

  const currentDate = Date.now();

  useEffect(() => {
    const waterInterval = plant.waterInterval / (24 * 3600000);
    const foodInterval = plant.foodInterval / (24 * 3600000);

    const calculateWaterPercentage = (waterDaysValue) => {
      return waterDaysValue > waterInterval
        ? 1
        : waterDaysValue / waterInterval;
    };

    const calculateFoodPercentage = (foodDaysValue) => {
      return foodDaysValue > foodInterval ? 1 : foodDaysValue / foodInterval;
    };

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
    deletePlantAlert(
      plant.name,
      user.username,
      plant._id,
      setIsDeleted,
      setIsLoading
    );
  };

  const patchHandler = (water_plant = false, feed_plant = false) => {
    patchPlantAlert(
      water_plant,
      feed_plant,
      user.username,
      plant._id,
      plant.name,
      setIsUpdated,
      setWaterBarPercentage,
      setFoodBarPercentage
    );
  };

  return (
    <View style={styles.plantContainer}>
      <FormTitle text={plant.name} />
      <Text
        style={{
          color: "white",
          fontStyle: "italic",
          alignSelf: "center",
          fontSize: 15,
        }}
      >
        '{plant.description}'
      </Text>
      <Pressable
        onPress={() => {
          navigation.navigate("PlantInfo", { plant });
        }}
      >
        <Image
          source={{ uri: plant.image_url }}
          style={{
            width: "100%",
            aspectRatio: 1 / 1,
            borderRadius: 8,
            marginVertical: 20,
          }}
        />
      </Pressable>

      <Text style={{ color: "white", marginBottom: 10 }}>
        Water:{" "}
        {plant.waterDate
          ? waterDays === 0
            ? "Today"
            : `${waterDays} days`
          : "loading..."}
      </Text>
      <ProgressBar
        animatedValue={waterBarPercentage}
        color="#1B96F9"
        style={{ height: 12, borderRadius: 50, width: "100%" }}
      />

      <Text style={{ color: "white", marginVertical: 10 }}>
        Feed:{" "}
        {plant.foodDate
          ? foodDays === 0
            ? "Today"
            : `${foodDays} days`
          : "loading..."}
      </Text>
      <View>
        <ProgressBar
          animatedValue={foodBarPercentage}
          color="lightgreen"
          style={{ height: 12, borderRadius: 50, width: "100%" }}
        />
      </View>
      <View style={styles.bottomIcons}>
        <IconButton onPress={() => patchHandler(true, false)}>   
          <FontAwesomeIcon icon={faShower} color="#5cb5e1" size={30} />
        </IconButton>
        <IconButton onPress={() => patchHandler(false, true)}>
          <FontAwesomeIcon icon={faTint} color="lightgreen" size={30} />
        </IconButton>
        <IconButton onPress={deleteHandler}>
          <FontAwesomeIcon icon={faTrashAlt} color="#FFB37A" size={30} />
        </IconButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginVertical: 20,
  },
  plantContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderWidth: 0,
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 5,
    marginHorizontal: 10,
    marginVertical: 30,
  },
});
