import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import GradientBackground from "../Components/GradientBackround";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function TakeAPhoto({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [isTakingPicture, setIsTakingPicture] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    };
    getCameraPermission();
  }, []);

  const takePicture = async () => {
    if (camera) {
      setIsTakingPicture(true);
      const options = { quality: 0.2 };
      const data = await camera.takePictureAsync(options);
      navigation.navigate("AddPlant", { image: data.uri });
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <GradientBackground>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ratio="1:1"
        ref={(ref) => setCamera(ref)}
      >
      </Camera>
        <TouchableOpacity
          style={styles.takePictureButton}
          onPress={() => takePicture()}
          disabled={isTakingPicture}
        >
          {isTakingPicture ? (
            <>
            <ActivityIndicator color="#fff" size={90}/>
            </>
            
          ) : (
                <FontAwesomeIcon icon={faCircle} color="#8a9a99" size={90} style={{alignSelf: "center"}} />
          )}
        </TouchableOpacity>
    </GradientBackground>
  );
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  camera: {
    width: screenWidth,
    aspectRatio: 1,
  },
  takePictureButton: {
    width: 115,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 200,
    paddingVertical: 12,
    alignSelf: "center",
    marginTop: 20,
  },
});
