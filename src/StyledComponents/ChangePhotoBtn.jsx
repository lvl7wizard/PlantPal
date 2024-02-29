import styled from "styled-components/native";

const StyledButton = styled.Pressable`
align-items: center;
justify-content: center;
margin-vertical: 10px;
background-color: rgba(0, 0, 0, 0.4);
width: 75%;
padding: 10px;
border-width: 1px;
border-radius: 10px;
align-self: center;
position: absolute;
left: 50px;
right: 50px;
margin-left: auto;
margin-right: auto;
top: 50%;
`
const StyledText = styled.Text`
color: #fff;
font-size: 16px;
`
export default function ChangePhotoBtn({text, pressHandler}) {
    return (
        <StyledButton onPress={pressHandler}>
            <StyledText>{text}</StyledText>
        </StyledButton>
    );
}
