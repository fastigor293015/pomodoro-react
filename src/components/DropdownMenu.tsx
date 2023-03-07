import { Box, MenuList, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IDropdownMenu {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  coords: { top: number, left: number };
  children: React.ReactNode;
}

const DropdownMenu = ({ isOpened, setIsOpened, coords, children }: IDropdownMenu) => {
  const [autoFocusItem, setAutoFocusItem] = useState(false);
  const { palette } = useTheme();
  console.log(coords);

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
        component={motion.div}
        key="menu"
        position="absolute"
        top={coords.top}
        left={coords.left}
        zIndex="5"
        p="7px 0"
        border={`1px solid ${palette.gray.C4}`}
        bgcolor={palette.background.default}
        initial={{ x: "-50%", y: 50, opacity: 0, scale: 0 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0 }}
        sx={{
          "&::before": {
            content: `""`,
            position: "absolute",
            top: 0,
            left: "50%",
            zIndex: 1,
            display: "block",
            width: 0,
            height: 0,
            border: "7px solid transparent",
            borderBottom: `7px solid ${palette.background.default}`,
            transform: "translate(-50%, -100%)",
          },
          "&::after": {
            content: `""`,
            position: "absolute",
            top: 0,
            left: "50%",
            display: "block",
            width: 0,
            height: 0,
            border: "8px solid transparent",
            borderBottom: `8px solid ${palette.gray.C4}`,
            transform: "translate(-50%, -100%)",
          }
        }}
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
