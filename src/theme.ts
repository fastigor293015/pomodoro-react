import { PaletteMode, ThemeOptions } from "@mui/material"

export const themeSettings = (mode: PaletteMode): ThemeOptions => {
  return {
    palette: {
      mode,
      text: {
        primary: mode === "light" ? "#333" : "#FFF",
      },
      green: {
        light: "#A8B64F",
        main: "#A8B64F",
        dark: "#899441",
      },
      red: {
        light: "#EA8979",
        main: "#EE735D",
        medium: "#DC3E22",
        dark: "#B7280F",
      },
      yellow: {
        light: "#FFDDA9",
        main: "#FFAE35",
        dark: "#FFAE35",
      },
      purple: {
        light: "#DFDCFE",
        main: "#9C97D7",
        dark: "#9C97D7",
      },
      cyan: {
        light: "#C5F1FF",
        main: "#7FC2D7",
        dark: "#7FC2D7",
      },
      gray: {
        F4: mode === "light" ? "#F4F4F4" : "#E7E4E4",
        E4: "#E4E4E4",
        DE: "#DEDEDE",
        C4: "#C4C4C4",
        99: "#999999",
      }
    },
    typography: {
      fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 700,
      },
      h2: {
        fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 700,
      },
      h3: {
        fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
        fontSize: 24,
        lineHeight: 1.375,
        fontWeight: 700,
      },
      h4: {
        fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 700,
      },
      h5: {
        fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
        fontSize: 16,
        lineHeight: 1.0625,
        fontWeight: 700,
      },
      h6: {
        fontFamily: ["SFUIDisplay", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 700,
      },
    }
  }
}
