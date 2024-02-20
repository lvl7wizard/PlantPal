import { useEffect, useState} from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ListOfPlants() {
    const [myPlantList, setMyPlantList] = useState([])
    const navigation = useNavigation()

    if (myPlantList.length !== 0) {
      return (
        <View>
          <ScrollView>
          { myPlantList.map(plant => (
            <View key={Math.random()} style={styles.plant}>
                <View style={styles.blockText}>
                </View>
                <View style={styles.blockText}>
                    <Text style={{color: 'white'}}>Name: {plant.name}</Text>
                </View>
                <View style={styles.blockText}>
                    <Text style={{color: 'white'}}>Species: {plant.species}</Text>
                </View>
                <View style={styles.blockText}>
                    <Text style={{color: 'white'}}>Water in: {plant.water} days</Text>
                </View>
                <View style={styles.blockText}>
                    <Text style={{color: 'white'}}>Feed in: {plant.food} days</Text>
                </View>  
                <View style={styles.blockText}>
                    <Image source={{ uri: plant.image}} style={{width: 150, height: 150}}/>
                </View>  
            </View>
            ))}
            <Button title="Add a Plant" onPress={() => navigation.navigate("AddPlant", { setMyPlantList: setMyPlantList })} />
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.blockText}>You have no plants!</Text>
          <Image source={{uri: "https://i.ibb.co/2SGcvqL/SadPlant.png"}} style={{width: 150, height: 150, marginBottom: 30}}/>
          <Button title="Add a Plant" onPress={() => navigation.navigate("AddPlant", { setMyPlantList: setMyPlantList })} />
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
      },
      blockText: {
        marginBottom: 10,
      },
    });