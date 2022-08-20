import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme/theme";
import { AppRouter } from "./routes";
import { client } from "./gql/client";

export const App = () => {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <AppRouter />
            </ThemeProvider>
        </ApolloProvider>
    );
};
