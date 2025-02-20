import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import useUser from "./hooks/useUser";
import Register from "./pages/Register";
import Layout from "./containers/Layout";
import ForgotPassword from "./features/user/ForgotPassword";

export default function MyRoutes() {
    const { user } = useUser();
    return (
        <Routes>
            <Route index Component={Home} />
            <Route path="/auth" element={user ? <Navigate to={"/app"} /> : <AuthLayout />}>
                <Route index element={<Navigate to={"/auth/login"} />} />
                <Route path="login" Component={Login} />
                <Route path="register" Component={Register} />
            </Route>
            <Route path="/register" element={<Navigate to={"/auth/register"} replace />} />
            <Route path="/login" element={<Navigate to={"/auth"} replace />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
                path="/app/*"
                element={/* user ?  */ <Layout /> /*  : <Navigate to={"/auth"} replace /> */}
            />
        </Routes>
    );
}
