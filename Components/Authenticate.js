import { ActivityIndicator, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_APP, FIREBASE_DB } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { useAppState } from '../ContextProviders/AppStateProvider';
import { utilsSeperateEmailFromUsername } from '../utils';
import { doc , getDoc, setDoc } from "firebase/firestore";

export default function Authenticate({ handleNextSlide }) {
    const [email, setEmail] = useState('demo@gmail.com')
    const [password, setPassword] = useState('demodemo')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);  // New state variable
    const auth = getAuth(FIREBASE_APP)
    const navigation = useNavigation();
    const { showOnboarding, updateShowOnboarding, updateIsLoggedIn, updateUser } = useAppState();

    const handleLogin = () => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                handleSuccess(userCredential.user, 'login');
            })
            .catch((error) => {
                console.log('Login error:', error);
                setError(error.message)
                setIsLoading(false);
            });
    }

    const handleCreateAccount = () => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Create a new user in your Users collection
                setDoc(doc(FIREBASE_DB, "Users", userCredential.user.uid), {
                    id: userCredential.user.uid,
                    email: email,
                    username: utilsSeperateEmailFromUsername(email),
                }).then(() => {
                    handleSuccess(userCredential.user, 'create account');
                }).catch((error) => {
                    console.log('Failed to create user document:', error);
                    setError(error.message)
                    setIsLoading(false);
                });
            })
            .catch((error) => {
                console.log('Account creation error:', error);
                setError(error.message)
                setIsLoading(false);
            });
    }

    const handleSuccess = async (user, method) => {
        // Get the user document from Firestore
        const docRef = doc(FIREBASE_DB, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Update the user in the global state with the Firestore user document
            updateUser(docSnap.data());
        } else {
            console.log("No such document!");
        }

        if (updateShowOnboarding) {
            updateShowOnboarding(false);
        }
        updateIsLoggedIn(true);
        console.log('Success ' + method);
        if (showOnboarding) {
            navigation.navigate('Home');
        } else {
            navigation.navigate('ProfileScreen');
        }
        setIsLoading(false);
    }

    const handleContinueAsGuest = () => {
        if (showOnboarding) {
            handleNextSlide();
        } else {
            navigation.navigate('ProfileScreen');
        }
    }

    return (
        <View style={[styles.container, !showOnboarding && { flex: 0.95 }]}>
            {isLoading ? (
                <ActivityIndicator size="large" color="orange" style={{ marginTop: 10 }} />  // Loading indicator
            ) : (
                <>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="darkgray"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor="darkgray"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={handleCreateAccount}>
                        <Text style={styles.btnText}>Create account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleContinueAsGuest}>
                        <Text style={styles.text}>Continue as guest</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 0.65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: 'white',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    btn: {
        marginTop: 20,
        backgroundColor: 'orange',
        paddingHorizontal: 40,
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
    btnText: {
        color: 'black',
        fontSize: 24,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    text: {
        marginTop: 20,
        color: 'white',
        fontSize: 20,
    },
})