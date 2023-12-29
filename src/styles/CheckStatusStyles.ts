import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    labelGreen: {
      alignSelf: "flex-start",
      marginLeft: "5%",
      marginTop: 20,
      fontSize: 16,
      fontWeight: "bold",
    },
    infoGreen: {
      width: "90%",
      backgroundColor: "#e0f2f1", // Light green background
      color: "darkslategray", // Dark text color
      padding: 15,
      borderRadius: 5,
      marginTop: 5,
    },
    labelRed: {
      alignSelf: "flex-start",
      marginLeft: "5%",
      marginTop: 20,
      fontSize: 16,
      fontWeight: "bold",
    },
    infoRed: {
      width: "90%",
      backgroundColor: "#ffcccc", // Light green background
      color: "darkslategray", // Dark text color
      padding: 15,
      borderRadius: 5,
      marginTop: 5,
    },
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      alignItems: "center",
      paddingTop: 30,
      paddingBottom: 30,
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

  export default styles;