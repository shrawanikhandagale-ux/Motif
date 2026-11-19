import React from 'react';
import { ThemeProvider } from './ThemeProvider';

export interface ProvidersWrapperProps {
  children: React.ReactNode;
}

export const ProvidersWrapper: React.FC<ProvidersWrapperProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ProvidersWrapper;

