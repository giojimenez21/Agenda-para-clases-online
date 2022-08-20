import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { UserResponse } from "../gql";

interface Props {
    children: ReactElement | ReactElement[] | any;
    user: UserResponse
}

const PrivateRoute = ({ children, user }: Props) => {
    return (!!user.id)
        ? children
        : <Navigate to="/login"/>
};

export default PrivateRoute;


