import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import {UserInfo} from '../redux/redux.interface';

interface Props {
    children: ReactElement | ReactElement[];
    user: UserInfo
}


export const PrivateRoute = ({ children, user }: Props) => {
    return (!!user.id)
        ? children
        : <Navigate to="/login"/>
};


