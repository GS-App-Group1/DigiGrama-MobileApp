// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../contexts/UserContext";
import { LoadingIndicator } from "../components/LoadingIndicator";
//import env variables
import Config from "react-native-config";

import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { TokenResponse } from "expo-auth-session";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 30,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    width: "90%",
    backgroundColor: "#e6e6e6",
    padding: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  statusButton: {
    backgroundColor: "orange", // Color for the "Pending" status
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    width: "90%",
    alignItems: "center",
  },
  statusButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Add any additional styling as necessary
});

// Dummy data for the example
const applicationData = {
  nic: "123456789V",
  address: "123 Main Street",
  civilStatus: "Single",
  occupation: "Engineer",
  reason: "Certificate Requirement",
  status: "Pending", // This could be 'Success', 'Rejected', or 'Pending'
};

const CheckStatus = () => {
  // This status color could change based on the application status
  const statusColor: { [key: string]: string } = {
    pending: "orange",
    success: "green",
    rejected: "red",
  };
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [presentOccupation, setPresentOccupation] = useState("");
  const [reason, setReason] = useState("");
  const [gsDivision, setGsDivision] = useState("");
  const [email, setEmail] = useState("");
  const [idToken, setIdToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [gsNote, setGsNote] = useState("");
  const [requestTime, setRequestTime] = useState("");
  const [status, setStatus] = useState("pending");
  const { isLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    const fetchIdToken = async () => {
      const token = await getValueFor("idToken");
      if (token) {
        setIdToken(token);
      }
    };
    const fetchAccessToken = async () => {
      const token = await getValueFor("accessToken");
      if (token) {
        setAccessToken(token);
        console.log("In CheckStatus AccessToken: " + accessToken);
      }
    };

    fetchAccessToken();
    fetchIdToken();
    getData();
  }, [accessToken]);

  const getData = async () => {
    setIsLoading(true); // Start loading
    // const API_KEY = process.env.EXPO_PUBLIC_GET_REQUEST_API;
    // const API_KEY =
    //   "eyJ4NXQiOiJZell6WTJNNVpXWTNZbVF4TTJZME16UTNOMk16WXpka05EWXlORE14TWpnd016RTNOamM1T1RSbE9UWTVaR1JsWkRJd01qVTBZakUzTURNeE9UQTBZZyIsImtpZCI6Ill6WXpZMk01WldZM1ltUXhNMlkwTXpRM04yTXpZemRrTkRZeU5ETXhNamd3TXpFM05qYzVPVFJsT1RZNVpHUmxaREl3TWpVMFlqRTNNRE14T1RBMFlnX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0YTM2MWI4Yi1lM2JiLTQ0ZDEtYmVhNC1kZmFjNDk0NGZmYzMiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6WyJtaXV2Y3haUWhGMjJZanJuZ2JLUmJqWlZwVWNhIiwiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCJdLCJuYmYiOjE3MDI5NjE2NzksImF6cCI6Im1pdXZjeFpRaEYyMllqcm5nYktSYmpaVnBVY2EiLCJvcmdfaWQiOiJjZjNhNDE3Ni01NGM5LTQ1NDctYmNkNi1jNmZlNDAwYWQwZDgiLCJpc3MiOiJodHRwczpcL1wvYXBpLmFzZ2FyZGVvLmlvXC90XC9pbnRlcm5zXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNzAyOTYyNTc5LCJvcmdfbmFtZSI6ImludGVybnMiLCJpYXQiOjE3MDI5NjE2NzksImp0aSI6ImNlNDVkYWE3LTliNzAtNGY3My1hOTM2LTAwY2ZiN2E5MWNhMyIsImNsaWVudF9pZCI6Im1pdXZjeFpRaEYyMllqcm5nYktSYmpaVnBVY2EifQ.KMPnypn024tKJ0WVDdCSsMeJF9b1I56aMhTdeF9Oou3gLWzy8AUHBnPSB46Zz6AHrHOwFDIaWPvhBJojmkmYq3WhuMHLtj1_V1kdjkikkMcHMSDyloNZg-YDJ8pxSImBAoREsK4jb3w_NlrJlgi0PjFU5Ius12x6pgS1B33LkgvWScGe3B2TgR5HH7mMzQjVnFqV63kCvNwp4RqrF0t4xo0owFrnauVyXn6-cPpXgyAm0qtYP-SAxIjfkCmz85M30RmqjKeNGKsYGodir24QQndHVOItoqzjdDa25QAFAr04j6b7XngABl7PUXc1s3MuDKFJl5f7pzTMOgDf__nlGg";
    // console.log("API KEY " + API_KEY);
    const testData = {
      nic: "200005703120",
      email: "themirada@wso2.com",
    };
    try {
      const url = new URL(
        "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/hbld/mainservice-tcf/mainapi-bf2/v1/getUserRequestForNIC"
      );
      url.searchParams.append("nic", idToken.nic);
      url.searchParams.append("email", idToken.email);

      console.log("URL: " + url.toString()); // Log the full URL
      console.log("Authorization Token: " + accessToken); // Log the token

      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });

      console.log("Response Status: " + response.status); // Log the response status

      if (response.ok) {
        const responseBody = await response.json();
        console.log("Response Body: ", responseBody); // Log the parsed JSON response
        if (responseBody.length == 0) {
          Alert.alert("No application found for this NIC");
          return;
        }
        const jsonResponse = responseBody[0];

        console.log("Json response", jsonResponse);
        // Process jsonResponse
        setAddress(jsonResponse.address);
        setCivilStatus(jsonResponse.civilStatus);
        setEmail(jsonResponse.email);
        setGsDivision(jsonResponse.gsDivision);
        setGsNote(jsonResponse.gsNote);
        setNic(jsonResponse.nic);
        setPresentOccupation(jsonResponse.presentOccupation);
        setReason(jsonResponse.reason);
        setRequestTime(jsonResponse.requestTime);
        setStatus(jsonResponse.status.toLowerCase());
      } else {
        console.error("Fetch error: " + response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      {isLoading && <LoadingIndicator loadingText="Loading" />}

      <View style={styles.container}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "black",
            marginBottom: 20,
          }}
        >
          Digi Grama App
        </Text>
        <Text style={styles.label}>NIC</Text>
        <Text style={styles.info}>{nic}</Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.info}>{address}</Text>

        <Text style={styles.label}>Civil Status</Text>
        <Text style={styles.info}>{civilStatus}</Text>

        <Text style={styles.label}>Present Occupation</Text>
        <Text style={styles.info}>{presentOccupation}</Text>

        <Text style={styles.label}>Reason</Text>
        <Text style={styles.info}>{reason}</Text>

        <Text style={styles.label}>GS Division</Text>
        <Text style={styles.info}>{gsDivision}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.info}>{email}</Text>

        <Text style={styles.label}>GS Note</Text>
        <Text style={styles.info}>{gsNote}</Text>

        <Text style={styles.label}>Request Time</Text>
        <Text style={styles.info}>{requestTime}</Text>

        <TouchableOpacity
          style={[
            styles.statusButton,
            { backgroundColor: statusColor[status] },
          ]}

          // If the button should be interactive, you can add onPress here
        >
          <Text style={styles.statusButtonText}>{applicationData.status}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CheckStatus;
