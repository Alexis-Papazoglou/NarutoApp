import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from '../firebase'; // adjust the path as needed

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [isAppLoading, setIsAppLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showOnboarding, setShowOnboarding] = useState(null);

    useEffect(() => {
        setIsAppLoading(true);
        const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(async (user) => {
            if (user) {
                // User is signed in.
                setUser(user);
                setIsLoggedIn(true);
                setShowOnboarding(false);
                await AsyncStorage.setItem('user', JSON.stringify(user));
            } else {
                // No user is signed in.
                setShowOnboarding(true);
            }
            setIsAppLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const updateShowOnboarding = async (value) => {
        setShowOnboarding(value);
        await AsyncStorage.setItem('showOnboarding', JSON.stringify(value));
    }

    const updateIsLoggedIn = async (value) => {
        setIsLoggedIn(value);
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(value));
    }

    const updateUser = async (user) => {
        setUser(user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
    }

    return (
        <AppStateContext.Provider value={{ showOnboarding, updateShowOnboarding, isLoggedIn, updateIsLoggedIn, user, updateUser, isAppLoading }}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    const appState = useContext(AppStateContext);
    if (!appState) {
        throw new Error("useAppState must be used within an AppStateProvider");
    }
    return appState;
};