import { StyleSheet, Pressable, Text, View } from 'react-native';
import GradientBackground from "../Components/GradientBackround";
import FormButton from "../StyledComponents/FormButton.jsx"

export default function Selector({navigation, route}) {

  return (

    <GradientBackground>
      <FormButton text={"Detect Plant"} pressHandler={() => navigation.navigate("TakeAPhoto", {afterPhotoTaken: "IdentifyingPlant"})}/>
      <FormButton text={"Add Manually"} pressHandler={() => navigation.navigate("AddPlant")}/>
    </GradientBackground>
  );
}