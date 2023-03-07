import { IconButton as MUIIconButton } from "@mui/material";
import { styled } from "@mui/system";

const IconButton = styled(MUIIconButton) (({ theme }) => ({
  width: "50px",
  height: "50px",
  color: "#FFF",
  backgroundColor: theme.palette.gray.C4,
  transition: "background-color .2s ease-in-out",
  "& > svg": {
    fontSize: "28px",
  },
  "&:hover": {
    backgroundColor: theme.palette.green.dark,
  }
}));

export default IconButton;

