import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/api";
import { useCreateUser } from "../../services/useCreateUser";

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const createUser = useCreateUser();
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await createUser(name, email, password);
            navigate('/login');
        } catch (error) {
           if(error instanceof AxiosError && error.response?.status === 400) {
               alert('Invalid form data!');
           }
        }
    }    

    return(
        <>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
           
                <button type="submit">Sign up</button>
            </form>
        </>
        
    )   
}