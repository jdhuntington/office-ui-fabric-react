import { useContext, createContext } from 'react';
import { FluentTheme } from './theme/fluent/FluentTheme';
export const ThemeContext = createContext(FluentTheme);
export const useTheme = () => useContext(ThemeContext);
