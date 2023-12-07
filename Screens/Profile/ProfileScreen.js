import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppState } from '../../ContextProviders/AppStateProvider';
import { FIREBASE_AUTH } from '../../firebase';
import { signOut } from 'firebase/auth';

export default function ProfileScreen({ navigation }) {
  const { isLoggedIn, updateIsLoggedIn, user, updateUser } = useAppState();  // Get isLoggedIn and user from global state
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
        updateIsLoggedIn(false); // Update isLoggedIn in global state
        updateUser(null);
      })
      .catch((error) => {
        console.error('Sign out error', error);
      });
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.notLoggedText}>Not logged</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.buttonText}>Log In Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.email}>id : {id}</Text>
        <Text style={styles.email}>Email : {email}</Text>
        <Text style={styles.username}>Username : {username}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
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
  },
  notLoggedText: {
    color: 'white',
    fontSize: 24,
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
  },
});
