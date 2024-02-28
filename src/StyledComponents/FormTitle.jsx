import styled from "styled-components/native";

const Title = styled.Text`
color: #FFFFFF;
padding-top: 10px;
text-align: center;
font-size: 24px;
padding-bottom: 5px;
`
export default function FormTitle({text}) {
    return (
        <Title>{text}</Title>
    );
}