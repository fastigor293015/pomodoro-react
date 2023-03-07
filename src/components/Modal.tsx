import { Box, IconButton, useTheme } from "@mui/material";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CloseRounded } from "@mui/icons-material";
import { useEffect } from "react";

interface IModalProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = ({ isOpened, setIsOpened, children }: IModalProps) => {
  const { palette } = useTheme();

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
        component={motion.div}
        key="modal"
        position="fixed"
        zIndex="20"
        sx={{
          inset: 0,
        }}
        animate={{ backgroundColor: "rgba(0, 0, 0, .6)" }}
        initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        onClick={e => {
          if (e.currentTarget === e.target) setIsOpened(false);
        }}
      >
        <Box
          component={motion.div}
          position="absolute"
          zIndex="20"
          top="50%"
          left="50%"
          bgcolor={palette.background.default}
          boxShadow="0px 0px 20px 7px rgba(34, 60, 80, 0.2)"
          overflow="hidden"
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <IconButton sx={{ position: "absolute", top: "6px", right: "6px", color: palette.gray.C4 }} onClick={() => setIsOpened(false)}>
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
