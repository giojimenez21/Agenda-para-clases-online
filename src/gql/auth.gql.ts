import { gql } from "@apollo/client";

export interface UserResponse {
    id: string;
    username: string;
    authenticated: boolean;
    token: string;
}

export interface UserInput {
    username: string;
    password: string;
}

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            id
            username
            authenticated
            token
        }
    }
`;

export const RENEW = gql`
    query RenewToken {
        userRenew {
            id
            username
            authenticated
            token
        }
    }
`;

export interface AuthenticatedInput extends UserInput{
    newPassword: string;
}

export const AUTHENTICATED = gql`
    mutation Authenticated($input: AuthenticatedInput) {
        authenticated(input: $input) {
            id
            username
            authenticated
            token
        }
    }
`
