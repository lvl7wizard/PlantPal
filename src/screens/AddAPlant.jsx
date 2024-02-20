import { View, Text, TextInput, Button, StyleSheet, Modal, Pressable } from "react-native";
import { useState, useContext} from "react";
import { PlantContext } from "../Contexts/PlantContext";

export default function AddAPlant({navigation}) {
    const {setMyPlantsList} = useContext(PlantContext)

    const [speciesName, setSpeciesName] = useState()
    const [plantName, setPlantName] = useState()
    const [waterNeeded, setWaterNeeded] = useState()
    const [foodNeeded, setFoodNeeded] = useState()
    const [plantImageURL, setPlantImageURL] = useState(
        "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
    const [isVisible, setIsVisible] = useState(false)
    
        const choosePhotoHandler = () => {
            navigation.navigate("PhotoLibrary")
        }

    const onSubmitHandler = (() => {
        setIsVisible(true)
        setMyPlantsList((currentPlantsList) => [...currentPlantsList, {
            species: speciesName,
            name: plantName,
            water: waterNeeded,
            food: foodNeeded,
            image: plantImageURL
        }])
        navigation.navigate("PlantsList")
    })

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
      };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add A Plant</Text>
            <View style={styles.InputGroup}>   
                <Text>Enter species name:</Text>
                <TextInput
                placeholder='e.g. Spider Plant'
                onChangeText={(val) => setSpeciesName(val)}
                />
            </View>
            <View style={styles.InputGroup}>
                <Text>Enter your plant's name:</Text>
                <TextInput
                placeholder='e.g. Planty McPlantface'
                onChangeText={(val) => setPlantName(val)}
                />
            </View> 
            <View style={styles.InputGroup}>
                <Text>How many days apart does your plant need watering? </Text>
                <TextInput
                keyboardType='numeric'
                placeholder='e.g. 10' 
                onChangeText={(val) => setWaterNeeded(val)}
                />
            </View>
            <View style={styles.InputGroup}>  
                <Text>How many days apart does your plant need plant food? </Text>
                <TextInput
                keyboardType='numeric'
                placeholder='e.g. 30'
                onChangeText={(val) => setFoodNeeded(val)}
                />
            </View>
            <View style={styles.InputGroup}>
                { isVisible ? <Text>
                    Your {speciesName} is called {plantName}. It should be watered every {waterNeeded} days and needs plant food every {foodNeeded} days.
                </Text> : null }
            </View>
            <View style={styles.InputGroup}>  
                <Text>Upload a picture of your plant: </Text>
                <TextInput
                onChangeText={(val) => setPlantImageURL(val)}
                />
            </View>
                <Pressable style={styles.button} onPress={onSubmitHandler}>
                    <Text style={styles.text}>Add my plant</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={choosePhotoHandler}>
                    <Text style={styles.text}>Upload a photo</Text>
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
      backgroundColor: 'white',
      paddingBottom: 100
    },
    title: {
        paddingVertical: 10,
        textAlign: 'center',
    },
    InputGroup: {
        paddingVertical: 10,
        textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: "limegreen",
        width: "min-content",
        padding: 10
      },
});