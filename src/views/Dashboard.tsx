import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import { logout } from "react-native-app-auth";
import RNSecureStorage from "rn-secure-storage";
import { UserContext } from "../contexts/UserContext";
import { config } from "../config";
import { jwtDecode } from "jwt-decode";

export const DashboardScreen = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const [authResponse, setAuthResponse] = useState<Record<string, string>>();
  const [userInfo, setUserInfo] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  }>();

  useEffect(() => {
    RNSecureStorage.get("authorizeResponse").then(
      async (res) => {
        if (res) {
          try {
            const response = JSON.parse(res);
            console.log(response);

            const {
              given_name,
              family_name,
              email,
            }: Record<string, string | undefined> = jwtDecode(response.idToken);

            setUserInfo({
              firstName: given_name ?? "",
              lastName: family_name ?? "",
              email: email ?? "",
            });

            setAuthResponse(response);
          } catch (err) {
            throw err;
          }
        }
      },
      (err) => {
        setIsLoggedIn(false);
        console.error(err);
      }
    );
  }, [setIsLoggedIn]);

  const signOut = async () => {
    if (!authResponse?.idToken) {
      setIsLoggedIn(false);
      return;
    }

    try {
      await logout(config, {
        idToken: authResponse?.idToken,
        postLogoutRedirectUrl: config.postLogoutRedirectUrl,
      });

      RNSecureStorage.remove("authorizeResponse")
        .then((_val) => {
          setIsLoggedIn(false);
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={dashboardScreenStyles.container}>
      <Text>Hi, {userInfo?.firstName || userInfo?.email}</Text>
      <TouchableOpacity
        onPress={signOut}
        style={dashboardScreenStyles.logoutBtn}
      >
        <Text style={dashboardScreenStyles.logoutBtnText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const dashboardScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutBtn: {
    elevation: 8,
    width: 250,
    marginTop: 25,
    textTransform: "none",
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 25,
  },
  logoutBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});
