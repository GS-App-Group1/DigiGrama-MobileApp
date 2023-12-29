// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../contexts/UserContext";
import { Picker } from "@react-native-picker/picker";
import { LoadingIndicator } from "../components/LoadingIndicator";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import styles from "../styles/ApplyCertStyles";
import axios from "axios";

import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export const ApplyCert = () => {
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [civilStatus, setCivilStatus] = useState("Single");
  const [presentOccupation, setPresentOccupation] = useState("");
  const [reason, setReason] = useState("");
  const [gsDivision, setGsDivision] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [idToken, setIdToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({
    address: "",
    gsDivision: "",
    civilStatus: "",
    presentOccupation: "",
    reason: "",
    image: "",
  });

  const validateFields = () => {
    let newErrors = {};
    let isValid = true;

    if (address.trim() === "") {
      newErrors.address = "*Address is required";
      isValid = false;
    }

    if (gsDivision.trim() === "") {
      newErrors.gsDivision = "*GS Division is required";
      isValid = false;
    }

    if (civilStatus.trim() === "") {
      newErrors.civilStatus = "*Civil Status is required";
      isValid = false;
    }

    if (presentOccupation.trim() === "") {
      newErrors.presentOccupation = "*Present Occupation is required";
      isValid = false;
    }

    if (reason.trim() === "") {
      newErrors.reason = "*Reason is required";
      isValid = false;
    }

    if (image === null) {
      newErrors.image = "*NIC Image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

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
  }, [accessToken]);
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
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    } else if (result.canceled) {
      alert("You have cancelled the image picker!");
    } else {
      alert("Something went wrong!");
    }
  };

  const takePhoto = async () => {
    // Ask for camera permissions first
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
      console.log(result.uri);
    } else if (result.canceled) {
      alert("You have cancelled the camera!");
    } else {
      alert("Something went wrong!");
    }
  };

  const uploadImage = async (imageUri, requestID) => {
    try {
      const url =
        "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/hbld/nicimageapi-nzr/nicimagesapi-50f/v1.0/upload";

      // Fetching the image and converting to blob
      const imageResponse = await fetch(imageUri);
      if (!imageResponse.ok) {
        throw new Error("Error fetching image");
      }
      const blob = await imageResponse.blob();
      // Axios request configuration
      const config = {
        // params: { requestID: requestID }, // Append requestID as a query parameter
        method: "post",
        maxBodyLength: Infinity,
        url: url + "?requestID=" + encodeURIComponent(requestID),
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + accessToken,
          "Content-Type": "image/jpeg", // Ensure correct content type for FormData
        },
        data: blob,
      };
      const response = await axios(config);
      if (response.status === 201 || response.status === 200) {
        console.log(config.url);
        console.log("Upload successful:", response.data);
      } else {
        console.error("Upload failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Unable to connect to the server.");
    }
  };
  const handleSubmit = async () => {
    if (validateFields()) {
      setIsLoading(true); // Start loading
      const formData = {
        _id: new Date().toISOString(),
        nic: idToken.nic,
        email: idToken.email,
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
      try {
        const uploadStatus = await uploadImage(image, formData._id); // Upload the image
        console.log(uploadStatus);
        const response = await fetch(
          "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-prod.e1-us-east-azure.choreoapis.dev/hbld/mainservice-tcf/mainapi-bf2/v1/userRequest",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken, // Replace with your actual API Key
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.status != 202) {
          try {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            Alert.alert(
              "Error",
              jsonResponse.message || "Something went wrong."
            );
            // Process jsonResponse
          } catch (error) {
            console.error("Error parsing JSON:", error);
            Alert.alert("Error", "Unable to connect to the server.");
          }
        } else {
          console.log(formData);
          Alert.alert("Success", "Application submitted successfully!");
          navigation.navigate("UserHome");
        }
      } catch (error) {
        // Handle network errors
        console.log(error);
      } finally {
        setIsLoading(false); // End loading
      }
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
          style={[
            styles.input,
            { backgroundColor: "#e0f2f1", color: "darkslategray" },
          ]}
          placeholder={idToken.nic || "NIC"}
          value={idToken.nic}
          onChangeText={setNic}
          autoCapitalize="none"
          editable={false} // This makes the TextInput not editable
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: "#e0f2f1", color: "darkslategray" },
          ]}
          placeholder={idToken.email || "Email"}
          value={idToken.email}
          onChangeText={setEmail}
          autoCapitalize="none"
          editable={false} // This makes the TextInput not editable
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          autoCapitalize="none"
        />
        {errors.address ? (
          <Text style={styles.errorText}>{errors.address}</Text>
        ) : null}

        <Text style={styles.label}>GS Division</Text>
        <TextInput
          style={styles.input}
          placeholder="GS Division"
          value={gsDivision}
          onChangeText={setGsDivision}
          autoCapitalize="none"
        />
        {errors.gsDivision ? (
          <Text style={styles.errorText}>{errors.gsDivision}</Text>
        ) : null}

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
        {errors.civilStatus ? (
          <Text style={styles.errorText}>{errors.civilStatus}</Text>
        ) : null}

        <Text style={styles.label}>Present Occupation</Text>
        <TextInput
          style={styles.input}
          placeholder="Present Occupation"
          value={presentOccupation}
          onChangeText={setPresentOccupation}
          autoCapitalize="none"
        />
        {errors.presentOccupation ? (
          <Text style={styles.errorText}>{errors.presentOccupation}</Text>
        ) : null}
        <Text style={styles.label}>Reason</Text>
        <TextInput
          style={styles.input}
          placeholder="Reason"
          value={reason}
          onChangeText={setReason}
          autoCapitalize="none"
        />
        {errors.reason ? (
          <Text style={styles.errorText}>{errors.reason}</Text>
        ) : null}
        <Text style={styles.label}>NIC Image</Text>
        {errors.image ? (
          <Text style={styles.errorText}>{errors.image}</Text>
        ) : null}
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, marginTop: 10 }}
          />
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              {
                flex: 1,
                marginRight: 10,
                marginLeft: 20,
                backgroundColor: "lightgreen",
              }, // Added marginRight for spacing
            ]}
            onPress={pickImage}
          >
            <Text
              style={[styles.buttonText, { fontSize: 16, fontStyle: "normal" }]}
            >
              Pick an Image
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buttonContainer,
              { flex: 1, marginRight: 20, backgroundColor: "lightgreen" }, // Changed from alignContent to alignItems
            ]}
            onPress={takePhoto}
          >
            <Text
              style={[styles.buttonText, { fontSize: 16, fontStyle: "normal" }]}
            >
              Take a Photo
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ApplyCert;
