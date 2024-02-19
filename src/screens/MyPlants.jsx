import { View, Text, ScrollView } from "react-native";
import ListOfPlants from "./ListOfPlants";
import AddAPlant from "./AddAPlant";
import { useState } from "react";

export default function MyPlants() {
    const [myPlantList, setMyPlantList] = useState([])

    return (
        <ScrollView>
            <Text>MyPlants</Text>
            <ListOfPlants myPlantList={myPlantList}/>
            <AddAPlant setMyPlantList={setMyPlantList}/>
        </ScrollView>
    )
}