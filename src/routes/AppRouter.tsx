import { Grid } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../components/login/Login";

export const AppRouter = () => {
    return (
        <div style={{width: "100vw",height: "100vh"}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/*" element={<h1>Home</h1>} />
                    </Routes>
                </BrowserRouter>
        </div>
    );
};
