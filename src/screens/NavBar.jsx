import { View, Text, StyleSheet } from "react-native";

export default function NavBar() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>PlantPal</Text>
            <Text style={styles.subtitle}>NavBar</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 90,
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
    }
})