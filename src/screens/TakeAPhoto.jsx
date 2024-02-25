import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';

export default function TakeAPhoto({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [isTakingPicture, setIsTakingPicture] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    };
    getCameraPermission();
  }, []);

  const takePicture = async () => {
    if (camera) {
      setIsTakingPicture(true);
      const options = { quality: 0.2 };
      const data = await camera.takePictureAsync(options)
      navigation.navigate('AddPlant', { image: data.uri });
    }
  }

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ratio="1:1" ref={ref => setCamera(ref)}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => takePicture()} disabled={isTakingPicture}>
              {isTakingPicture ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.text}>Take a photo</Text>
              )}
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: screenWidth,
    aspectRatio: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: 160,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});