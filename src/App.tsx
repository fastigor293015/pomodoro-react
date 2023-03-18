import { useEffect, useMemo } from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { themeSettings } from './theme';
import { useAppDispatch, useAppSelector } from './app/hooks';
import TimerPage from './scenes/TimerPage';
import StatsPage from './scenes/StatsPage';
import ErrorPage from './scenes/ErrorPage';
import { getDate, init, update } from './features/stats/statsSlice';

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
  const statsData = useAppSelector(state => state.stats.statsData);
  const date = useAppSelector(state => state.stats.date);
  const dispatch = useAppDispatch();
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  useEffect(() => {
    dispatch(update());
    if (!statsData || statsData.length === 0) dispatch(init());
  },);

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
