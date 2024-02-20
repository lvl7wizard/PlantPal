import { useEffect, useState, useContext} from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PlantContext } from "../Contexts/PlantContext";
import PlantCard from "./PlantCard";

export default function ListOfPlants() {
    const {myPlantsList} = useContext(PlantContext)


    const navigation = useNavigation()

    if (myPlantsList.length !== 0) {
      return (
        <View>
          <ScrollView>
          { myPlantsList.map(plant => (
            <View key={Math.random()} style={styles.plant}>
                <PlantCard plant={plant}/>
            </View>
            ))}
            <Button title="Add a Plant" onPress={() => navigation.navigate("AddPlant")} />
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.blockText}>You have no plants!</Text>
          <Image source={{uri: "https://i.ibb.co/2SGcvqL/SadPlant.png"}} style={{width: 150, height: 150, marginBottom: 30}}/>
          <Button title="Add a Plant" onPress={() => navigation.navigate("AddPlant")} />
        </View>
      )
    }
}
     
    const styles = StyleSheet.create({
      container: {
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
      },
      plant: {
        padding: 10,
        margin: 20,
        backgroundColor: 'green',
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
      }
    });