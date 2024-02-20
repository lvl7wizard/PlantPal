import { View, Text, StyleSheet, Button, Image, Pressable } from "react-native";

export default function PlantCard({plant}) {
    return (
        <>
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
            <View>
                <Button title="💧"/>
                <Button title="🍴"/>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>Delete Plant</Text>
                </Pressable>
            </View> 
        </>
    )
}

const styles = StyleSheet.create({
    blockText: {
        marginBottom: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: "red",
        color: "white",
        width: "min-content",
        padding: 10
      },
    text: {
        color: "white"
    }
})