import { ThemeProvider } from "@mui/material/styles";
import { AppRouter } from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import theme from "./theme/theme";
import { ApolloProvider } from '@apollo/client';
import { client } from "./gql/client";

export const App = () => {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AppRouter />
                </ThemeProvider>
            </Provider>
        </ApolloProvider>
    );
};
