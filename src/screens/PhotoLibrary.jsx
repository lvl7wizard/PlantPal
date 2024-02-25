import { StyleSheet, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PhotoLibrary() {

  const navigation = useNavigation()

  return (
    <>
     <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("TakeAPhoto")}>
          <Text style={styles.text}>Take Photo</Text>
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