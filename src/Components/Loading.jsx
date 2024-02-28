import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import GradientBackground from "./GradientBackround";

export default function Loading({text = "Loading..."}) {
    return (
      <GradientBackground>
        <ActivityIndicator size="large"/>
        <Text style={styles.blockText}>{text}</Text>
      </GradientBackground>
    )
}
const styles = StyleSheet.create({
  blockText: {
    color: "white",
    marginVertical: 20,
    fontSize: 24,
    alignSelf: "center"
  },
})
