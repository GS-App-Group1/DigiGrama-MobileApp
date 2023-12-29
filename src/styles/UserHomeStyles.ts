import { StyleSheet } from "react-native";

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
      width: 300, // Adjust width as necessary
      height: 300, // Adjust height as necessary
      resizeMode: "contain",
      margin: 20,
    },
    text: {
      fontSize: 20,
      textAlign: "center",
      margin: 10,
      fontWeight: "bold",
    },
    // Add additional styles as necessary
  });

  export default styles;