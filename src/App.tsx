import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import TimerPage from './scenes/TimerPage';
import StatsPage from './scenes/StatsPage';
import ErrorPage from './scenes/ErrorPage';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, PaletteMode, ThemeOptions, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { useAppSelector } from './app/hooks';

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

const themeSettings = (mode: PaletteMode): ThemeOptions => {
  return {
    palette: {
      mode,
      text: {
        primary: mode === "light" ? "#333" : "#FFF",
      },
      green: {
        light: "#A8B64F",
        main: "#A8B64F",
        dark: "#899441",
      },
      red: {
        light: "#EA8979",
        main: "#EE735D",
        medium: "#DC3E22",
        dark: "#B7280F",
      },
      gray: {
        F4: "#F4F4F4",
        E4: "#E4E4E4",
        C4: "#C4C4C4",
        99: "#999999",
      }
    },
    typography: {
      fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 700,
      },
      h2: {
        fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 700,
      },
      h3: {
        fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
        fontSize: 24,
        lineHeight: 1.375,
        fontWeight: 700,
      },
      h4: {
        fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 700,
      },
      h5: {
        fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
        fontSize: 16,
        lineHeight: 1.0625,
        fontWeight: 700,
      },
      h6: {
        fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 700,
      },
    }
  }
}

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
