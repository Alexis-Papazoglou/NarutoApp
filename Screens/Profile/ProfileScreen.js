import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppState } from '../../ContextProviders/AppStateProvider';  
import {FIREBASE_AUTH} from '../../firebase';  

export default function ProfileScreen() {
  const { isLoggedIn , username } = useAppState();  // Get isLoggedIn and user from global state
  const [email, setEmail] = useState('demo');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    // Use user data from Firebase auth
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      setEmail(user.email);
      setProfilePicture(user.photoURL);
    }
  }, []);

  // If the user is not logged in, show the LoginScreen
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.notLoggedText}>Not logged</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {profilePicture && (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        )}
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.username}>{username}</Text>
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
});
