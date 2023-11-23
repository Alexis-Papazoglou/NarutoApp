import React, { createContext, useContext, useState } from 'react';

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [showOnboarding, setShowOnboarding] = useState(true); // Add the showOnboarding state

    const updateShowOnboarding = (value) => { // Add the updateShowOnboarding function
        setShowOnboarding(value);
    };

    return (
        <AppStateContext.Provider
            value={{ showOnboarding, updateShowOnboarding }} // Include the showOnboarding state and updateShowOnboarding function in the context value
        >
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    const appState = useContext(AppStateContext); // Retrieve the app state from the context
    if (!appState) {
        throw new Error("useAppState must be used within an AppStateProvider"); // Throw an error if the app state is undefined
    }
    return appState;
};
