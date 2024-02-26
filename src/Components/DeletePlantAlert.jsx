import { Alert } from "react-native";
import { deletePlant } from "../utils/PlantPalAPI";

const deletePlantAlert = (plant_name, username, plant_id, setIsDeleted, setIsLoading) => {
  Alert.alert("Delete Plant", `Are you sure you want to delete ${plant_name}`, [
    {
      text: "Cancel",
      onPress: () => console.log("user cancelled request"),
      style: "cancel",
    },
    {
      text: "Yes",
      onPress: () => {
        setIsLoading(true);
        deletePlant(username, plant_id)
          .then(() => {
            setIsDeleted((currentValue) => !currentValue);
          })
          .catch((error) => {
            console.error("Error deleting plant:", error);
          })
      },
    },
  ]);
};

export default deletePlantAlert;
