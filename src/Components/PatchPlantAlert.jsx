import { Alert } from "react-native";
import { patchPlant } from "../utils/PlantPalAPI";

const patchPlantAlert = (
  water_plant,
  feed_plant,
  username,
  plant_id,
  name,
  setIsUpdated,
) => {
  Alert.alert(
    `${water_plant ? "Water" : "Feed"} Plant`, `Do you want to ${water_plant ? "water" : "feed"} ${name}?`,
    [
      {
        text: "Cancel",
        onPress: () => console.log("user cancelled request"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          patchPlant(water_plant, feed_plant, username, plant_id)
            .then(() => {
              setIsUpdated((currentValue) => !currentValue);
            })
            .catch((error) => {
              console.error("Error updating plant:", error);
            });
        },
      },
    ]
  );
};

export default patchPlantAlert;
