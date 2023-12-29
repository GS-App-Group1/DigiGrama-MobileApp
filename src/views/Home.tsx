// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import "core-js/stable/atob";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../contexts/UserContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { LoadingIndicator } from "../components/LoadingIndicator";
import homeScreenStyles from "../styles/HomeStyles";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
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

WebBrowser.maybeCompleteAuthSession();

// const redirectUri = AuthSession.makeRedirectUri();
const redirectUri = AuthSession.makeRedirectUri({ scheme: "myapp" });

const CLIENT_ID = "4wygss8FAZVLEY3S2MZhM1QDfB8a";

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const discovery = AuthSession.useAutoDiscovery(
    "https://api.asgardeo.io/t/interns/oauth2/token"
  );
  const [tokenResponse, setTokenResponse] = useState({});
  const [decodedIdToken, setDecodedIdToken] = useState({});
  const { isLoggedIn } = useContext(UserContext);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: CLIENT_ID,
      responseType: "code",
      scopes: [
        "openid",
        "profile",
        "email",
        "address",
        "groups",
        "roles",
        "urn:interns:mainservicetcfmainapi:User",
        "urn:interns:mainservicetcfmainapi:Admin",
      ],
    },
    discovery
  );

  console.log(redirectUri);

  const { setIsLoggedIn } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    const logoutEndpoint = `https://api.asgardeo.io/t/interns/oidc/logout`;

    // Constructing the body of the logout request
    const details = {
      client_id: CLIENT_ID,
      post_logout_redirect_uri: redirectUri,
      state: "logout",
    };

    // Encoding the parameters in x-www-form-urlencoded format
    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");

    // Using WebBrowser to open the logout URL with the required parameters
    let result = await WebBrowser.openBrowserAsync(
      logoutEndpoint + "?" + formBody
    );
    console.log(result);
    // Handle the result here. You may want to check if the logout was successful and then perform further actions in your app
    setIsLoggedIn(false);
    setTokenResponse({});
    setDecodedIdToken({});
    save("idToken", "");
    save("accessToken", "");
    setIsLoading(false);
  };

  const getAccessToken = () => {
    console.log("result logged:" + JSON.stringify(result));
    setIsLoading(true);
    if (result?.params?.code) {
      fetch("https://api.asgardeo.io/t/interns/oauth2/token", {
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
          console.log("access Token" + JSON.stringify(data.access_token));
          save("accessToken", JSON.stringify(data.access_token));
          console.log("decodedIdToken logged:" + JSON.stringify(decodedToken));
          save("idToken", JSON.stringify(decodedToken));
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
      {/* {!isLoggedIn && (
        <TouchableOpacity
          onPress={() => navigation.navigate("UserHome")}
          style={homeScreenStyles.button}
        >
          <Text style={homeScreenStyles.buttonText}>Guest Login</Text>
        </TouchableOpacity>
      )} */}
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
          <TouchableOpacity style={homeScreenStyles.button} onPress={logout}>
            <Text style={homeScreenStyles.buttonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};
