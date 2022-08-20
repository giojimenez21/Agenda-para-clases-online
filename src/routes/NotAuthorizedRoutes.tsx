import { Navigate, Route, Routes } from "react-router-dom";

export const NotAuthorizedRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/home/notAuthorized"/>} />
                <Route path="/notAuthorized" element={<h1>not</h1>} />
                <Route path="*" element={<Navigate to="/home"/>} />
            </Routes>
        </div>
    );
};
