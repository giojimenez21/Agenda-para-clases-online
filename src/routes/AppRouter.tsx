import { lazy, Suspense } from "react";
import { useQuery } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PublicRoute } from "./PublicRoute";
import { cache, RENEW, UserResponse } from "../gql";
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
    const { userRenew } = cache.readQuery<{ userRenew: UserResponse }>({ query: RENEW }) || { userRenew: EmptyUser };
    const { loading, error } = useQuery<{ userRenew: UserResponse }>(RENEW, {
        context: {
            headers: {
                "x-token": localStorage.getItem("token") || "",
            },
        },
        onCompleted({ userRenew }) {
            localStorage.setItem("token", userRenew.token);
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
                                <PublicRoute user={userRenew}>
                                    <Login />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/home/*"
                            element={
                                <PrivateRoute user={userRenew}>
                                    {userRenew.authenticated ? (
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
