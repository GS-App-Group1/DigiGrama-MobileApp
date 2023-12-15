/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "./src/contexts/UserContext";
import { DashboardScreen } from "./src/views/Dashboard";
import { HomeScreen } from "./src/views/Home";
import UserHome from "./src/views/UserHome";
import ApplyCert from "./src/views/ApplyCert";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {isLoggedIn ? (
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
          ) : (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "",
                headerShown: false,
              }}
            />
          )}
          <Stack.Screen name="UserHome" component={UserHome} />
          <Stack.Screen name="ApplyCert" component={ApplyCert} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
