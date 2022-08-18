import { ThemeProvider } from "@mui/material/styles";
import { AppRouter } from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import theme from "./theme/theme";

export const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <AppRouter />
            </ThemeProvider>
        </Provider>
    );
};
