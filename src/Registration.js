import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import firebase from '../config';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const registerUser = async (email, password, firstName, lastName) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        return firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: 'https://test-436b9.firebaseapp.com',
        });
      })
      .then(() => {
        alert('Verification email sent');
      })
      .catch((error) => {
        alert(error.message);
      })
      .then(() => {
        return firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
            firstName: firstName,
            lastName: lastName,
            email: email,
          });
      })
      .catch((error) => {
        alert(error.message);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 23 }}>Register Here!!</Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity onPress={() => registerUser(email, password, firstName, lastName)}>
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    margin: 10,
  },
});

export default Registration;
