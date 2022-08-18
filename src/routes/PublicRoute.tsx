import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { UserInfo } from "../redux/redux.interface";


interface Props {
    children: JSX.Element | JSX.Element[] | any
    user: UserInfo
}


export const PublicRoute = ({ children, user }: Props) => {
    return (!!user.id)
        ? <Navigate to="/home"/>
        : children
};


