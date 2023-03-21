import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useSxStyles from "../hooks/useSxStyles";

interface ISlidingPanelProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const SlidingPanel = ({ isOpened, setIsOpened, children }: ISlidingPanelProps) => {
  const styles = useSxStyles().slidingPanel;

  useEffect(() => {
    if (!isOpened) return;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpened]);

  const node = document.getElementById("modal-root")!;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpened && <Box
        sx={styles.background}
        component={motion.div}
        key="sliding-panel"
        animate={{ backgroundColor: "rgba(0, 0, 0, .6)" }}
        initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        onClick={e => {
          if (e.currentTarget === e.target) setIsOpened(false);
        }}
      >
        <Box
          sx={styles.content}
          component={motion.div}
          animate={{ x: 0 }}
          initial={{ x: "100%" }}
          exit={{ x: "100%" }}
        >
          {children}
        </Box>
      </Box>}
    </AnimatePresence>,
    node
  )
}

export default SlidingPanel;
