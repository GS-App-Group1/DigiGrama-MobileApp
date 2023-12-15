import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5", // Set your desired background color
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    width: "90%", // Adjust width as necessary
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: 100, // Adjust width as necessary
    height: 100, // Adjust height as necessary
    resizeMode: "contain",
    margin: 20,
  },
  // Add additional styles as necessary
});

const UserHome = () => {
  // Define your button actions
  const applyForCertificate = () => {
    console.log("Apply for certificate");
  };

  const checkStatus = () => {
    console.log("Check status");
  };

  const getHelp = () => {
    console.log("Get help");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Images/interview.png")} // Replace 'img2.jpg' with your second image file name
        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={applyForCertificate}>
        <Text style={styles.buttonText}>Apply for grama certificate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={checkStatus}>
        <Text style={styles.buttonText}>Check status</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getHelp}>
        <Text style={styles.buttonText}>Get Help</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserHome;
