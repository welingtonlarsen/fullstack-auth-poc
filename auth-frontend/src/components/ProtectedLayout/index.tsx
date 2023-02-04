import { useAuth } from "../../context/AuthProvider/useAuth";

export const ProtectedLayout = ({children}: { children: JSX.Element }) => {
    const auth = useAuth();

    if (!auth.isAuthenticated()) {
        return <p>You don't have access. Please, sign in before acccess the desired content.</p>
    }

    return children;
}