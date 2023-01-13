import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigation } from '@react-navigation/native';
import ForumList from "../components/ForumList";
import AddPost from "../components/AddPost";
import { Card } from "@rneui/base";

const HomeScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reRender, setReRender] = useState(false);

  const handleCallback = () => {
    setReRender(!reRender);
  }

  return (
    <AuthContext.Consumer>
      {(auth) => (

        <View style={styles.viewStyle}>

          <View style={styles.logOutStyle}>
            <Text> </Text>
            <Button
              style={styles.button}
              type="outline"
              title="Log Out"
              onPress={() => {
                auth.setIsLoggedIn(false);
              }}
            />
            <Text>                                                                                                             </Text>

            <Button
              style={styles.button}
              title="Profile"
              onPress={() => props.navigation.navigate("Profile")}
            />
            <Text> </Text>
            <Button
              style={styles.button}
              title="Add Post"
              onPress={() => {
                setModalVisible(true);
              }}
            />

            <AddPost
              visible={modalVisible}
              setVisible={setModalVisible}
              callback={handleCallback}
            />
          </View>


          <View>
            <ForumList reRender={reRender} />
          </View>
        </View>
      )}
    </AuthContext.Consumer>

  );
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: "#0081C9",
  },
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  logOutStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignItems: 'center',
    backgroundColor: "skyblue",
    height: '7%',
  },
  button: {
    marginLeft: 20,
    padding: 30,
  },
  buttonSetup: {
    flexDirection: 'column'
  }

});

export default HomeScreen;