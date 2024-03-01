import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from "react-native";

import { useState, useContext, useEffect } from "react";
import { PlantContext } from "../Contexts/PlantContext";
import { UserContext } from "../Contexts/UserContext";
import * as FileSystem from "expo-file-system";
import uploadImage from "../../src/utils/imgbbUpload.js";
import { postPlant, getUserPlants } from "../utils/PlantPalAPI.js";
import Loading from "../Components/Loading";

import GradientBackground from "../Components/GradientBackround.jsx";
import FormContainer from "../StyledComponents/FormContainer.jsx";
import FormTitle from "../StyledComponents/FormTitle.jsx";
import FormInput from "../StyledComponents/FormInput.jsx";
import FormButton from "../StyledComponents/FormButton.jsx";

export default function AddAPlant({ navigation, route }) {
  const { myPlantsList, setMyPlantsList } = useContext(PlantContext);
  const defaultImage = "https://i.ibb.co/QKbhk0F/Default-Plant-removebg-preview.png";
  const [takenImage, setTakenImage] = useState(defaultImage);
  const { user, setUser } = useContext(UserContext);

  const [description, setDescription] = useState();
  const [plantName, setPlantName] = useState();
  const [waterNeeded, setWaterNeeded] = useState();
  const [foodNeeded, setFoodNeeded] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [plantButtonClicked, setPlantButtonClicked] = useState(false);
  const [speciesValue, setSpeciesValue] = useState("")
  const [slug, setSlug] = useState()
  const prediction = route.params?.prediction
  const image = route.params?.image

  useEffect(() => {
    if (image) {
      setTakenImage(route.params?.image);
    } else {
      setTakenImage(defaultImage);
    }
    if (prediction) {
      // console.log(prediction, "prediction in add a plant")
      setSpeciesValue(prediction.name)
      setSlug(route.params?.slug)
    }


  }, []);


  const choosePhotoHandler = () => {
    navigation.navigate("TakeAPhoto", {afterPhotoTaken: "AddPlant"});
  };

  const onSubmitHandler = () => {
    setPlantButtonClicked(true);
    if (speciesValue && plantName && waterNeeded && foodNeeded) {
      setIsLoading(true);
      // if the takenImage has been changed from default then
      if (takenImage !== defaultImage) {
        // convert image to base64 for upload, otherwise use that default img link as takenImage value
        FileSystem.readAsStringAsync(takenImage, {
          encoding: "base64",
        })
          .then((base64Image) => {
            // upload the photo to a hosting service and return the http address of the uploaded image
            return uploadImage(base64Image);
          })
          .then((imgURL) => {
            const newPlant = {
              name: plantName,
              description: speciesValue,
              species: speciesValue,
              username: user.username,
              image_url: imgURL,
              food_inc: foodNeeded,
              water_inc: waterNeeded,
            };
            return postPlant(newPlant);
          })
          .then(() => {
            return getUserPlants(user.username);
          })
          .then((response) => {
            return setMyPlantsList(response.plants);
          })
          .then(() => {
            navigation.navigate("MyPlants");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        // Use defaultImage when takenImage is not changed
        const newPlant = {
          name: plantName,
          description: speciesValue,
          species: speciesValue,
          username: user.username,
          image_url: defaultImage,
          food_inc: foodNeeded,
          water_inc: waterNeeded,
        };

        postPlant(newPlant)
          .then(() => {
            return getUserPlants(user.username);
          })
          .then((response) => {
            return setMyPlantsList(response.plants);
          })
          .then(() => {
            navigation.navigate("MyPlants");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } else {
      Alert.alert("Please Fill In The Form");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 55 : 0}
        >
    <GradientBackground>
      <FormContainer>
        <ScrollView style={{ paddingHorizontal: 15, paddingTop: 5 }}>
          <FormTitle text={"Add Your Plant"} />
          <Text style={styles.formLabel}>
            Enter your plant's name:
          </Text>
          <FormInput
            placeholder={"e.g Planty McPlantFace"}
            placeholderTextColor="#A7A8AE"
            onChangeText={setPlantName}
            invalid={!plantName && plantButtonClicked}
          />
          <Image style={styles.imagePreview} source={{ uri: takenImage }} />
          <FormButton
            text={"Upload a Photo"}
            pressHandler={choosePhotoHandler}
          />

          <Text style={styles.formLabel}>
            Enter plant species:
          </Text>
          <FormInput
          placeholder="e.g. Spider Plant"
          placeholderTextColor="#A7A8AE"
          value={speciesValue}
          onChangeText={setSpeciesValue}
          invalid={!description && plantButtonClicked}
          />

          <Text style={styles.formLabel}>
            How manys apart does it need watering?
          </Text>
          <FormInput
            placeholder={"e.g 10"}
            placeholderTextColor="#A7A8AE"
            keyboardType="numeric"
            onChangeText={setWaterNeeded}
            invalid={!waterNeeded && plantButtonClicked}
          />
            <Text style={styles.formLabel}>
              How many days apart does it need feeding?
            </Text>
            <FormInput
              placeholder={"e.g 30"}
              placeholderTextColor="#A7A8AE"
              keyboardType="numeric"
              onChangeText={setFoodNeeded}
              invalid={!foodNeeded && plantButtonClicked}
            />

          <FormButton 
            text={"Add My Plant"}
            pressHandler={onSubmitHandler}
            />
        </ScrollView>
      </FormContainer>
    </GradientBackground>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  imagePreview: {
    width: 200,
    height: 200,
    alignSelf: "center",
    paddingTop: 10,
  },
  formLabel: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 16,
  },
  container: {
    flex: 1
  }

});