import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppState } from '../../ContextProviders/AppStateProvider';
import { FIREBASE_AUTH } from '../../firebase';
import { signOut } from 'firebase/auth';
import ProfilePicture from '../../Components/ProfilePicture';

export default function ProfileScreen({ navigation }) {
  const { isLoggedIn, updateIsLoggedIn, user, updateUser } = useAppState();
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    if (user) {
      setId(user.id);
      setEmail(user.email);
      setUsername(user.username);
    }
  }, [user]);

  const handleLogout = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        console.log('User signed out');
        updateIsLoggedIn(false);
        updateUser(null);
      })
      .catch((error) => {
        console.error('Sign out error', error);
      });
  };

  if (!isLoggedIn) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.notLoggedText}>Not logged</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfilePicture userId = {user.id}/>
      <View style={styles.profileContainer}>
        <Text style={styles.username}>Username : {username}</Text>
        <Text style={styles.email}>Email : {email}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  email: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  username: {
    color: 'orange',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notLoggedText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: 'orange',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});