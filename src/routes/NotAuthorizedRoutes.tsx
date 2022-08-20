import { Navigate, Route, Routes } from "react-router-dom";
import { ConfirmUser } from "../components/auth";

export const NotAuthorizedRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home/notAuthorized" />} />
            <Route path="/notAuthorized" element={<ConfirmUser />} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
};
