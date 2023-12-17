import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 50,
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
    Pending: "orange",
    Success: "green",
    Rejected: "red",
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
        <Text style={styles.label}>NIC</Text>
        <Text style={styles.info}>{applicationData.nic}</Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.info}>{applicationData.address}</Text>

        <Text style={styles.label}>Civil Status</Text>
        <Text style={styles.info}>{applicationData.civilStatus}</Text>

        <Text style={styles.label}>Present Occupation</Text>
        <Text style={styles.info}>{applicationData.occupation}</Text>

        <Text style={styles.label}>Reason</Text>
        <Text style={styles.info}>{applicationData.reason}</Text>

        <TouchableOpacity
          style={[
            styles.statusButton,
            { backgroundColor: statusColor[applicationData.status] },
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
