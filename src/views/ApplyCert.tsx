// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../contexts/UserContext";
import { Picker } from "@react-native-picker/picker";
import { LoadingIndicator } from "../components/LoadingIndicator";

import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
  const [idToken, setIdToken] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const { isLoggedIn } = useContext(UserContext);
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
      }
    };
    fetchAccessToken();
    fetchIdToken();
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
      "J4NXQiOiJZell6WTJNNVpXWTNZbVF4TTJZME16UTNOMk16WXpka05EWXlORE14TWpnd016RTNOamM1T1RSbE9UWTVaR1JsWkRJd01qVTBZakUzTURNeE9UQTBZZyIsImtpZCI6Ill6WXpZMk01WldZM1ltUXhNMlkwTXpRM04yTXpZemRrTkRZeU5ETXhNamd3TXpFM05qYzVPVFJsT1RZNVpHUmxaREl3TWpVMFlqRTNNRE14T1RBMFlnX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIyMGRjNWQ4MS1iOTJjLTRjZDItODBkNy1mODk4YWQzYjAyZjYiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwicm9sZXMiOiJldmVyeW9uZSIsImlzcyI6Imh0dHBzOlwvXC9hcGkuYXNnYXJkZW8uaW9cL3RcL2ludGVybnNcL29hdXRoMlwvdG9rZW4iLCJncm91cHMiOlsiRGlnaUdyYW1hMi1Vc2VycyJdLCJuaWMiOiIxMjMxMjMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJBbm9zaGFuSiIsImdpdmVuX25hbWUiOiJBbm9zaGFuIiwidXNlcmlkIjoiMjBkYzVkODEtYjkyYy00Y2QyLTgwZDctZjg5OGFkM2IwMmY2IiwiY2xpZW50X2lkIjoiWUdtdUpPckVjSTVmV1B6QWMwaXBfMFZCa0NBYSIsImF1ZCI6WyJZR211Sk9yRWNJNWZXUHpBYzBpcF8wVkJrQ0FhIiwiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCJdLCJuYmYiOjE3MDI5ODYyNTQsImF6cCI6IllHbXVKT3JFY0k1ZldQekFjMGlwXzBWQmtDQWEiLCJvcmdfaWQiOiJjZjNhNDE3Ni01NGM5LTQ1NDctYmNkNi1jNmZlNDAwYWQwZDgiLCJzY29wZSI6ImFkZHJlc3MgZW1haWwgZ3JvdXBzIG9wZW5pZCBwcm9maWxlIHJvbGVzIiwiZ3JhbWFfZGl2aXNpb24iOiJLYW5keSIsImV4cCI6MTcwMjk4NzE1NCwib3JnX25hbWUiOiJpbnRlcm5zIiwiaWF0IjoxNzAyOTg2MjU0LCJmYW1pbHlfbmFtZSI6IkoiLCJqdGkiOiJkYzk4NzQ1MC03YWI2LTRjMzYtYWZjZi01MDY4Njk0MGYyY2YiLCJlbWFpbCI6ImFub3NoYW5Ad3NvMi5jb20iLCJ1c2VybmFtZSI6ImFub3NoYW5Ad3NvMi5jb20ifQ.Ouv_E3Eo0F502rCkD7GHVQtG_WZaKovaXChH2N8QFMaZEFPhJq3RThMYzPWLOGYz8S778Sh5Xz_kZHfqcRyS9IgTGlHp5-IePI-mKqiM3v3I1AhQ05XfuaVXRBeQAlGv2Fuw4HSXNvP5jFFaYij1QuumqM3LTRFE8mjOJfqWBT01JxyNTf6TpWhjZ9Zu3ApggJ9_a87gPVLGh-t8Vww8KK5vCnhWuU70N0_eeqQ2NM2eUMUfRHNWWpUI9PPtREnyUM5RBLLF1nDlOkEvOK7gxord0HAlu4fbCYpzarOb3J-i800MZf6_Q9wDLvSeilIj_FZQKWItQjdxkYJugwYilA";
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
          placeholder={idToken.NIC || "NIC"}
          value={nic}
          onChangeText={setNic}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder={idToken.email || "Email"}
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
