import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log('User does not exist');
        }
      });
  }, []);

  const navigateToMyBills = () => {
    navigation.navigate('Home'); // Replace 'MyBills' with the name of your IndexScreen in your navigation stack.
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hello, {name.firstName}</Text>
      <TouchableOpacity onPress={navigateToMyBills} style={styles.button}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>My Bills</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => firebase.auth().signOut()} style={styles.button}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
  },
});

export default Dashboard;
