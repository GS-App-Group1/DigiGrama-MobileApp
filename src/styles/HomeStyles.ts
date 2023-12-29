import { StyleSheet } from 'react-native';


const homeScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 25,
      textAlign: "center",
    },
    button: {
      backgroundColor: "green",
      padding: 15,
      marginVertical: 5,
      borderRadius: 5,
      width: 300, // Adjust width as necessary
    },
    buttonText: {
      textAlign: "center",
      color: "white",
      fontWeight: "bold",
    },
    signInBtn: {
      elevation: 8,
      width: 250,
      marginTop: 25,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: "rgb(80,201,46)",
      borderRadius: 25,
      cursor: "pointer",
    },
    signInBtnText: {
      textAlign: "center",
      color: "white",
      fontSize: 20,
    },
    logoImage: {
      height: 100,
      width: "70%",
      resizeMode: "contain",
    },
    mainImage: {
      // Add styles for your images
      width: "70%",
      height: 200, // Adjust as needed
      resizeMode: "contain",
    },
    additionalText: {
      // Styles for the additional text
      fontSize: 16,
      marginVertical: 10,
      textAlign: "center",
    },
    welcomeText: {
      // Styles for the welcome text
      fontSize: 20,
      marginVertical: 10,
      textAlign: "center",
      fontWeight: "bold",
    },
  });

  export default homeScreenStyles;