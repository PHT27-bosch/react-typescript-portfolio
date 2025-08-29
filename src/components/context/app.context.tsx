import React, { createContext, useContext, useEffect, useState } from "react";

interface IAppContext {
    theme: ThemeTypeContext;
    setTheme: (v: ThemeTypeContext) => void;
}
type ThemeTypeContext = "light" | "dark";

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeTypeContext>(() => {
        const initialTheme = localStorage.getItem("theme") as ThemeTypeContext || "light";
        return initialTheme;
    });

    useEffect(() => {
        const mode = localStorage.getItem("theme") as ThemeTypeContext;
        if (mode) {
            setTheme(mode);
            document.documentElement.setAttribute('data-bs-theme', mode);
        }
    }, [])

    return (
        <AppContext.Provider value={{
            theme, setTheme
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useCurrentApp = () => {
    const currentAppContext = useContext(AppContext);

    if (!currentAppContext) {
        throw new Error(
            "useCurrentApp has to be used within <AppContext.Provider>"
        );
    }

    return currentAppContext;
};
