import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import SignUp from "../../components/signup/SignUp";
import SignIn from "../../components/signin/SignIn";
import Dashboard from "../../components/dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/sign_up" />,
    },
    {
        path: '/sign_up',
        element: <SignUp />,
    },
    {
        path: '/sign_in',
        element: <SignIn />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
]);

export default router;
