import { useContext, createContext } from 'react';
import { FluentTheme } from '@uifabric/fluent-theme';
export const ThemeContext = createContext(FluentTheme);
export const useTheme = () => useContext(ThemeContext);
