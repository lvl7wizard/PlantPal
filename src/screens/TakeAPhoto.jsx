import React, { useState, useEffect, useNavigate } from 'react';
import { StyleSheet ,Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function TakeAPhoto({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
})();
  }, []);
const takePicture = async () => {
    if(camera){
        const options = { quality: 0.2};
        const data = await camera.takePictureAsync(options)
        // setImage(data.uri);
        // console.log(data.uri);
        navigation.navigate('AddPlant', {image: data.uri});
        // MediaLibrary.saveToLibraryAsync(data.uri)
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={ref => setCamera(ref)}>
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => takePicture()}>
            <Text style={styles.text}>Take Picture</Text>
            
          </TouchableOpacity>
          </View>
        </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: "center"
  },
  title: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
});
