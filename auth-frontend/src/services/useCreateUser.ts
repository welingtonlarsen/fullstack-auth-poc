import { Api } from "./api";

export const useCreateUser = () => {
    const createUser = async (name: string, email: string, password: string) => {
        await Api.post('/user', {name, email, password});
    }

    return createUser
}