// @ts-nocheck

// import { useState, useEffect } from "react";
// import { StyleSheet, Text, View, Button, Alert } from "react-native";
// import * as AuthSession from "expo-auth-session";
// import * as WebBrowser from "expo-web-browser";
// import jwtDecode from "jwt-decode";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// WebBrowser.maybeCompleteAuthSession();
// const redirectUri = AuthSession.makeRedirectUri({
//   scheme: undefined,
//   path: 'auth',
// });

// const CLIENT_ID: string = "JLo7FfeUqjXIZhy7JrtfqKCzIfka";

// interface TokenResponse {
//   access_token?: string;
//   id_token?: string;
//   token_type?: string;
//   expires_in?: number;
//   scope?: string;
// }

// interface DecodedIdToken {
//   given_name?: string;
//   email?: string;
// }

// type RootStackParamList = {
//   Home: undefined;
//   UserHome: undefined; // Add parameters here if NewPage expects any props
//   ApplyCert: undefined;
//   ExpoLogin: undefined;
// };

// type HomeScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "Home"
// >;

// type Props = {
//   navigation: HomeScreenNavigationProp;
// };

// export const ExpoLogin: React.FC<Props> = ({ navigation }) => {
//   console.log(redirectUri);
//   const discovery = AuthSession.useAutoDiscovery(
//     "https://api.asgardeo.io/t/interntest/oauth2/token"
//   );
//   const [tokenResponse, setTokenResponse] = useState<TokenResponse>({});
//   const [decodedIdToken, setDecodedIdToken] = useState<DecodedIdToken>({});

//   const [request, result, promptAsync] = AuthSession.useAuthRequest(
//     {
//       redirectUri,
//       clientId: CLIENT_ID,
//       responseType: "code",
//       scopes: ["openid", "profile"],
//     },
//     discovery
//   );

//     const getAccessToken = () => {
//       if ((result as any)?.params?.code) {
//         fetch("https://api.asgardeo.io/t/iamapptesting/oauth2/token", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           body: `grant_type=authorization_code&code=${result?.params?.code}&redirect_uri=${redirectUri}&client_id=${CLIENT_ID}&code_verifier=${request?.codeVerifier}`,
//         })
//           .then((response) => {
//             console.log("response logged:" + JSON.stringify(response));
//             return response.json();
//           })
//           .then((data) => {
//             console.log("data logged:" + JSON.stringify(data));
//             setTokenResponse(data);
//             setDecodedIdToken(jwtDecode(data.id_token));
//           })
//           .catch((err) => {
//             console.log("err logged:" + JSON.stringify(err));
//             console.log(err);
//           });
//       }
//     };

//   // const getAccessToken = () => {
//   //   if ((result as any)?.params?.code) {
//   //     const body = new URLSearchParams({
//   //       grant_type: "authorization_code",
//   //       code: result.params.code,
//   //       redirect_uri: redirectUri,
//   //       client_id: CLIENT_ID,
//   //       code_verifier: request.codeVerifier, // PKCE Code Verifier
//   //     });

//   //     fetch("https://api.asgardeo.io/t/iamapptesting/oauth2/token", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/x-www-form-urlencoded",
//   //       },
//   //       body: body.toString(),
//   //     })
//   //       .then((response) => {
//   //         console.log("response logged:" + JSON.stringify(response));
//   //         return response.json();
//   //       })
//   //       .then((data) => {
//   //         console.log("data logged:" + JSON.stringify(data));
//   //         if (data.error) {
//   //           throw new Error(
//   //             data.error_description ||
//   //               "An error occurred while fetching the access token"
//   //           );
//   //         }
//   //         setTokenResponse(data);
//   //         setDecodedIdToken(jwtDecode(data.id_token));
//   //       })
//   //       .catch((err) => {
//   //         console.log("err logged:" + JSON.stringify(err));
//   //         Alert.alert("Authentication Error", err.message);
//   //       });
//   //   }
//   // };

//   useEffect(() => {
//     (async function setResult() {
//       if (result) {
//         if (result.error) {
//           Alert.alert(
//             "Authentication error",
//             result.params.error_description || "something went wrong"
//           );
//           return;
//         }
//         if (result.type === "success") {
//           console.log("result logged:" + JSON.stringify(result.params));
//           getAccessToken();
//         }
//       }
//     })();
//   }, [result]);

//   return (
//     <View style={styles.container}>
//       <Button title="Login" disabled={!request} onPress={() => promptAsync()} />
//       {decodedIdToken && (
//         <Text>Welcome {decodedIdToken.given_name || ""}!</Text>
//       )}
//       {decodedIdToken && <Text>{decodedIdToken.email}</Text>}
//       <View style={styles.accessTokenBlock}>
//         {decodedIdToken && (
//           <Text>Access Token: {tokenResponse.access_token}</Text>
//         )}
//         {/* <Text>Access Token: {tokenResponse.access_token}</Text> */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   accessTokenBlock: {
//     width: 300,
//     height: 500,
//     overflow: "scroll",
//   },
// });

// export default ExpoLogin;
import "core-js/stable/atob";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { jwtDecode } from "jwt-decode";

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri();

const CLIENT_ID = "JLo7FfeUqjXIZhy7JrtfqKCzIfka";

export default function ExpoLogin() {
  const discovery = AuthSession.useAutoDiscovery(
    "https://api.asgardeo.io/t/interntest/oauth2/token"
  );
  const [tokenResponse, setTokenResponse] = useState({});
  const [decodedIdToken, setDecodedIdToken] = useState({});

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: CLIENT_ID,
      responseType: "code",
      scopes: ["openid", "profile", "email", "address", "phone"],
    },
    discovery
  );

  const getAccessToken = () => {
    console.log("result logged:" + JSON.stringify(result));
    if (result?.params?.code) {
      fetch("https://api.asgardeo.io/t/interntest/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=authorization_code&code=${result?.params?.code}&redirect_uri=${redirectUri}&client_id=${CLIENT_ID}&code_verifier=${request?.codeVerifier}`,
      })
        .then((response) => {
          console.log("response logged:" + JSON.stringify(response));
          return response.json();
        })
        .then((data) => {
          console.log("data logged:" + JSON.stringify(data));
          setTokenResponse(data);
          setDecodedIdToken(jwtDecode(data.id_token));
          console.log(
            "decodedIdToken logged:" + JSON.stringify(decodedIdToken)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    <View style={styles.container}>
      <Button title="Login" disabled={!request} onPress={() => promptAsync()} />
      {decodedIdToken && (
        <Text>Welcome {decodedIdToken.given_name || ""}!</Text>
      )}
      {decodedIdToken && <Text>{decodedIdToken.email}</Text>}
      <View style={styles.accessTokenBlock}>
        {decodedIdToken && (
          <Text>Access Token: {tokenResponse.access_token}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  accessTokenBlock: {
    width: 300,
    height: 500,
    overflow: "scroll",
  },
});
