import React, { createContext, useContext, useState } from 'react';

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('Random User');

    const updateShowOnboarding = (value) => {
        setShowOnboarding(value);
    }

    const updateIsLoggedIn = (value) => {
        setIsLoggedIn(value); // Add this line
    }

    const updateUsername = (value) => {
        setUsername(value); // Add this line
    }

    return (
        <AppStateContext.Provider value={{ showOnboarding, updateShowOnboarding, isLoggedIn, updateIsLoggedIn, username, updateUsername }}>
            {children}
        </AppStateContext.Provider>
    );
}

export const useAppState = () => {
    const appState = useContext(AppStateContext); // Retrieve the app state from the context
    if (!appState) {
        throw new Error("useAppState must be used within an AppStateProvider"); // Throw an error if the app state is undefined
    }
    return appState;
};
