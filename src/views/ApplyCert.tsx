import React, { useState } from "react";

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
    paddingTop: 50,
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
  // Add any additional styling as necessary
});

const LoadingIndicator = () => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={true}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>
            Submitting Grama Certificate Request...
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export const ApplyCert = () => {
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [presentOccupation, setPresentOccupation] = useState("");
  const [reason, setReason] = useState("");
  const [gsDivision, setGsDivision] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    const API_KEY =
      "eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJiNGI1ZGFmMC1jZThjLTRiODktODFjZC1jMmMyNjNiYzMyODBAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6cHJvZHVjdGlvbiIsImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJNYWluU2VydmljZSAtIE1haW5BUEkiLCJjb250ZXh0IjoiXC9jZjNhNDE3Ni01NGM5LTQ1NDctYmNkNi1jNmZlNDAwYWQwZDhcL2NxeHFcL21haW5zZXJ2aWNlXC9tYWluYXBpLWJmMlwvdjEuMCIsInB1Ymxpc2hlciI6ImNob3Jlb19wcm9kX2FwaW1fYWRtaW4iLCJ2ZXJzaW9uIjoidjEuMCIsInN1YnNjcmlwdGlvblRpZXIiOm51bGx9XSwiZXhwIjoxNzAyNjE4ODcwLCJ0b2tlbl90eXBlIjoiSW50ZXJuYWxLZXkiLCJpYXQiOjE3MDI2MTgyNzAsImp0aSI6IjdmM2Y3YTdjLWE1YzYtNGZhYy1hYTg5LTc0NzBlNzllMzdkZiJ9.DlAhI7sXlqr4vl-STFR91htW05VyPt4BwDNuG4JyHVtZh3iaRgnde1BWn2BdqqKURZ0CdjAC0jOo3MHOHj-G7Z2AtIzVCWOyh0pQR7f1w3OCRs4Ympr60FuqIDeZN_eW1U6gDAWFN0tUfu259cb_LzuRebBRWaPTObXSESu1qVyrVJzF2ZM6pp4pjFXghBtIwElOstfD-nrE8kKJQWM353BibWqeKkXXeGi-6KUtsnX9uhYH-1wEc7_ge1l9RndWUE1Oa3GUO8J1Yulvi0jYOZkVe2FlmEpSjLVYqXYkX0VhjRgl7qMTjm9oG8Fo8f_-SMtpmh0lTTV_PrvomLtRR6m4YjB6Yu7Mg0wnYoaBmZkb_QinMCIx67O68HhxmVAVNfLHlbh1NucPCPbgZjxT15resuBeWkJjdAKQ6LPwtsH-brxcJ697KLDUrb10U9k-PSBDfkpotPNyonYSJzBXBmF1NbtT3sR917-puB4a7cRF40MrBe6V9Hlyps8CnNKpDYcvmtGU-mlgcVXP6_9th4yMfY2ddTvetVeK-KMPCibRTS4oe5snPHQE2pTmb3mi0bHM4hy8RrBkvCpL6GDKunl008LOZnTO0j85OAeW_ubwe8RV93S0rEqA25y1TPqbzNROVZ40va-qqQ0ERsi_Xl5Bq3vf2GWl4tAm8nWbBi4";
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
        {isLoading && <LoadingIndicator />}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "black",
            marginBottom: 20,
          }}
        >
          DigiGrama
        </Text>
        <TextInput
          style={styles.input}
          placeholder="NIC"
          value={nic}
          onChangeText={setNic}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="GS Division"
          value={gsDivision}
          onChangeText={setGsDivision}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Civil Status"
          value={civilStatus}
          onChangeText={setCivilStatus}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Present Occupation"
          value={presentOccupation}
          onChangeText={setPresentOccupation}
          autoCapitalize="none"
        />
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
