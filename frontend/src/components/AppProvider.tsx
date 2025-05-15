import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';

import { store, RootState } from '../store';
import { lightTheme, darkTheme } from '../theme/theme';

// 主题切换组件
const ThemeProviderWithRedux: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode } = useSelector((state: RootState) => state.theme);
  const theme = mode === 'dark' ? darkTheme : lightTheme;
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

// 应用程序提供者
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProviderWithRedux>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ThemeProviderWithRedux>
    </Provider>
  );
};

export default AppProvider; 