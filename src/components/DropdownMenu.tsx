import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Box, MenuList, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import useSxStyles from "../hooks/useSxStyles";

interface IDropdownMenu {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  coords: { top: number, left: number };
  children: React.ReactNode;
}

const variants: Variants = {
  initial: {
    x: "-50%",
    y: 50,
    opacity: 0,
    scale: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    y: 50,
    opacity: 0,
    scale: 0,
  }
}

const DropdownMenu = ({ isOpened, setIsOpened, coords, children }: IDropdownMenu) => {
  const [autoFocusItem, setAutoFocusItem] = useState(false);
  const styles = useSxStyles().dropdownMenu;

  useEffect(() => {
    if (!isOpened) return;
    setAutoFocusItem(true);

    const handle = () => {
      setIsOpened(false);
    }

    setTimeout(() => {
      window.addEventListener("resize", handle);
      document.addEventListener("click", handle);
    }, 10);

    return () => {
      window.removeEventListener("resize", handle);
      document.removeEventListener("click", handle);
    }
  }, [isOpened]);

  const node = document.getElementById("dropdown-root")!;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpened && <Box
        sx={styles.container}
        component={motion.div}
        variants={variants}
        key="menu"
        top={coords.top}
        left={coords.left}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <MenuList variant="selectedMenu" disablePadding autoFocusItem={autoFocusItem}>
          {children}
        </MenuList>
      </Box>}
    </AnimatePresence>,
    node
  )
}

export default DropdownMenu;
