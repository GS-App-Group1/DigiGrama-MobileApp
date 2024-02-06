// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Alert, View, Image, TouchableOpacity, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import * as SecureStore from "expo-secure-store";
import styles from "../styles/UserHomeStyles";

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    try {
      return JSON.parse(result); // Parsing the JSON string
    } catch (e) {
      console.error("Error parsing JSON: ", e);
      return null; // Return null or an appropriate default value
    }
  } else {
    return null; // Return null or an appropriate default value
  }
}

type RootStackParamList = {
  Home: undefined;
  UserHome: undefined; // Add parameters here if NewPage expects any props
  ApplyCert: undefined;
  CheckStatus: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "UserHome"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};
export const UserHome: React.FC<Props> = ({ navigation }) => {
  // Define your button actions
  const { isLoggedIn } = useContext(UserContext);

  const getHelp = () => {
    console.log("Get help");
    Alert.alert("Get Help!", "Contact pasindufo@wso2.com!");
  };

  const [accessToken, setAccessToken] = useState("");
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      const idTokenValue = await getValueFor("idToken");
      const accessTokenValue = await getValueFor("accessToken");

      if (idTokenValue && accessTokenValue) {
        setIdToken(idTokenValue);
        setAccessToken(accessTokenValue);
      }
    };

    fetchTokens();
  }, []);
  return (
    <View style={styles.container}>
      {isLoggedIn && <Text style={styles.text}>Hi {idToken.given_name} !</Text>}
      <Image
        source={require("../../assets/Images/interview.png")} // Replace 'img2.jpg' with your second image file name
        style={styles.image}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ApplyCert")}
      >
        <Text style={styles.buttonText}>Apply for grama certificate</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CheckStatus")}
      >
        <Text style={styles.buttonText}>Check status</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getHelp}>
        <Text style={styles.buttonText}>Get Help</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserHome;
