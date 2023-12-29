import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      alignItems: "center",
      paddingTop: 30,
      paddingBottom: 30,
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
      width: "90%",     
      backgroundColor: "#fff",
      padding: 15,
      marginBottom: 10,
      borderRadius: 5,  
      // You can add more styling as needed
    },
    errorText: {
      color: 'red',
      textAlign: 'left',
      alignSelf: 'stretch',
      marginLeft: 20,
      marginBottom: 20,
    },
  });

  export default styles;