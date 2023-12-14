import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [isAppLoading, setIsAppLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showOnboarding, setShowOnboarding] = useState(null);

    // Load user data from AsyncStorage
    // This useEffect is messy because i had a bug i could not fix other way
    useEffect(() => {
        const loadUserData = async () => {
            const getData = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem('user');
                    return jsonValue != null ? JSON.parse(jsonValue) : null;
                } catch (e) {
                    console.log('Context : error ->', e)
                }
            };
            const data = await getData();
            console.log('Context : data ->', data)
            if (data) {
                setUser(data);
                setIsLoggedIn(true);
                setShowOnboarding(false);
            }
            else {
                setShowOnboarding(true);
            }
        };

        loadUserData();
    }, []);


    useEffect(() => {
        if (showOnboarding !== null) {
            console.log('Context : showOnboarding ->', showOnboarding)
            setIsAppLoading(false);
        }
    }, [showOnboarding]);

    const logout = async () => {
        setUser(null);
        setIsLoggedIn(false);
        await AsyncStorage.removeItem('user');
        console.log('User logged out');
    }

    //value : true or false
    const updateShowOnboarding = (value) => {
        console.log('Context : updateShowOnboarding ->', value)
        setShowOnboarding(value);
    }

    // value : true or false
    const updateIsLoggedIn = (value) => {
        setIsLoggedIn(value);
        if (!value) {
            logout();
        }
    }

    // user: {
    //     id: string,
    //     email: string,
    //     username: string,
    // }
    const updateUser = async (user) => {
        setUser(user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
    }

    return (
        <AppStateContext.Provider value={{ showOnboarding, updateShowOnboarding, isLoggedIn, updateIsLoggedIn, user, updateUser, isAppLoading }}>
            {children}
        </AppStateContext.Provider>
    );
}

export const useAppState = () => {
    const appState = useContext(AppStateContext);
    if (!appState) {
        throw new Error("useAppState must be used within an AppStateProvider");
    }
    return appState;
};