import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { PlantContext } from "../Contexts/PlantContext";
import * as FileSystem from "expo-file-system";
import uploadImage from "../../src/utils/imgbbUpload.js";
import { postPlant } from "../utils/PlantPalAPI.js";

export default function AddAPlant({ navigation, route }) {
  const { myPlantsList, setMyPlantsList } = useContext(PlantContext);
  const defaultImage = "https://i.ibb.co/xXMbNb3/defaultplant-480.png";
  const [takenImage, setTakenImage] = useState(defaultImage);

  useEffect(() => {
    if (!route.params) {
      setTakenImage(defaultImage);
    } else {
      setTakenImage(route.params.image);
    }
  }, [route.params]);

  const [description, setDescription] = useState();
  const [plantName, setPlantName] = useState();
  const [waterNeeded, setWaterNeeded] = useState();
  const [foodNeeded, setFoodNeeded] = useState();

  const choosePhotoHandler = () => {
    navigation.navigate("PhotoLibrary");
  };

  const onSubmitHandler = () => {

    if (description && plantName && waterNeeded && foodNeeded) {
      // if the takenImage has been changed from default then
      if (takenImage !== defaultImage) {
        // convert image to base64 for upload, otherwise use that default img link as takenImage value
        FileSystem.readAsStringAsync(takenImage, {
          encoding: "base64",
        }).then((base64Image) => {
          // upload the photo to a hosting service and return the http address of the uploaded image
          uploadImage(base64Image).then((imgURL) => {
            const newPlant = {
              "name": plantName,
              "description": description,
              "username": "strawberryman",
              "image_url": imgURL,
              "food_inc": foodNeeded,
              "water_inc": waterNeeded
              }
            postPlant(newPlant)
            setMyPlantsList((currentPlantsList) => [
              ...currentPlantsList,
              newPlant
            ]);
          })
        })
    
      } else {
        const newPlant = {
          "name": plantName,
          "description": description,
          "username": "strawberryman",
          "image_url": defaultImage,
          "food_inc": foodNeeded,
          "water_inc": waterNeeded
          }
        postPlant(newPlant)
        setMyPlantsList((currentPlantsList) => [
          ...currentPlantsList,
          newPlant,
        ]);
      }
      navigation.navigate("MyPlants");
      // create a new plant object with all fields from the form and image key with http address as value
    } else {
      Alert.alert("Please Fill In The Form");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 15, paddingTop: 5 }}>
        <Text style={styles.title}>Add Your Plant</Text>
        <View style={styles.InputGroup}>
          <Text>Enter your plant's name:</Text>
          <TextInput
            placeholder="e.g. Planty McPlantface"
            onChangeText={(val) => {
              setPlantName(val);
            }}
            style={[styles.input, !plantName && styles.invalidInput]}
          />

          <View style={styles.imageContainer}>
            <Image style={styles.imagePreview} source={{ uri: takenImage }} />
          </View>
          <Pressable style={styles.button} onPress={choosePhotoHandler}>
            <Text style={styles.text}>Upload a photo</Text>
          </Pressable>

          <View style={styles.InputGroup}>
            <Text>Enter plant description:</Text>
            <TextInput
              placeholder="e.g. Spider Plant"
              onChangeText={(val) => {
                setDescription(val);
              }}
              style={[styles.input, !description && styles.invalidInput]}
            />
          </View>
        </View>
        <View style={styles.InputGroup}>
          <Text>How many days apart does your plant need watering? </Text>
          <TextInput
            keyboardType="numeric"
            placeholder="e.g. 10"
            onChangeText={(val) => {
              setWaterNeeded(val);
            }}
            style={[styles.input, !waterNeeded && styles.invalidInput]}
          />
        </View>

        <View style={styles.InputGroup}>
          <Text>How many days apart does your plant need plant food? </Text>
          <TextInput
            keyboardType="numeric"
            placeholder="e.g. 30"
            onChangeText={(val) => {
              setFoodNeeded(val);
            }}
            style={[styles.input, !foodNeeded && styles.invalidInput]}
          />
        </View>

        <Pressable style={styles.button} onPress={onSubmitHandler}>
          <Text style={styles.text}>Add my plant</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 24,
  },
  InputGroup: {
    paddingVertical: 10,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "limegreen",
    width: "min-content",
    padding: 10,
    margin: 80,
  },
  input: {
    height: 40,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  invalidInput: {
    borderColor: "red",
  },
  imagePreview: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
});
