import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NavBar() {
    const navigation = useNavigation()
    return (
        <View style={styles.header}>
            <Text style={styles.title}>PlantPal</Text>
            {/* <Text style={styles.subtitle}>NavBar</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        paddingTop: 30,
        backgroundColor: 'green'
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'normal'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
      },
})