import { useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet, ScrollView, Image, Button, Pressable, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PlantContext } from "../Contexts/PlantContext";
import PlantCard from "../Components/PlantCard";
import { UserContext } from "../Contexts/UserContext";
import { getUser } from "../utils/PlantPalAPI";


export default function ListOfPlants() {
    const { user, setUser } = useContext(UserContext);
    const {myPlantsList, setMyPlantsList} = useContext(PlantContext)
    const [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigation()

      useEffect(() => {
        getUser().then((response) => {
            setUser(response.user)
            setMyPlantsList(response.user.plants)
            setIsLoading(false)
        })
      }, [myPlantsList])


    if (isLoading) {
      
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large"/>
          <Text style={styles.blockText}>Loading Plants</Text>
        </View>
      )
    } 

        if (user.plants.length !== 0) {
          return (
            <View>
              <ScrollView>
              { myPlantsList.map(plant => (
                <View key={Math.random()} style={styles.plant}>
                    <PlantCard plant={plant}/>
                </View>
                ))}
                 <Pressable style={styles.button} onPress={() => navigation.navigate("AddPlant")}>
                  <Text style={styles.subtitle}>Add a Plant</Text>
                </Pressable>
              </ScrollView>
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
              <Text style={styles.blockText}>Welcome {user.username}</Text>
              <Text style={styles.blockText}>You have no plants!</Text>
              <Image source={{uri: "https://i.ibb.co/C9xPQjr/SadPlant.png"}} style={{width: 150, height: 150, marginBottom: 30}}/>
              <Pressable style={styles.button} onPress={() => navigation.navigate("AddPlant")}>
                  <Text style={{fontSize: 16, color: '#fff'}}>Add Plant</Text>
              </Pressable>
            </View>
          )
        }
      }
     
    const styles = StyleSheet.create({
      container: {
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        flex: 1
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
        marginVertical: 20,
        fontSize: 24
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      backgroundColor: "limegreen",
      width: "min-content",
      padding: 10,
      margin: 20,
    },
    });