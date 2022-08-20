import { Route, Routes } from "react-router-dom";

export const AdminRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<h1>admin</h1>} />
                <Route path="/test" element={<h1>admin</h1>} />
            </Routes>
        </div>
    );
};
