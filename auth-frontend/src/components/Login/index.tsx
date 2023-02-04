import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const auth = useAuth();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const authenticated = await auth.authenticate(email, password);
            authenticated ? navigate('/profile') : alert('Invalid email or password');
        } catch (error) {
            alert('Internal server error!')
        }
    }

    function handleSignUp() {
        navigate('/signup')
    }

    return(
        <>
            <h2>Login</h2>
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Sign in</button>
            </form>
            <button type="button" onClick={handleSignUp}>Sign up</button>
        </>
    )
}