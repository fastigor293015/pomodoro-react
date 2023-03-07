import { Box, Button, IconButton, Link as MUILink, useTheme } from "@mui/material";
import { LightMode, DarkMode, Equalizer } from "@mui/icons-material";
import { Link, Link as RouterLink } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setMode } from "../features/theme/themeSlice";
import Icon, { EIcons } from "./Icon";

const Header = () => {
  const { palette } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <Box
      position="fixed"
      zIndex="10"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="70px"
      p="0 80px"
      boxShadow="0px 10px 63px rgba(0, 0, 0, 0.07)"
      sx={{
        backdropFilter: `blur(15px)`,
        inset: "0 0 auto 0",
        "&::before": {
          content: `""`,
          position: "absolute",
          inset: 0,
          zIndex: -1,
          bgcolor: palette.background.default,
          opacity: .65,
          transition: "opacity .2s ease-in-out",
        }
      }}
    >
      <MUILink component={RouterLink} to="/" sx={{ display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "24px", color: palette.red.medium, fontWeight: 300, textDecoration: "none" }}>
        <Icon type={EIcons.tomato} />
        pomodoro_box
      </MUILink>

      <Box display="flex" alignItems="center" gap="15px">
        <IconButton onClick={() => dispatch(setMode())} sx={{ color: palette.red.medium }}>
          {
            palette.mode === "light"
              ? <LightMode sx={{ fontSize: "25px" }} />
              : <DarkMode sx={{ fontSize: "25px" }} />
          }
        </IconButton>
        <MUILink
          component={RouterLink}
          to="/stats"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "16px",
            textDecoration: "none",
            color: palette.red.medium,
            transition: "color .2s ease-in-out",
            "&:hover": {
              color: palette.red.dark,
            }
          }}
        >
          <Equalizer sx={{ fontSize: "26px" }} />
          Статистика
        </MUILink>
        {/* <Button
          component={RouterLink}
          to="/stats"
          sx={{
            display: "inline-flex",
            alignItems: "flex-start",
            gap: "12px",
            fontSize: "16px",
            textTransform: "none",
            color: palette.red.medium,
            transition: "color .2s ease-in-out",
            "&:hover": {
              color: palette.red.dark,
            }
          }}
        >
          <Equalizer sx={{ fontSize: "26px" }} />
          Статистика
        </Button> */}
        {/* <Button LinkComponent={RouterLink} variant="text" sx={{ fontSize: "16px", color: palette.red.medium, fontWeight: 400, textTransform: "none" }}>

        </Button> */}
      </Box>
    </Box>
  )
}

export default Header;
