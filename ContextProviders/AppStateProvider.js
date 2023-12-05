import React, { createContext, useContext, useState } from 'react';

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const updateShowOnboarding = (value) => {
        setShowOnboarding(value);
    }

    const updateIsLoggedIn = (value) => {
        setIsLoggedIn(value);
    }

    const updateUser = (user) => {
        setUser(user);
    }

    return (
        <AppStateContext.Provider value={{ showOnboarding, updateShowOnboarding , isLoggedIn, updateIsLoggedIn, user, updateUser }}>
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