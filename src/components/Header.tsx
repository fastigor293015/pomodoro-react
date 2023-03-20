import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, IconButton, Link as MUILink, Typography, Divider, useTheme, useMediaQuery } from "@mui/material";
import { LightMode, DarkMode, Equalizer, Close, Settings } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setMode } from "../features/theme/themeSlice";
import { setPlaySound } from "../features/settings/settingsSlice";
import useSxStyles from "../hooks/useSxStyles";
import { GenericIcon, EIcons } from "./GenericIcon";
import SlidingPanel from "./SlidingPanel";
import Switch from "./Switch";

const Header = () => {
  const [isSettingsOpened, setIsSettingsOpened] = useState(false);
  const settings = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isTabletScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const styles = useSxStyles().header;

  return (
    <Box sx={styles.container}>
      <MUILink component={RouterLink} to="/" sx={styles.logo}>
        <GenericIcon type={EIcons.tomato} />
        {!isMobileScreen && "pomodoro_box"}
      </MUILink>

      <Box sx={styles.right}>
        <IconButton onClick={() => dispatch(setMode())} sx={styles.iconBtn}>
          {
            theme.palette.mode === "light"
              ? <LightMode />
              : <DarkMode />
          }
        </IconButton>
        <IconButton sx={styles.iconBtn} onClick={() => setIsSettingsOpened(!isSettingsOpened)}>
          <Settings />
        </IconButton>
        {
          !isTabletScreen
            ?
            <MUILink component={RouterLink} to="/stats" sx={styles.statsLink}>
              <Equalizer />
              Статистика
            </MUILink>
            :
            <IconButton sx={styles.iconBtn} onClick={() => navigate("/stats")}>
              <Equalizer />
            </IconButton>
        }

        {/* SETTINGS PANEL */}
        <SlidingPanel isOpened={isSettingsOpened} setIsOpened={setIsSettingsOpened}>
          <Box sx={styles.settings}>
            <Box sx={styles.settingsTop}>
              <Typography sx={styles.settingsTitle} variant="h3">
                Настройки
              </Typography>
              <IconButton sx={styles.settingsCloseBtn} onClick={() => setIsSettingsOpened(false)}>
                <Close />
              </IconButton>
            </Box>

            <Divider />

            <Box sx={styles.settingsContent}>
              <Box sx={styles.settingsRow}>
                Включить уведомления
                <Switch defaultChecked={settings.playSound} onChange={() => dispatch(setPlaySound())} />
              </Box>
            </Box>
          </Box>
        </SlidingPanel>
      </Box>
    </Box>
  )
}

export default Header;
