import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from "react-native";
import {useContext, useState} from "react"
import { UserContext } from "../Contexts/UserContext";
import { useNavigation } from '@react-navigation/native';
import { postUser, getUser } from "../utils/PlantPalAPI";

export default function Login() {
  const {user, setUser} = useContext(UserContext)
  const [loginUserNameInput, setLoginUserNameInput] = useState("")
  const [signUpUserNameInput, setSignUpUserNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [newAccount, setNewAccount] = useState(false)
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
      if (!validateEmail(emailInput)) {
        console.log("invalid email alert bar here")
      }
      else if (!signUpUserNameInput) {
        console.log("please enter a username")
      }
      else {
        const newUser = await postUser(signUpUserNameInput, emailInput)
        setUser(newUser.user)
        navigation.navigate('MyPlants')
      }

      
    } catch(error) {
      console.log(error)
    }
  }

  const handleLogin = async () => {
    try {
      if (!loginUserNameInput) {
        throw new Error("Please enter a username")
      }
      const user = await getUser(loginUserNameInput)
      if (!user) {
        throw new Error("username doesnt exist")
      }

      setUser({...user, username: loginUserNameInput})
      navigation.navigate('MyPlants')
    } catch (error) {
      console.log(error)
    }

  }
    return (
        <>
          {!newAccount ? 
            <View style={styles.container}>
                <ScrollView style={{ paddingHorizontal: 15, paddingTop: 5 }}>
                    <Text style={styles.title}>Login</Text>
                    <Text>Enter your username:</Text>
                    <View style={styles.InputGroup}>
                        <TextInput value={loginUserNameInput} onChangeText={setLoginUserNameInput} style={styles.input} />
                        <Pressable onPress={handleLogin} style={styles.button}>
                        <Text style={styles.text}>Login</Text>
                        </Pressable>

                        <Pressable onPress={() => setNewAccount(true)} style={[styles.button, {backgroundColor: "white", borderWidth: 2}]}>
                          <Text style={[styles.text, {color:"black"}]}>or Sign up</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View> :

            <View style={styles.container}>
            <ScrollView style={{ paddingHorizontal: 15, paddingTop: 5 }}>
                <Text style={styles.title}>Sign Up</Text>
                <View style={styles.InputGroup}>
                    <Text>Enter a new username:</Text>
                    <TextInput value={signUpUserNameInput} onChangeText={setSignUpUserNameInput} style={styles.input} />
                    <Text>Enter your email:</Text>
                    <TextInput value={emailInput} onChangeText={setEmailInput} style={styles.input} />
                    <Pressable onPress={handleSignUp} style={styles.button}>
                    <Text style={styles.text}>Sign Up</Text>
                    </Pressable>
                    <Pressable onPress={() => setNewAccount(false)} style={[styles.button, {backgroundColor: "white", borderWidth: 2}]}>
                          <Text style={[styles.text, {color:"black"}]}>Back to login</Text>
                      </Pressable>
                </View>
            </ScrollView>
            </View>
            }
            


        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    title: {
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
      backgroundColor: "limegreen",
      width: "min-content",
      padding: 10,
      margin: 70,
    },
    input: {
      height: 40,
      borderColor: "green",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      fontSize: 16,
      color: "#333",
      marginTop: 10,
    },
    text: {
      color: "#fff",
      fontSize: 16,
    },
    invalidInput: {
      borderColor: "red",
    },
  });