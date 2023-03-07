import { Button } from "@mui/material";
import { styled } from "@mui/system";

const PrimaryButton = styled(Button) (({ theme }) => ({
  padding: "19px 50px",
  borderRadius: 0,
  textTransform: "none",
  fontSize: "16px",
  lineHeight: "17px",
  color: "#FFF",
  backgroundColor: theme.palette.green.main,
  transition: "background-color .2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.green.dark,
  }
}));

export default PrimaryButton;

