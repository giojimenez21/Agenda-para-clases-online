import { Navigate } from "react-router-dom";
import { UserResponse } from "../gql";


interface Props {
    children: JSX.Element | JSX.Element[] | any
    user: UserResponse
}


export const PublicRoute = ({ children, user }: Props) => {
    return (!!user.id)
        ? <Navigate to="/home"/>
        : children
};


