import { Link as RouterLink } from "react-router-dom";
import { Box, IconButton, Link as MUILink, useTheme } from "@mui/material";
import { LightMode, DarkMode, Equalizer } from "@mui/icons-material";
import { useAppDispatch } from "../app/hooks";
import { setMode } from "../features/theme/themeSlice";
import useSxStyles from "../hooks/useSxStyles";
import { GenericIcon, EIcons } from "./GenericIcon";

const Header = () => {
  const { palette } = useTheme();
  const styles = useSxStyles().header;
  const dispatch = useAppDispatch();

  return (
    <Box sx={styles.container}>
      <MUILink component={RouterLink} to="/" sx={styles.logo}>
        <GenericIcon type={EIcons.tomato} />
        pomodoro_box
      </MUILink>

      <Box sx={styles.right}>
        <IconButton onClick={() => dispatch(setMode())} sx={styles.themeSwitchBtn}>
          {
            palette.mode === "light"
              ? <LightMode />
              : <DarkMode />
          }
        </IconButton>
        <MUILink component={RouterLink} to="/stats" sx={styles.statsLink}>
          <Equalizer sx={{ fontSize: "26px" }} />
          Статистика
        </MUILink>
      </Box>
    </Box>
  )
}

export default Header;
