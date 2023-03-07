import { Button } from "@mui/material";
import { styled } from "@mui/system";

const SecondaryButton = styled(Button) (({ theme }) => ({
  padding: "19px 50px",
  borderRadius: 0,
  textTransform: "none",
  fontSize: "16px",
  lineHeight: "17px",
  color: "#FFF",
  backgroundColor: theme.palette.red.medium,
  transition: "background-color .2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.red.dark,
  },
  // "&.Mui-disabled": {
  //   color: theme.palette.gray.C4,
  //   borderColor: theme.palette.gray.C4,
  // }
}));

export default SecondaryButton;

