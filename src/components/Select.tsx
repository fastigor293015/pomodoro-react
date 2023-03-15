import { Select as MuiSelect, useTheme } from "@mui/material";
import type { SelectProps } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const Select = (props: SelectProps) => {
  const { palette } = useTheme();

  return (
    <MuiSelect
      {...props}
      fullWidth
      SelectDisplayProps={{
        style: {
          minHeight: "auto",
          padding: "19px 50px 19px 15px",
          borderRadius: 0,
          fontSize: "16px",
          lineHeight: "17px",
          color: "#333",
          backgroundColor: palette.gray.F4,
        },
      }}
      MenuProps={{
        transformOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        sx: {
          "& .MuiPaper-root": {
            borderRadius: 0,
            boxShadow: "0px 10px 63px rgba(0, 0, 0, 0.07)",
            bgcolor: palette.gray.F4,
            transform: "translateY(50px)",
          },
          "& .MuiList-root": {
            p: 0,
          },
          "& .MuiList-root > li": {
            p: "19px 15px",
            borderTop: `1px solid ${palette.gray.DE}`,
            fontSize: "16px",
            lineHeight: "17px",
            color: "#333",
          },
          "& .MuiList-root > li.Mui-selected": {
            display: "none",
            pointerEvents: "none",
          }
        }
      }}
      IconComponent={ExpandMore}
      sx={{
        maxWidth: "370px",
        transition: "box-shadow .3s ease-in-out",
        "&.Mui-focused": {
          boxShadow: "0px 10px 63px rgba(0, 0, 0, 0.07)",
        },
        "& fieldset": {
          display: "none",
        },
        "& .MuiSvgIcon-root": {
          right: "13px",
          fontSize: "25px",
          color: palette.red.dark,
          transformStyle: "preserve-3d",
          transition: "transform .2s ease-in-out",
        },
        "& .css-11l30dm-MuiSvgIcon-root-MuiSelect-icon, & .css-8aemkt-MuiSvgIcon-root-MuiSelect-icon": {
          transform: "rotateX(180deg)",
        },
      }}
    >
      {props.children}
    </MuiSelect>
  )
};

export default Select;
