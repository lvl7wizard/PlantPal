import { StyleSheet, Pressable, Text, View } from 'react-native';

export default function Selector({navigation, route}) {

  return (
    <>
     <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("TakeAPhoto", {afterPhotoTaken: "IdentifyingPlant"})}>
          <Text style={styles.text}>Detect Plant</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("AddPlant")}>
          <Text style={styles.text}>Add Manually</Text>
      </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: 'limegreen',
    width: 'min-content',
    padding: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
})