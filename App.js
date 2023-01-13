import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { AuthProvider, AuthContext } from "./src/providers/AuthProvider";

const firebaseConfig = {
  apiKey: "AIzaSyBlBOL3KLdg6yVvnSN2MtR5B83OP5rTY80",
  authDomain: "csguideapp-8ca82.firebaseapp.com",
  projectId: "csguideapp-8ca82",
  storageBucket: "csguideapp-8ca82.appspot.com",
  messagingSenderId: "921564072076",
  appId: "1:921564072076:web:89cc1e5d9f69598840d3a9"
};

if (!firebase.length) {
  firebase.initializeApp(firebaseConfig);
}

const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignUp">
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>{auth.isLoggedIn ? <HomeStackScreen /> : <AuthStackScreen />}</NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
