import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function Loading() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large"/>
        <Text style={styles.blockText}>Loading Plants</Text>
    </View>
    )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  blockText: {
    marginVertical: 20,
    fontSize: 24
  },
})
