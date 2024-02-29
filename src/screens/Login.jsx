import {
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { postUser, getUser } from "../utils/PlantPalAPI";
import GradientBackground from "../Components/GradientBackround";
import PlantPalLogo from "../StyledComponents/PlantPalLogo";
import FormContainer from "../StyledComponents/FormContainer";
import FormTitle from "../StyledComponents/FormTitle";
import FormInput from "../StyledComponents/FormInput";
import FormButton from "../StyledComponents/FormButton";
import Loading from "../Components/Loading";
import React from "react";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [loginUserNameInput, setLoginUserNameInput] = useState("");
  const [signUpUserNameInput, setSignUpUserNameInput] = useState("");
  const [loginButtonClicked, setLoginButtonClicked] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(false);
    }, [])
  );

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSignUp = async () => {
    try {
      if (!signUpUserNameInput) {
        Alert.alert("No Username", "Please enter a username");
      } else if (!validateEmail(emailInput)) {
        Alert.alert("Invalid email", "Please enter a valid email address");
      } else if (!emailInput) {
        Alert.alert("No Email", "Please enter an email");
      } else {
        setIsLoading(true);
        const newUser = await postUser(signUpUserNameInput, emailInput);
        if (!newUser) {
          Alert.alert("User Exists", "User already exists, please try again");
        }
        setUser(newUser.user);
        setIsLoading(false);
        navigation.navigate("MyPlants");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleLogin = async () => {
    // set is loading true
    try {
      setLoginButtonClicked(true);
      if (loginUserNameInput) {
        setIsLoading(true);
        const user = await getUser(loginUserNameInput);
        if (!user) {
          Alert.alert("Invalid Username", "Username doesn't exist");
          setIsLoading(false);
        } else {
          setUser({ ...user, username: loginUserNameInput });
          // setIsLoading(false)
          navigation.navigate("MyPlants");
        }
      } else {
        setIsLoading(false);
        Alert.alert("No Username", "Please enter a username");
      }
    } catch (error) {
      console.log(error, "<--- catch block");
    }
  };

  if (isLoading) {
    return <Loading text={"Connecting to server..."} />;
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <GradientBackground>
            <PlantPalLogo />
            {!newAccount ? (
              <FormContainer>
                <FormTitle text={"Login"} />
                <FormInput
                  value={loginUserNameInput}
                  onChangeText={setLoginUserNameInput}
                  placeholder={"Enter Username"}
                  placeholderTextColor="#A7A8AE"
                  invalid={!loginUserNameInput && loginButtonClicked}
                />
                <FormButton text={"Login"} pressHandler={handleLogin} />
                <FormButton
                  text={"Sign Up"}
                  pressHandler={() => {
                    setNewAccount(true);
                    setLoginButtonClicked(false);
                  }}
                />
              </FormContainer>
            ) : (
              <FormContainer>
                <FormTitle text={"Sign Up"} />
                <FormInput
                  value={signUpUserNameInput}
                  onChangeText={setSignUpUserNameInput}
                  placeholder={"Enter Username"}
                  placeholderTextColor="#A7A8AE"
                />
                <FormInput
                  value={emailInput}
                  onChangeText={setEmailInput}
                  placeholder={"Enter Email"}
                  placeholderTextColor="#A7A8AE"
                />
                <FormButton text={"Sign Up"} pressHandler={handleSignUp} />
                <FormButton
                  text={"Back to Login"}
                  pressHandler={() => setNewAccount(false)}
                />
              </FormContainer>
            )}
          </GradientBackground>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
