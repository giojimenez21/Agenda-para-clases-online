import { lazy, Suspense, useState } from "react";
import { useQuery } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PublicRoute } from "./PublicRoute";
import { RENEW, UserResponse } from "../gql";
import { Spinner } from "../components/layout";
import { NotAuthorizedRoutes } from "./NotAuthorizedRoutes";
import { AdminRoutes } from "./AdminRoutes";

const PrivateRoute = lazy(() => import("./PrivateRoute"));
const Login = lazy(() => import("../components/auth/Login"));

export const EmptyUser: UserResponse = {
    id: "",
    username: "",
    authenticated: false,
    token: "",
};

export const AppRouter = () => {
    const [user, setuser] = useState<UserResponse>(EmptyUser);

    const { loading } = useQuery<{ userRenew: UserResponse }>(RENEW, {
        context: {
            headers: {
                "x-token": localStorage.getItem("token") || "",
            },
        },
        onCompleted({ userRenew }) {
            localStorage.setItem("token", userRenew.token);
            setuser(userRenew);
        },
    });

    if (loading) {
        return (
            <Spinner
                containerProps={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
                spinnerProps={{ size: 80 }}
            />
        );
    }

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Suspense
                fallback={
                    <Spinner
                        containerProps={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                        }}
                        spinnerProps={{ size: 80 }}
                    />
                }
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<h1>Index</h1>} />
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
                                    {user.authenticated ? (
                                        <AdminRoutes />
                                    ) : (
                                        <NotAuthorizedRoutes />
                                    )}
                                </PrivateRoute>
                            }
                        />
                        <Route path="*" element={<h1>Not found</h1>} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </div>
    );
};
