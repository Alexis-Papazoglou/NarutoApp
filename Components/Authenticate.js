import { ActivityIndicator, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_APP } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { useAppState } from '../ContextProviders/AppStateProvider';
import { utilsSeperateEmailFromUsername } from '../utils';

export default function Authenticate({ handleNextSlide }) {
    const [username, setUsername] = useState('demo@gmail.com')
    const [password, setPassword] = useState('demodemo')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);  // New state variable
    const auth = getAuth(FIREBASE_APP)
    const navigation = useNavigation();
    const { updateShowOnboarding, updateIsLoggedIn, updateUsername } = useAppState();

    const handleLogin = () => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, username, password)
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
        createUserWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                handleSuccess(userCredential.user, 'create account');
            })
            .catch((error) => {
                console.log('Account creation error:', error);
                setError(error.message)
                setIsLoading(false);
            });
    }

    const handleSuccess = (user, method) => {
        if (updateShowOnboarding) {
            updateShowOnboarding(false);
        }
        updateIsLoggedIn(true);
        updateUsername(utilsSeperateEmailFromUsername(user.email));
        console.log('Success ' + method);
        navigation.navigate('Home');
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="orange" style={{ marginTop: 10 }} />  // Loading indicator
            ) : (
                <>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="darkgray"
                        value={username}
                        onChangeText={setUsername}
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
                    <TouchableOpacity onPress={handleNextSlide}>
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