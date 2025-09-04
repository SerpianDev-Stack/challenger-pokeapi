import { createContext, useState } from "react";
import { themeConfig } from "./themeConfig";

type ThemeName = "light" | "dark";

interface Theme {
    name: string;
    background: string;
    color: string;
    navBackground: string;
}

interface ThemeContextType {
    theme: Theme; // <- aqui tem que ser o objeto, não o nome
    toggleTheme: () => void;
}

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: themeConfig.dark,
    toggleTheme: () => { },
});

const CustomThemeProvider = ({ children }: ThemeProviderProps) => {
    const [themeName, setThemeName] = useState<ThemeName>("dark");

    const theme = themeConfig[themeName];

    const toggleTheme = () =>
        setThemeName((prev) => (prev === "dark" ? "light" : "dark"));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { CustomThemeProvider };
