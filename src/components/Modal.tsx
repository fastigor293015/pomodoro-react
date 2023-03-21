import { useEffect } from "react";
import ReactDOM from "react-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import useSxStyles from "../hooks/useSxStyles";

interface IModalProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const backgroundVariants: Variants = {
  initial: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  animate: {
    backgroundColor: "rgba(0, 0, 0, .6)",
  },
  exit: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
}

const contentVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
    x: "-50%",
    y: "-50%",
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
}

const Modal = ({ isOpened, setIsOpened, children }: IModalProps) => {
  const styles = useSxStyles().modal;

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
        variants={backgroundVariants}
        key="modal"
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={e => {
          if (e.currentTarget === e.target) setIsOpened(false);
        }}
      >
        <Box
          sx={styles.content}
          component={motion.div}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <IconButton sx={styles.closeBtn} onClick={() => setIsOpened(false)}>
            <CloseRounded />
          </IconButton>
          {children}
        </Box>
      </Box>}
    </AnimatePresence>,
    node
  )
}

export default Modal;
