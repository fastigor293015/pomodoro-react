import { useTheme } from "@mui/material";
import styles from "../styles";

const useSxStyles = () => {
  const theme = useTheme();
  const stylesObj = styles(theme);

  return stylesObj;
}

export default useSxStyles;
