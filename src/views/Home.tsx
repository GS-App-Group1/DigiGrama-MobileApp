import React, { useState } from "react";
import { useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
// import { authorize } from "react-native-app-auth";
import * as AppAuth from "react-native-app-auth";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";

// import { config } from "../config";
import { UserContext } from "../contexts/UserContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  UserHome: undefined; // Add parameters here if NewPage expects any props
  ApplyCert: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // export const HomeScreen = () => {
  const config = {
    issuer: "https://api.asgardeo.io/t/interntest/oauth2/token",
    clientId: "JLo7FfeUqjXIZhy7JrtfqKCzIfka",
    redirectUrl: "myapp://oauth2",
    scopes: ["openid", "profile"],
    postLogoutRedirectUrl: "myapp.auth://example",
  };

  const { setIsLoggedIn } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    try {
      console.log("setIsLoadings staus:" + isLoading);
      setIsLoading(true);
      console.log("setIsLoadings staus:" + isLoading);
      const result = await AppAuth.authorize(config);
      console.log("result logged:" + result);

      RNSecureStorage.set("authorizeResponse", JSON.stringify(result), {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      }).then(
        (_res) => {
          setIsLoggedIn(true);
        },
        (err) => {
          throw err;
        }
      );
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={homeScreenStyles.container}>
      <Text style={homeScreenStyles.title}>Digi Grama App</Text>
      <Image
        source={require("../../assets/Images/main.png")}
        style={homeScreenStyles.imageStyle}
      />
      <Text style={homeScreenStyles.additionalText}>
        Get your Graama Certficiate without any hassle
      </Text>
      <Image
        source={require("../../assets/Images/interview.png")} // Replace 'img2.jpg' with your second image file name
        style={homeScreenStyles.imageStyle}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("UserHome")}
        style={homeScreenStyles.button}
      >
        <Text style={homeScreenStyles.buttonText}>Guest Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signIn} style={homeScreenStyles.signInBtn}>
        <Text style={homeScreenStyles.signInBtnText}>
          {isLoading ? "Loading..." : "Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
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
  signInBtn: {
    elevation: 8,
    width: 250,
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "rgb(80,201,46)",
    borderRadius: 25,
    cursor: "pointer",
  },
  signInBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  imageStyle: {
    // Add styles for your images
    width: "100%",
    height: 200, // Adjust as needed
    resizeMode: "contain",
  },
  additionalText: {
    // Styles for the additional text
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
});
