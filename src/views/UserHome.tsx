import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserContext } from "../contexts/UserContext";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";
import { useContext } from "react";
// const { isLoggedIn } = useContext(UserContext);
import * as SecureStore from "expo-secure-store";

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5", // Set your desired background color
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    width: "90%", // Adjust width as necessary
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: 300, // Adjust width as necessary
    height: 300, // Adjust height as necessary
    resizeMode: "contain",
    margin: 20,
  },
  // Add additional styles as necessary
});
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
  const applyForCertificate = () => {
    console.log("Apply for certificate");
  };

  const checkStatus = () => {
    console.log("Check status");
  };

  const getHelp = () => {
    console.log("Get help");
  };

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getValueFor("accessToken");
      if (token) {
        setAccessToken(token);
      }
    };

    fetchToken();
  }, []);

  console.log("SS Value: ", accessToken);
  return (
    <View style={styles.container}>
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
