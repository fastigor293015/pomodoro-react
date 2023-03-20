import { Box } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Box)(({ theme }) => ({
  maxWidth: "1440px",
  margin: "0 auto",
  padding: "130px 80px",
  [theme.breakpoints.down("lg")]: {
    padding: "160px 40px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "120px 30px 80px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "120px 15px 80px",
  },
  [theme.breakpoints.down(500)]: {
    padding: "110px 10px 70px",
  },
}));

export default Container;
