import * as ImagePicker from 'expo-image-picker';
import { Button, StyleSheet, Pressable, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

export default function PhotoLibrary() {

  const navigation = useNavigation()

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <>
     <View style={styles.container}>
      {/* <Pressable style={styles.button} onPress={pickImageAsync}>
        <Text style={styles.text}>Choose Photo</Text>
      </Pressable> */}
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