import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "./src/contexts/UserContext";
import { HomeScreen } from "./src/views/Home";
import UserHome from "./src/views/UserHome";
import ApplyCert from "./src/views/ApplyCert";
import CheckStatus from "./src/views/CheckStatus";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {false ? (
            <Stack.Screen name="Dashboard" component={UserHome} />
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
          <Stack.Screen
            name="UserHome"
            component={UserHome}
            options={{ title: "User Home" }}
          />
          <Stack.Screen
            name="ApplyCert"
            component={ApplyCert}
            options={{ title: "Apply Certificate" }}
          />
          <Stack.Screen
            name="CheckStatus"
            component={CheckStatus}
            options={{ title: "Check Status" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
