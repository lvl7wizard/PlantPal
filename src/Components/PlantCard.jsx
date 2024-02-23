import { View, Text, StyleSheet, Button, Image, Pressable } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function PlantCard({plant}) {
    const { format } = require('date-fns');
    return (
        <>
            <View style={styles.blockText}>
                <Text style={{color: 'white'}}>Name: {plant.name}</Text>
            </View>
            <View style={styles.blockText}>
                <Text style={{color: 'white'}}>Description: {plant.description}</Text>
            </View>
            <View style={styles.blockText}>
                {/* <Text style={{color: 'white'}}>Water on: {plant.waterDate ? format(plant.waterDate, 'yyyy-MM-dd HH:mm:ss') : 'loading...'}</Text> */}
                <Text style={{color: 'white'}}>Water in {Math.round((plant.waterDate - Date.now()) / (24 * 3600000))} days</Text>
            </View>
            <View style={styles.blockText}>
                <Text style={{color: 'white'}}>Feed on: {plant.waterDate ? format(plant.foodDate, 'yyyy-MM-dd HH:mm:ss') : 'loading...'}</Text>
            </View>  
            <View style={styles.blockText}>
                <Image source={{ uri: plant.image_url}} style={{width: 150, height: 150}}/>
            </View>
            <View>
               
            <View style={styles.topRow}>
                <View>
                    <Text style={[styles.blockText, styles.text]}>💧 Water Me</Text>
                    <Text style={[styles.blockText, styles.text]}>🍴 Feed Me</Text>
                </View>
                <Pressable style={styles.bottomRightContainer}>
                    <FontAwesomeIcon icon={ faTrash } color="red" size={30} />
                </Pressable>
            </View>
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
        color: "white",
        width: "min-content",
        padding: 10
      },
    text: {
        color: "white"
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
    bottomRightContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
})