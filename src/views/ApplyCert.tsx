// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../contexts/UserContext";
import { Picker } from "@react-native-picker/picker";
import { LoadingIndicator } from "../components/LoadingIndicator";

import {
  Alert,
  ActivityIndicator,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 30,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    width: "90%",
    backgroundColor: "green",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040", // Semi-transparent background
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 150,
    width: 200,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  loadingText: {
    marginTop: 10,
  },
  fieldName: {
    alignItems: "flex-start",
    fontSize: 14,
    textAlign: "left",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left", // Align text to the left
    alignSelf: "stretch", // Stretch to fill the width of the parent container
    // Add any other styling you need for the label
    marginLeft: 20,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: "100%",
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    // You can add more styling as needed
  },
  // Add any additional styling as necessary
});

export const ApplyCert = () => {
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [presentOccupation, setPresentOccupation] = useState("");
  const [reason, setReason] = useState("");
  const [gsDivision, setGsDivision] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const { isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getValueFor("accessToken");
      if (token) {
        setAccessToken(token);
      }
    };

    fetchToken();
  }, []);
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

  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    // const API_KEY = process.env.EXPO_PUBLIC_SUBMIT_REQUEST_API;
    const API_KEY =
      "eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI1ZmJiMzJiYS1mMDQxLTQyNGEtOTUzYy0wZGM0NjZmNzI5ZjVAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCIsImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJTQU5EQk9YIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJNYWluU2VydmljZSAtIE1haW5BUEkiLCJjb250ZXh0IjoiXC9jZjNhNDE3Ni01NGM5LTQ1NDctYmNkNi1jNmZlNDAwYWQwZDhcL2NxeHFcL21haW5zZXJ2aWNlXC9tYWluYXBpLWJmMlwvdjEuMCIsInB1Ymxpc2hlciI6ImNob3Jlb19wcm9kX2FwaW1fYWRtaW4iLCJ2ZXJzaW9uIjoidjEuMCIsInN1YnNjcmlwdGlvblRpZXIiOm51bGx9XSwiZXhwIjoxNzAyOTIxODQ3LCJ0b2tlbl90eXBlIjoiSW50ZXJuYWxLZXkiLCJpYXQiOjE3MDI5MjEyNDcsImp0aSI6IjI3YmE4MWY5LTYyZGUtNGIwNi05ZGM1LWMwYzQyZmY3ZGNjNiJ9.BbcnI5SpXmIse86owov6CggbdCvNzQRkeZaxH34WRsUBGyJME1dez__LB9aMX3XJ4HjaedmPxit8GlTndP7c5fLI_S9awq_VJp8hfjO-UsnGhhRoqVzNVpGDX0qyOf6zR1ZRORZYazh0KNplHz4UJfG-mIpElJ01jeXCx8NTr9A1QyBGXBb_knw5zmUQV9D8A8h-775eN2UDMx4y5F-JY9ysWosSP7kKoGslYrWKoF6gAVV-V-d15gmiD3uBH05xPtKDppEV7BmrN2YEEplECeDJm48K4q-caWzN6mLkPj6aRsJvotk-SqRPENBczUglowe8Iaz6QVaWlMu9ImbWEse3k_I6Wu7YoBbvOQ9koC7_gLGpnzD5P4a5dDwPplM3rGE_i_zLXeurkZxlYWPCO5Klucpq0nMbc_DwoM51gEyXYc_FJZBO6JA2SuE76K6kcpXHoHtk3O306jSuTtpR2Fowe14pnU4VuVxPh_wKAWDkbGLCVciehv4YCKiCkkVGBJqoDVNmDi6u4V0DUe-XhqKM132YL1Iv7KkovMCyn3jgt85optcKMvXxOiDCR6S6L6vrrU4ei6E4NBdApR4JiVKwLPfQ2Zmi_WcHWXbsgTCZX1VnFXOgMKFGCIyR_HYJLVpL-bDAXgfrSpFfLKq3jyZeDdS_ePaSRI-VhG5xCYk";
    const formData = {
      _id: new Date().toISOString(),
      nic,
      email,
      address,
      civilStatus,
      presentOccupation,
      reason,
      gsNote: "",
      gsDivision,
      requestTime: new Date().toISOString(),
      status: "Pending",
    };

    const testData = {
      _id: new Date().toISOString(),
      address: "string",
      civilStatus: "string",
      email: "string",
      gsDivision: "string",
      gsNote: "string",
      nic: "string",
      presentOccupation: "string",
      reason: "string",
      requestTime: "string",
      status: "string",
    };

    console.log(JSON.stringify(testData));
    try {
      const response = await fetch(
        "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/cqxq/mainservice/mainapi-bf2/v1.0/userRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "API-Key": API_KEY, // Replace with your actual API Key
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.status != 202) {
        try {
          const jsonResponse = await response.json();
          console.log(jsonResponse);
          Alert.alert("Error", jsonResponse.message || "Something went wrong.");
          // Process jsonResponse
        } catch (error) {
          console.error("Error parsing JSON:", error);
          Alert.alert("Error", "Unable to connect to the server.");
        }
      } else {
        Alert.alert("Success", "Application submitted successfully!");
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
      <View style={styles.container}>
        {isLoading && (
          <LoadingIndicator loadingText="Submitting Grama Certificate Request!" />
        )}
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
        <TextInput
          style={styles.input}
          placeholder={accessToken.NIC || "NIC"}
          value={nic}
          onChangeText={setNic}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder={accessToken.email || "Email"}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          autoCapitalize="none"
        />

        <Text style={styles.label}>GS Division</Text>
        <TextInput
          style={styles.input}
          placeholder="GS Division"
          value={gsDivision}
          onChangeText={setGsDivision}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Civil Status</Text>
        <Picker
          selectedValue={civilStatus}
          onValueChange={(itemValue, itemIndex) => setCivilStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Single" value="single" />
          <Picker.Item label="Married" value="married" />
          <Picker.Item label="Divorced" value="divorced" />
          <Picker.Item label="Widowed" value="widowed" />
        </Picker>

        <Text style={styles.label}>Present Occupation</Text>
        <TextInput
          style={styles.input}
          placeholder="Present Occupation"
          value={presentOccupation}
          onChangeText={setPresentOccupation}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Reason</Text>
        <TextInput
          style={styles.input}
          placeholder="Reason"
          value={reason}
          onChangeText={setReason}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ApplyCert;
