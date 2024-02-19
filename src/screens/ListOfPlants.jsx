import { useEffect, useState} from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, Image } from "react-native";

export default function ListOfPlants({myPlantList}) {

    return (
        <View style={styles.container}>
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
          </ScrollView>
        </View>
      );
    }
     
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
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