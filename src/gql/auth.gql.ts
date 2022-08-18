import { gql } from "@apollo/client";

export interface UserResponse {
    id: string;
    username: string;
    authenticated: string;
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
