import { Button } from "@mui/material";
import { styled } from "@mui/system";

const OutlinedButton = styled(Button) (({ theme }) => ({
  padding: "19px 50px",
  border: `2px solid ${theme.palette.red.medium}`,
  borderRadius: 0,
  textTransform: "none",
  fontSize: "16px",
  lineHeight: "17px",
  color: theme.palette.red.medium,
  backgroundColor: "transparent",
  transitionProperty: "background-color, color, border-color",
  transitionDuration: ".2s",
  transitionTimingFunction: "ease-in-out",
  "&:hover": {
    color: "#FFF",
    backgroundColor: theme.palette.red.medium,
  },
  "&.Mui-disabled": {
    color: theme.palette.gray.C4,
    borderColor: theme.palette.gray.C4,
  }
}));

export default OutlinedButton;

