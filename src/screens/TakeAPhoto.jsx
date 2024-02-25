import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { Camera } from 'expo-camera';
const screenWidth = Dimensions.get('window').width;

export default function TakeAPhoto({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    };
    getCameraPermission();
  }, []);

  const takePicture = async () => {
    if(camera){
        const options = { quality: 0.2};
        const data = await camera.takePictureAsync(options)
        navigation.navigate('AddPlant', {image: data.uri});
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
            <TouchableOpacity style={styles.button} onPress={() => takePicture()}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </View>
  );
}

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
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});