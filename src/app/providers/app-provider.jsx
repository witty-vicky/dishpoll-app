"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

const CURRENT_USER_STORAGE_KEY = "dishpoll.currentUser";

export function AppProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isHydrated, setIsHydrated] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [votesByUser, setVotesByUser] = useState({});

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json")
            .then(res => res.json())
            .then(setDishes);
    }, []);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
            if (raw) {
                setCurrentUser(JSON.parse(raw));
            }
        } finally {
            setIsHydrated(true);
        }
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        if (!currentUser) {
            localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
            return;
        }

        localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(currentUser));
    }, [currentUser, isHydrated]);

    return (
        <AppContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                isHydrated,
                dishes,
                votesByUser,
                setVotesByUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);
