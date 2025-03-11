import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera"; // Use Camera instead of CameraView
import GradientBackground from "../Components/GradientBackround";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function TakeAPhoto({ navigation, route }) {
  const [facing, setFacing] = useState(Camera.Constants.Type.back); // ✅ Use Camera.Constants.Type.back
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null); // ✅ Create a reference for the camera

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;
    setIsTakingPicture(true);
    try {
      const photo = await cameraRef.current.takePictureAsync(); // ✅ Capture photo

      navigation.navigate(route.params.afterPhotoTaken, {
        image: photo.uri,
        imageChoice: route.params.imageChoice,
      });
    } catch (error) {
      console.error("Error taking picture:", error);
    }
    setIsTakingPicture(false);
  };

  return (
    <GradientBackground>
      <Camera
        ref={cameraRef} // ✅ Assign ref to Camera
        style={styles.camera}
        type={facing} // ✅ Correct usage
      />
      <TouchableOpacity
        style={styles.takePictureButton}
        onPress={takePicture} // ✅ Calls the capture function
        disabled={isTakingPicture}
      >
        {isTakingPicture ? (
          <ActivityIndicator color="#fff" size={90} />
        ) : (
          <FontAwesomeIcon
            icon={faCircle}
            color="#8a9a99"
            size={90}
            style={{ alignSelf: "center" }}
          />
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
  },
  permissionText: {
    color: "white",
    fontSize: 16,
  },
});
