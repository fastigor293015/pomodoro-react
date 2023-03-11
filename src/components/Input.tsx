import { InputBase } from "@mui/material"
import { styled } from "@mui/system";

const Input = styled(InputBase) (({ theme }) => ({
  color: "#333",
  fontSize: "16px",
  lineHeight: "17px",
  fontWeight: 300,
  "&::placeholder": {
    color: "#999999",
  }
}));

export default Input;
