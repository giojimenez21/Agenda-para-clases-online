import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../types";

interface Props {
    children: ReactElement | ReactElement[],
    user: User
}


export const PrivateRoute = ({ children, user }: Props) => {
    return (!user.id)
        ? children
        : <Navigate to="/login"/>
};


