import { useState } from "react";
import { useQuery } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RENEW, UserResponse } from "../gql";
import { Login } from "../components/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Spinner } from "../components/layout";

export const EmptyUser: UserResponse = {
    id: '',
    username: '',
    authenticated: false,
    token: ''
}


export const AppRouter = () => {
    const [user, setuser] = useState<UserResponse>(EmptyUser)

    const { loading } = useQuery<{ userRenew: UserResponse }>(RENEW, {
        context: {
            headers: {
                "x-token": localStorage.getItem('token') || ""
            }
        },
        onCompleted({ userRenew }) {
            localStorage.setItem("token", userRenew.token);
            setuser(userRenew);
        },
    });    
    
    if (loading) {
        return (
            <Spinner 
                containerProps={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
                spinnerProps={{ size: 80 }}
            />
        );
    }

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/"
                        element={<h1>Index</h1>}
                    />
                    <Route
                        path="/login"
                        element={
                            <PublicRoute user={user}>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route 
                        path="/home/*" 
                        element={
                            <PrivateRoute user={user}>
                                <h1>Privado</h1>
                            </PrivateRoute>} 
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
