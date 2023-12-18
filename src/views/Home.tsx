// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import * as AppAuth from "react-native-app-auth";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";
import "core-js/stable/atob";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../contexts/UserContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { LoadingIndicator } from "../components/LoadingIndicator";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
type RootStackParamList = {
  Home: undefined;
  UserHome: undefined; // Add parameters here if NewPage expects any props
  ApplyCert: undefined;
  ExpoLogin: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri();

const CLIENT_ID = "JLo7FfeUqjXIZhy7JrtfqKCzIfka";

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const discovery = AuthSession.useAutoDiscovery(
    "https://api.asgardeo.io/t/interntest/oauth2/token"
  );
  const [tokenResponse, setTokenResponse] = useState({});
  const [decodedIdToken, setDecodedIdToken] = useState({});
  const [key, onChangeKey] = React.useState("Your key here");
  const [value, onChangeValue] = React.useState("Your value here");
  const { isLoggedIn } = useContext(UserContext);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: CLIENT_ID,
      responseType: "code",
      scopes: ["openid", "profile", "email", "address", "phone"],
    },
    discovery
  );

  const { setIsLoggedIn } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const getAccessToken = () => {
    console.log("result logged:" + JSON.stringify(result));
    setIsLoading(true);
    if (result?.params?.code) {
      fetch("https://api.asgardeo.io/t/interntest/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=authorization_code&code=${result?.params?.code}&redirect_uri=${redirectUri}&client_id=${CLIENT_ID}&code_verifier=${request?.codeVerifier}`,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log("data logged:" + JSON.stringify(data));
          const decodedToken = jwtDecode(data.id_token);
          setTokenResponse(data);
          setDecodedIdToken(decodedToken);
          console.log("decodedIdToken logged:" + JSON.stringify(decodedToken));
          save("accessToken", JSON.stringify(decodedToken));
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setIsLoggedIn(false);
        });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    (async function setResult() {
      if (result) {
        if (result.error) {
          Alert.alert(
            "Authentication error",
            result.params.error_description || "something went wrong"
          );
          return;
        }
        if (result.type === "success") {
          getAccessToken();
          console.log(result.params);
        }
      }
    })();
  }, [result]);

  return (
    <ScrollView contentContainerStyle={homeScreenStyles.container}>
      {isLoading && <LoadingIndicator loadingText="Signing In!" />}
      <Text style={homeScreenStyles.title}>Digi Grama App</Text>
      <Image
        source={require("../../assets/Images/main.png")}
        style={homeScreenStyles.logoImage}
      />
      {decodedIdToken && (
        <Text style={homeScreenStyles.welcomeText}>
          Welcome {decodedIdToken.given_name || ""}!
        </Text>
      )}
      <Text style={homeScreenStyles.additionalText}>
        Get your Graama Certficiate without any hassle
      </Text>
      <Image
        source={require("../../assets/Images/interview.png")} // Replace 'img2.jpg' with your second image file name
        style={homeScreenStyles.mainImage}
      />
      {!isLoggedIn && (
        <TouchableOpacity
          onPress={() => navigation.navigate("UserHome")}
          style={homeScreenStyles.button}
        >
          <Text style={homeScreenStyles.buttonText}>Guest Login</Text>
        </TouchableOpacity>
      )}
      <View>
        {!isLoggedIn && (
          <TouchableOpacity
            disabled={!request}
            onPress={() => promptAsync()}
            style={homeScreenStyles.button}
          >
            <Text style={homeScreenStyles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        )}
        {isLoggedIn && (
          <TouchableOpacity
            onPress={() => navigation.navigate("UserHome")}
            style={homeScreenStyles.button}
          >
            <Text style={homeScreenStyles.buttonText}>Go to Dashboard</Text>
          </TouchableOpacity>
        )}
        {isLoggedIn && (
          <TouchableOpacity
            style={homeScreenStyles.button}
            onPress={() => {
              save("accessToken", "");
              setTokenResponse("");
              setDecodedIdToken("");
              setIsLoggedIn(false);
            }}
          >
            <Text style={homeScreenStyles.buttonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
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
    width: 300, // Adjust width as necessary
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
  logoImage: {
    height: 100,
    width: "70%",
    resizeMode: "contain",
  },
  mainImage: {
    // Add styles for your images
    width: "70%",
    height: 200, // Adjust as needed
    resizeMode: "contain",
  },
  additionalText: {
    // Styles for the additional text
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  welcomeText: {
    // Styles for the welcome text
    fontSize: 20,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
