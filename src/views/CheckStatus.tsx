// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../contexts/UserContext";
import { LoadingIndicator } from "../components/LoadingIndicator";
//import env variables
import Config from "react-native-config";

import { Alert, View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../styles/CheckStatusStyles";
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
    try {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        console.log(key + " retrieved: ", result); // Debug log
        return JSON.parse(result);
      } else {
        console.log(key + " not found in SecureStore");
        return null;
      }
    } catch (e) {
      console.error("Error in getValueFor - " + key + ": ", e);
      return null;
    }
  }

  useEffect(() => {
    const fetchTokens = async () => {
      const idTokenValue = await getValueFor("idToken");
      const accessTokenValue = await getValueFor("accessToken");

      if (idTokenValue && accessTokenValue) {
        setIdToken(idTokenValue);
        setAccessToken(accessTokenValue);
        getData(idTokenValue, accessTokenValue); // Call getData with the tokens
      }
    };

    fetchTokens();
  }, []);

  const getData = async (idToken, accessToken) => {
    setIsLoading(true); // Start loading
    // const API_KEY = process.env.EXPO_PUBLIC_GET_REQUEST_API;

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
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return ""; // Return empty string if timestamp is null or undefined

    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    // This will format the date and time in a readable format based on the user's locale
    // You can customize the format as needed
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
        <TouchableOpacity
          style={[
            styles.statusButton,
            { backgroundColor: statusColor[status] },
          ]}

          // If the button should be interactive, you can add onPress here
        >
          <Text style={styles.statusButtonText}>
            Status: {applicationData.status}
          </Text>
        </TouchableOpacity>
        <Text style={styles.labelGreen}>NIC</Text>
        <Text style={styles.infoGreen}>{nic}</Text>
        <Text style={styles.labelGreen}>Request Time</Text>
        <Text style={styles.infoGreen}>{formatTimestamp(requestTime)}</Text>

        <Text style={styles.labelGreen}>GS Note</Text>
        <Text style={styles.infoGreen}>{gsNote.trim() ? gsNote : "N/A"}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.info}>{email}</Text>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.info}>{address}</Text>
        <Text style={styles.label}>GS Division</Text>
        <Text style={styles.info}>{gsDivision}</Text>

        <Text style={styles.label}>Civil Status</Text>
        <Text style={styles.info}>{civilStatus}</Text>

        <Text style={styles.label}>Present Occupation</Text>
        <Text style={styles.info}>{presentOccupation}</Text>

        <Text style={styles.label}>Reason</Text>
        <Text style={styles.info}>{reason}</Text>
      </View>
    </ScrollView>
  );
};

export default CheckStatus;
