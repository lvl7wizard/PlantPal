import styled from "styled-components/native";
import { View } from "react-native";
const myImage = require('../../assets/noplants2.png');

const Logo = styled.Image`
  width: 160px;
  height: 220px;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const WelcomeMessage = styled.Text`
  color: #FFFFFF;
  align-self: center;
  font-size: 30px;
`;

const Notification = styled.Text`
color: #FFFFFF;
padding-top: 10px;
text-align: center;
font-size: 24px;
padding-bottom: 5px;
`

export default function NoPlantsMsg({username}) {
  return (
    <View>
      <WelcomeMessage>Welcome {username}!</WelcomeMessage>
      <Notification>You have no plants</Notification>
      <Logo source={myImage}/>
    </View>
  );
}