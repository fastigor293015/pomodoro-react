import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { themeSettings } from './theme';
import { useAppSelector } from './app/hooks';
import TimerPage from './scenes/TimerPage';
import StatsPage from './scenes/StatsPage';
import ErrorPage from './scenes/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/timer" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/timer",
    element: <TimerPage />,
  },
  {
    path: "/stats",
    element: <StatsPage />,
  }
])

function App() {
  const mode = useAppSelector(state => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
};

export default App;
