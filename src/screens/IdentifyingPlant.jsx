import { View, Text, Pressable, Image,StyleSheet, ScrollView, ProgressBar } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import Loading from '../Components/Loading';
import {identifyPlant} from '../utils/plantIdApi';
import GradientBackground from "../Components/GradientBackround.jsx";



export default function IdentifyingPlant({navigation}) {
  const route = useRoute()
  const [isLoading, setIsLoading] = useState(true);
  // const [identification, setIdentification] = useState(null)
  const [predictionList, setPredictionList] = useState([])
  const [selection, setSelection] = useState(null)
  const image = route.params.image

    useEffect(() => {
      FileSystem.readAsStringAsync(image, {
        encoding: 'base64',
      })
      .then((base64Image) => {
        identifyPlant(base64Image)
        .then((response) => {
          if (!response.result) {
            throw new Error("error identifying plant")
          }
          setPredictionList(response.result.classification.suggestions)
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          navigation.navigate("AddAPlant")
          console.error(error);
        });

        })
  },[])           

    
    if (isLoading) {
      return <Loading />;
    }
   
      
    return ( 
      <GradientBackground>
        {isLoading ? 
          <Loading />
        :
        <>
        <ScrollView style={{display: "flex"}}>
          <View style={styles.main}>
          {predictionList.map((prediction,index) => {
            const slug = prediction.name.toLowerCase().split(" ").join("-")
            return (
              <Pressable 
              style={[styles.plantContainer, selection === prediction ? {backgroundColor: "rgba(255, 255, 255, 0.2)"} : {backgroundColor: "rgba(10, 10, 10, 0.1)"}]}
              key={index}
              onPress={() => selection !== prediction ? setSelection(prediction) : setSelection(null)}>
                <View style={styles.imageContainer}>
                  <Image
                      source={{ uri: prediction.similar_images[0].url }}
                      style={styles.plantImage}
                    />
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.text}>Species: {prediction.name}</Text>
                  <Text style={styles.text}>Probability: {Math.round(prediction.probability*100)}%</Text>
                </View>    
                <Pressable style={styles.button} onPress={() => selection !== prediction ? setSelection(prediction) : setSelection(null)}>
                  <Text>Select</Text>
                </Pressable>
              </Pressable>          
            )
          })}
          </View>
        </ScrollView>

        <View style={{display: "flex", flexDirection: "row", justifyContent:"center",}}>
            <Pressable style={[styles.cancelButton]} onPress={() => navigation.navigate("Selector")} >
              <Text style={[styles.text, {color: "white"}]}> Cancel </Text>
            </Pressable>
            <Pressable style={[styles.confirmationButton]} onPress={selection ? () => navigation.navigate("AddPlant", {image:image, prediction: selection, slug:selection.name.toLowerCase().split(" ").join("-")}) : null} >
              <Text style={[styles.text, {color: "black"}]}> Confirm </Text>
            </Pressable>
          </View>
        </>
        }
        </GradientBackground>
    )
}
const styles = StyleSheet.create({

  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
    flex: 1,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  
  plantContainer: {
    display: "flex",
    flexDirection: "row",
    height: 80,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,

  },
  imageContainer: {
    display: "flex",
    justifyContent:"center",
    alignItems: "center"
  },

  plantImage: {
    width: 73,
    height: 73,
    marginRight: 14,
    marginLeft: 2,
    borderRadius: 10,
    margin: 0,
  },

  detailsContainer: {
    paddingTop: 10,
    display: "flex",
    justifyContent: "flex-start",
    width: 190,
  },
  confirmButton: {

  },
  text: {
    fontSize:13,
    fontFamily: 'sans-serif',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: 70,
    paddingBottom: 10,
    paddingTop: 7,
    borderWidth: 1,
    borderRadius: 6,
  },
  confirmationButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    width: 110,
    height: 40,
    paddingBottom: 10,
    paddingTop: 7,
    borderWidth: 1,
    borderRadius: 6,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: 110,
    height: 40,
    paddingBottom: 10,
    paddingTop: 7,
    borderWidth: 1,
    borderRadius: 6,
  },
});
