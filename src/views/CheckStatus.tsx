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
    const fetchToken = async () => {
      const token = await getValueFor("accessToken");
      if (token) {
        setAccessToken(token);
      }
    };
    fetchToken();
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true); // Start loading
    // const API_KEY = process.env.EXPO_PUBLIC_GET_REQUEST_API;
    const API_KEY =
      "eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI1ZmJiMzJiYS1mMDQxLTQyNGEtOTUzYy0wZGM0NjZmNzI5ZjVAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCIsImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJTQU5EQk9YIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJNYWluU2VydmljZSAtIE1haW5BUEkiLCJjb250ZXh0IjoiXC9jZjNhNDE3Ni01NGM5LTQ1NDctYmNkNi1jNmZlNDAwYWQwZDhcL2NxeHFcL21haW5zZXJ2aWNlXC9tYWluYXBpLWJmMlwvdjEuMCIsInB1Ymxpc2hlciI6ImNob3Jlb19wcm9kX2FwaW1fYWRtaW4iLCJ2ZXJzaW9uIjoidjEuMCIsInN1YnNjcmlwdGlvblRpZXIiOm51bGx9XSwiZXhwIjoxNzAyOTIxODQ3LCJ0b2tlbl90eXBlIjoiSW50ZXJuYWxLZXkiLCJpYXQiOjE3MDI5MjEyNDcsImp0aSI6IjI3YmE4MWY5LTYyZGUtNGIwNi05ZGM1LWMwYzQyZmY3ZGNjNiJ9.BbcnI5SpXmIse86owov6CggbdCvNzQRkeZaxH34WRsUBGyJME1dez__LB9aMX3XJ4HjaedmPxit8GlTndP7c5fLI_S9awq_VJp8hfjO-UsnGhhRoqVzNVpGDX0qyOf6zR1ZRORZYazh0KNplHz4UJfG-mIpElJ01jeXCx8NTr9A1QyBGXBb_knw5zmUQV9D8A8h-775eN2UDMx4y5F-JY9ysWosSP7kKoGslYrWKoF6gAVV-V-d15gmiD3uBH05xPtKDppEV7BmrN2YEEplECeDJm48K4q-caWzN6mLkPj6aRsJvotk-SqRPENBczUglowe8Iaz6QVaWlMu9ImbWEse3k_I6Wu7YoBbvOQ9koC7_gLGpnzD5P4a5dDwPplM3rGE_i_zLXeurkZxlYWPCO5Klucpq0nMbc_DwoM51gEyXYc_FJZBO6JA2SuE76K6kcpXHoHtk3O306jSuTtpR2Fowe14pnU4VuVxPh_wKAWDkbGLCVciehv4YCKiCkkVGBJqoDVNmDi6u4V0DUe-XhqKM132YL1Iv7KkovMCyn3jgt85optcKMvXxOiDCR6S6L6vrrU4ei6E4NBdApR4JiVKwLPfQ2Zmi_WcHWXbsgTCZX1VnFXOgMKFGCIyR_HYJLVpL-bDAXgfrSpFfLKq3jyZeDdS_ePaSRI-VhG5xCYk";
    console.log("API KEY " + API_KEY);
    const testData = {
      nic: "200005703120",
      email: "themirada@wso2.com",
    };

    try {
      const url = new URL(
        "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/cqxq/mainservice/mainapi-bf2/v1.0/getUserRequestForNIC?"
      );
      url.searchParams.append("nic", accessToken.NIC);
      url.searchParams.append("email", accessToken.email);
      // console.log("NIC log: " + accessToken.email);
      // url.searchParams.append("nic", testData.nic);
      // url.searchParams.append("email", testData.email);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "API-Key": API_KEY, // Replace with your actual API Key
        },
      });
      console.log("The response" + response.status);
      console.log("Response boyd" + response.json);
      if (response.ok) {
        try {
          const responseBody = await response.json();
          const jsonResponse = responseBody[0];
          console.log("The response", response.status);
          console.log("Response body", responseBody[0]);
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
        } catch (error) {
          Alert.alert("Error", "Something went wrong.");
          console.error("Error parsing JSON:", error);
        }
      } else {
        Alert.alert("Error", "Something went wrong.");
        console.error("Fetch error: " + error.message);
      }
    } catch (error) {
      // Handle network errors
      console.log(error);
    } finally {
      setIsLoading(false); // End loading
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
