import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashAlt, faShower, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { ProgressBar } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { getPlantByIDFromAPI } from "../utils/ApiCall";
import { getPlantById, patchPlant } from "../utils/PlantPalAPI";
import { PlantContext } from "../Contexts/PlantContext";
import { UserContext } from "../Contexts/UserContext.jsx";
import * as FileSystem from "expo-file-system";
import uploadImage from "../../src/utils/imgbbUpload.js";
import ChangePhotoBtn from "../StyledComponents/ChangePhotoBtn.jsx";
import FormContainer from "../StyledComponents/FormContainer.jsx";
import FormTitle from "../StyledComponents/FormTitle.jsx";
import FormButton from "../StyledComponents/FormButton.jsx";
import GradientBackground from "../Components/GradientBackround.jsx";

// import Gallery from "react-grid-gallery";
// import deletePlantAlert from "../Components/DeletePlantAlert";
// import patchPlantAlert from "../Components/PatchPlantAlert";

export default function PlantDetails({ navigation }) {
  const route = useRoute();
  const setIsLoading = route.params?.setIsLoading;
  const [plant, setPlant] = useState(route.params.plant);
  const { plantsListChanged, setPlantsListChanged } = useContext(PlantContext);
  const { user } = useContext(UserContext);

  const [waterDays, setWaterDays] = useState(0);
  const [foodDays, setFoodDays] = useState(0);
  const [waterBarPercentage, setWaterBarPercentage] = useState(0);
  const [foodBarPercentage, setFoodBarPercentage] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentModalImage, setCurrentModalImage] = useState(0);
  const [changePlantImage, setChangePlantImage] = useState(false);

  const [bibliography, setBibliography] = useState(false);
  const [family, setFamily] = useState(false);
  const [commonName, setCommonName] = useState(false);

  const currentDate = Date.now();
  useEffect(() => {
    console.log(`PLANT RENDERED: ${plant.name}`);
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
  }, []);

  useEffect(() => {
    if (route.params.image && route.params.imageChoice) {
      console.log(route.params);
      const addImage = async () => {
        try {
          const base64Image = await FileSystem.readAsStringAsync(
            route.params.image,
            {
              encoding: "base64",
            }
          );
          const imgURL = await uploadImage(base64Image);
          console.log(imgURL);

          if (route.params.imageChoice === "main") {
            await patchPlant(
              (water_plant = null),
              (feed_plant = null),
              (image_url = imgURL),
              (image = false),
              user.username,
              plant._id
            );
          } else {
            await patchPlant(
              (water_plant = null),
              (feed_plant = null),
              (image_url = null),
              (image = imgURL),
              user.username,
              plant._id
            );
          }
          setPlantsListChanged(!plantsListChanged);
        } catch (error) {
          console.log(error);
        }
      };
      addImage();
    }
  }, [route.params]);

  useEffect(() => {
    getPlantById(plant._id)
      .then((response) => {
        setPlant(response.plant);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [plantsListChanged]);

  const viewGallery = () => {
    navigation.navigate("Gallery", { plant: plant });
  };

  const choosePhotoHandler = (imageChoice) => {
    setChangePlantImage(false);
    navigation.navigate("TakeAPhoto", {
      afterPhotoTaken: "PlantDetails",
      imageChoice: imageChoice,
    });
  };
  getPlantByIDFromAPI(plant.description)
    .then((res) => {
      setFamily(res.data.common_name);
      setBibliography(res.data.bibliography, res.data.family);
      setCommonName(res.data.family_common_name);
    })
    .catch((error) => {
      setBibliography("no bibliography found");
      setFamily("No Family found");
    });

  // const deleteHandler = () => {
  //   deletePlantAlert(plant.name, user.username, plant._id, setPlantsListChanged, setIsLoading)
  // };

  // const patchHandler = ((water_plant = false, feed_plant = false) => {
  //   patchPlantAlert(water_plant, feed_plant, user.username, plant._id, plant.name, setPlantsListChanged, setWaterBarPercentage, setFoodBarPercentage)
  // })

  return (
    <GradientBackground>
      <ScrollView>
        {!changePlantImage ? (
          <Pressable onPress={() => setChangePlantImage(true)}>
            <Image
              source={{ uri: plant.image_url }}
              style={{ width: "100%", aspectRatio: 1 / 1 }}
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => setChangePlantImage(false)}>
            <Image
              source={{ uri: plant.image_url }}
              style={{ opacity: 0.5, width: "100%", aspectRatio: 1 / 1 }}
            />
            <ChangePhotoBtn
              text={"Take photo"}
              pressHandler={() => choosePhotoHandler("main")}
            />
          </Pressable>
        )}
        <View style={{ flex: 1 }}>
          <FormButton
            text={"Add a Photo"}
            pressHandler={() => choosePhotoHandler("gallery")}
          />
          <FormButton text={"Gallery"} pressHandler={viewGallery} />
          <FormContainer>
            <FormTitle text={plant.name} />
            <FormTitle text={plant.description} />
            <FormTitle text={commonName} />
            <FormTitle text={family} />
            <View style={styles.blockText}>
              <View>
                <Text>Bibliography: {bibliography}</Text>
              </View>
              <View>
                <Text style={{ paddingTop: 5 }}>
                  Age:{" "}
                  {Math.round((Date.now() - plant.createdAtDate) / 1000 / 60)}{" "}
                  minutes
                </Text>
              </View>
            </View>
          </FormContainer>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  changePhoto: {
    position: "absolute",
    left: 50,
    right: 50,
    marginLeft: "auto",
    marginRight: "auto",
    top: "50%",
  },
  main: {
    display: "flex",
    alignItems: "center",
  },
  galleryImage: {
    aspectRatio: 1,
  },
  gallery: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 2,
    marginLeft: 8,
    marginTop: 8,
  },
  blockText: {
    marginVertical: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "limegreen",
    width: "min-content",
    padding: 10,
    margin: 70,
  },
  text: {
    color: "black",
  },
  bottomIcons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  plantContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 10,
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
