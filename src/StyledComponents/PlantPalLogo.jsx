import styled from "styled-components/native";
import { View } from "react-native";
const myImage = require('../../assets/PlantPalLogo.png');

const Logo = styled.Image`
  width: 130px;
  height: 145px;
  align-self: center;
  margin-top: 5%;
`;

const PlantPalTitle = styled.Text`
  color: #FFFFFF;
  align-self: center;
  font-size: 30px;
`;
export default function PlantPalLogo() {
  return (
    <View>
      <Logo source={myImage}/>
      <PlantPalTitle>PlantPal</PlantPalTitle>
    </View>
  );
}