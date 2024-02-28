import styled from "styled-components/native";

const FormInput = styled.TextInput`
height: 40px;
width: 75%;
align-self: center;
color: white;
background-color: rgba(0, 0, 0, 0.2);
border-width: 1px;
border-radius: 8px;
padding-horizontal: 10px;
font-size: 16px;
border-color: black;
margin-top: 10px;
margin-bottom: 10px;
border-color:${props => props.invalid ? "red" : "black"}
`
export default FormInput;