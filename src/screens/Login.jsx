import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  Platform
} from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { postUser, getUser } from "../utils/PlantPalAPI";
import GradientBackground from "../Components/GradientBackround";

// Dave things
import styled from 'styled-components/native';
const Container = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
`;
// Dave things

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [loginUserNameInput, setLoginUserNameInput] = useState("");
  const [signUpUserNameInput, setSignUpUserNameInput] = useState("");
  const [loginButtonClicked, setLoginButtonClicked] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const navigation = useNavigation();

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
        Alert.alert("No Username", "Please enter a username")
      } else if (!validateEmail(emailInput)) {
        Alert.alert("Invalid email", "Please enter a valid email address")
      } else if (!emailInput) {
        Alert.alert("No Email", "Please enter an email")
      }
      else {
        const newUser = await postUser(signUpUserNameInput, emailInput);
        if (!newUser) {
          Alert.alert("User Exists", "User already exists, please try again")
        }
        setUser(newUser.user);
        navigation.navigate("MyPlants");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      setLoginButtonClicked(true);
      if (loginUserNameInput) {
        const user = await getUser(loginUserNameInput);
        if (!user) {
          Alert.alert("Invalid Username", "Username doesn't exist")
        } else {
          setUser({ ...user, username: loginUserNameInput });
          navigation.navigate("MyPlants");
        }
        }  else {
          Alert.alert("No Username", "Please enter a username")
        }
        }catch (error) {
          console.log(error, "<--- catch block");
        }
  
  };
  return (
    <>
      {!newAccount ? (
        <GradientBackground>
        <Image source={require('../../assets/PlantPalLogo.png')} style={styles.Image} />
        <Text style={styles.logoTitle}>PlantPal</Text>
          <View style={styles.formContainer}>
            <Text style={styles.header}>Login</Text>
            <View style={styles.InputGroup}>
              <TextInput
                value={loginUserNameInput}
                onChangeText={setLoginUserNameInput}
                placeholder={"Enter Username"}
                placeholderTextColor="#A7A8AE"
                style={[
                  styles.input,
                  !loginUserNameInput && loginButtonClicked && styles.invalidInput,
                ]}
              />
              <Pressable onPress={handleLogin} style={styles.button}>
                <Text style={styles.text}>Login</Text>
              </Pressable>  

              <Pressable
                onPress={() => {
                  setNewAccount(true)
                  setLoginButtonClicked(false)
                }}
                style={[
                  styles.button,
                ]}
              >
                <Text style={styles.text}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
        </View>
        </GradientBackground>
      ) : (
        <GradientBackground>
        <Image source={require('../../assets/PlantPalLogo.png')} style={styles.Image} />
        <Text style={styles.logoTitle}>PlantPal</Text>
        <View style={styles.formContainer}>
        <Text style={styles.header}>Sign Up</Text>
          <View style={styles.InputGroup}>
            <TextInput
              value={signUpUserNameInput}
              onChangeText={setSignUpUserNameInput}
              placeholder={"Enter Username"}
              placeholderTextColor="#A7A8AE"
              style={styles.input}
            />
            <TextInput
              value={emailInput}
              onChangeText={setEmailInput}
              placeholder={"Enter Email"}
              placeholderTextColor="#A7A8AE"
              style={styles.input}
            />
            <Pressable onPress={handleSignUp} style={styles.button}>
              <Text style={styles.text}>Sign Up</Text>
            </Pressable>
            <Pressable
              onPress={() => setNewAccount(false)}
              style={[
                styles.button,
              ]}
            >
              <Text style={styles.text}>
                Back to login
              </Text>
            </Pressable>
          </View>
        </View>
        </GradientBackground>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 5,
    marginHorizontal: 10,
    marginVertical: 30
   },
   Image: {
    width: 150,
    height: 200,
    alignSelf: "center",
    marginTop: 20,
   },
  title: {
    color: "white",
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 24,
  },
  InputGroup: {
    paddingVertical: 10,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "min-content",
    padding: 10,
    margin: 70,
    borderWidth: 1,
    borderRadius: 10,
  },
  input: ({
    height: 40,
    width: "75%",
    alignSelf: "center",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: "black",
    marginTop: 10,
    marginBottom: 10,
  }),
  invalidInput: {
    borderColor: "red",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  header: {
    color: "white",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 24,
  },
  logoTitle: {
    color: "white",
    alignSelf: "center",
    fontSize: 30
  },
})
