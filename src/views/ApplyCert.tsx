import React, { useState } from "react";
import {
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
  // Add any additional styling as necessary
});

export const ApplyCert = () => {
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    // Logic to handle form submission
    console.log("Form data", { nic, address, civilStatus, occupation, reason });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
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
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
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
          value={occupation}
          onChangeText={setOccupation}
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
