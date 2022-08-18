import { createTheme, Palette, PaletteColor, ThemeOptions } from "@mui/material/styles";

interface IPalette extends Palette {
    themeText: string;
    primary: PaletteColor
    secondary: PaletteColor
    third: PaletteColor
}

interface IThemeOptions extends ThemeOptions {
    palette: IPalette;
}

const theme = createTheme({
    palette: {
        themeText: "#403834",
        primary: {
            main: "#88549d"
        },
        secondary: {
            main: "#779eb7"
        },
        third: {
            main: "#ffe142"
        },
        
    }
} as IThemeOptions);

export default theme;
