import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppState } from '../../ContextProviders/AppStateProvider';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebase';
import { signOut } from 'firebase/auth';
import { collectionGroup, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import ProfilePicture from '../../Components/Profile/ProfilePicture';
import LikedAndCommented from '../../Components/Profile/LikedAndCommented';
import { AntDesign } from '@expo/vector-icons';
import { utilsCheckUsername } from '../../utils';

export default function ProfileScreen({ navigation }) {
  const { isLoggedIn, updateIsLoggedIn, user, updateUser } = useAppState();
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [newUsername, setNewUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setId(user.id);
      setEmail(user.email);
      setUsername(user.username);
    }
  }, [user]);

  useEffect(() => {
    if (!isEditing) {
      setNewUsername('');
    }
  }, [isEditing]);

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

  const handleUsernameUpdate = async () => {
    // Check if the username exists and get a new username if it does
    const checkedUsername = await utilsCheckUsername(newUsername, 'update username');
  
    if (checkedUsername === 'Username already exists') {
      Alert.alert('Error', 'Username already exists');
      return;
    }
  
    const userRef = doc(FIREBASE_DB, 'Users', id);
    updateDoc(userRef, { username: checkedUsername })
      .then(() => {
        console.log('Username updated');
        setUsername(checkedUsername);
        setIsEditing(false);
        Alert.alert('Success', 'Username updated successfully');
  
        // Update username in all user's comments
        const commentsQuery = query(collectionGroup(FIREBASE_DB, 'Comments'), where('userId', '==', id));
        getDocs(commentsQuery)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              updateDoc(doc.ref, { username: checkedUsername });
              console.log('Comment username updated');
            });
          });
      })
      .catch((error) => {
        console.error('Error updating username: ', error);
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
  } else {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ProfilePicture userId={user.id} />
        <View style={styles.profileContainer}>
          <View style={[styles.usernameContainer, { flexDirection: isEditing ? 'column' : 'row' }]}>
            <Text style={styles.usernameLabel}>Username : </Text>
            <Text style={[styles.usernameValue, { margin: !isEditing ? 0 : 5 }]}>{username}</Text>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.input}
                  value={newUsername}
                  onChangeText={setNewUsername}
                  placeholder="New username"
                  placeholderTextColor="gray"
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleUsernameUpdate}
                >
                  <Text style={styles.buttonText}>Update Username</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.usernameIcon}
                  onPress={() => setIsEditing(false)}
                >
                  <AntDesign name="close" size={14} color="black" />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.usernameIcon}
                onPress={() => setIsEditing(true)}
              >
                <AntDesign name="edit" size={14} color="black" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.emailLabel}>Email : </Text>
            <Text style={styles.emailValue}>{email}</Text>
          </View>
          <LikedAndCommented user={user} />
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
    paddingBottom: 150,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  emailContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  emailLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  emailValue: {
    color: 'orange',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  usernameLabel: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  usernameValue: {
    color: 'orange',
    fontSize: 22,
    fontWeight: 'bold',
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
  input: {
    height: 40,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  usernameContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  usernameIcon: {
    position: 'absolute',
    top: '15%',
    right: '-10%',
    backgroundColor: 'orange',
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});