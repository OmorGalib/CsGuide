import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { Input, Card } from "@rneui/themed";
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase/app";
import { TextInput } from 'react-native-gesture-handler';
import { update } from 'firebase/database';
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';

const auth = getAuth();


const Profile = (props) => {
  const [user, setUser] = useState({});
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [bio, setBio] = useState()


  useEffect(() => {
    const auth = getAuth();
    setName(auth.currentUser.displayName)
    setEmail(auth.currentUser.email)
  }, [email]);

  const _saveDetails = (name, email, bio) => {

    const auth = getAuth();

    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(() => {
      updateEmail(auth.currentUser, email).then(() => {
        alert("Successful")
      }).catch((error) => {
        alert(error.message)
      });
    }).catch((error) => {
      alert(error.message)
    });
  }

  return (
    <AuthContext.Consumer >
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
            <Text>                                                                                                                                           </Text>
            <Button
              style={styles.button}
              title="Home"
              onPress={() => props.navigation.navigate("Home")}
            />
          </View>
          <Card>
            <Text style={styles.textStyle}>Name:</Text>
            <TextInput value={name} onChangeText={setName} style={styles.textStyle2} />

            <Text style={styles.textStyle}>Email:</Text>
            <TextInput value={email} onChangeText={setEmail} style={styles.textStyle2} />

            <Text style={styles.textStyle}>Bio</Text>
            <TextInput
              onChangeText={setBio}
              style={styles.textStyle2}
              multiline={true}
              numberOfLines={4}
              value={bio}
            />
            <CardDivider />
            <View>
              <Button title='Edit' onPress={() => _saveDetails(name, email, bio)} />
            </View>
          </Card>

        </View>
      )}
    </AuthContext.Consumer>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: "#7900c9",
    height: '100%'
  },

  textStyle: {
    fontSize: 20,
  },
  textStyle2: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#9d00c9",
  },
  logOutStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignItems: 'center',
    backgroundColor:"green",
    height: '8%'
  },
  button: {
    marginLeft: 20,
    padding: 30,
    width: '20%',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#9d00c9",
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }

});

export default UserProfile;