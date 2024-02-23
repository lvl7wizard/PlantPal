import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import getUser from "../utils/PlantPalAPI";

export default function NavBar() {
    const navigation = useNavigation()
    // const { user, setUser } = useContext(UserContext);

    // useEffect(() => {
    //     getUser().then((response) => {
    //         console.log(response.user, "<---- user")
    //         setUser(response.user)
    //     })
    //   }, [])

    return (
        <View style={styles.header}>
            <Text style={styles.title}>PlantPal</Text>
            {/* <Text style={styles.subtitle}>Logged in as: {user.username}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        paddingTop: 20,
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