import { useState } from "react";
import { Box, IconButton, Typography, Divider } from "@mui/material";
import { Close } from "@mui/icons-material";
import useSxStyles from "../hooks/useSxStyles"
import SlidingPanel from "./SlidingPanel";

const Settings = () => {
  const [isSettingsOpened, setIsSettingsOpened] = useState(false);
  const headerStyles = useSxStyles().header;
  const styles = useSxStyles().settings;

  return (
    <>
      <IconButton sx={headerStyles.iconButton} onClick={() => setIsSettingsOpened(!isSettingsOpened)}>
        <Settings />
      </IconButton>
      {/* <IconButton LinkComponent={RouterLink} sx={styles.headerIconButton}>
        <Equalizer />
      </IconButton> */}

      {/* SETTINGS PANEL */}
      <SlidingPanel isOpened={isSettingsOpened} setIsOpened={setIsSettingsOpened}>
        <Box sx={styles.settingsPanel}>
          <Box sx={styles.settingsPanelTop}>
            <Typography sx={styles.title} variant="h3">
              Настройки
            </Typography>
            <IconButton sx={styles.closeBtn} onClick={() => setIsSettingsOpened(false)}>
              <Close />
            </IconButton>
          </Box>

          <Divider />

        </Box>
      </SlidingPanel>
    </>
  )
}

export default Settings;
