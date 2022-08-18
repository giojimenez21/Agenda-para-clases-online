import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { PublicRoute } from "./PublicRoute";
import { RootState } from "../redux/store";
import { Login } from "../components/auth";

export const AppRouter = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <PublicRoute user={user}>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route path="/*" element={<h1>Home</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
