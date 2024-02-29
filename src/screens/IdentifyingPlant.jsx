import { View, Text, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import Loading from '../Components/Loading';
import {identifyPlant} from '../utils/plantIdApi';


const PLANTID_API_KEY = "YXtQ1YBfeNdyCHkmxT1H0YUapK7S85iSpqgVC4Ra0ovpu9payW"

export default function IdentifyingPlant({navigation}) {
  const route = useRoute()
  const [isLoading, setIsLoading] = useState(true);
  const [identificationResult, setIdentificationResult] = useState(null)
  const [predictionList, setPredictionList] = useState([])
  const image = route.params.image

    useEffect(() => {
      FileSystem.readAsStringAsync(image, {
        encoding: 'base64',
      })
      .then((base64Image) => {
        identifyPlant(base64Image)
        .then((response) => {
            setIdentificationResult(response)
            setPredictionList(response.result.classifications.suggestions)
            setIsLoading(false)
            navigation.navigate("AddPlant", {image:image, identifiedImageResult: identificationResult
          })
          .catch((error) => {
            // Handle errors here
            console.error(error);
          });


        
        })
    })           

    
    if (isLoading) {
      return <Loading />;
    }
   
      
    return (
        <View><Text> hi </Text></View>
            
        // <View>
        // {predictionList.map((prediction) => {
        //   return (
        //     <Pressable 
        //     onPress={navigation.navigate("AddPlant", {image:image, identifiedImageResult: identificationResult})}>
        //       {/* <Text> Confirm </Text> */}
        //       <Text>Species: {prediction.name}</Text>
        //       <Text>Species: {prediction.probability}</Text>
        //     </Pressable>
        //   )
        // })}

        // </View>
    )
})
}