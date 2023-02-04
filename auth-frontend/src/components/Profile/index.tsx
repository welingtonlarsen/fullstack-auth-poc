import { useEffect, useState } from "react"
import { IUser } from "../../context/AuthProvider/types"
import { useAuth } from "../../context/AuthProvider/useAuth"
import { Api } from "../../services/api"
import "./styles.css"
import { UserProfile } from "./types"

export const Profile = () => {
    const { logout } = useAuth()
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = await Api.get<UserProfile>("/user/me");
            setUserProfile(user.data)
        }
        fetchUserProfile();
    }, [])
    
    return(
        <>
            <table className="table">
                <tbody>
                    <tr>
                        <td>Id</td>
                        <td>{userProfile?.id}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{userProfile?.email}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{userProfile?.name}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={logout}>Logout</button>
        </>
    )
}