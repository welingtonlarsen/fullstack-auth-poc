export interface IUser {
    email?: string;
    access_token?: string;
}

export interface IContext extends IUser {
    authenticate (email: string, password: string): Promise<boolean>;
    logout (): void;
    isAuthenticated (): boolean;
    getUser(): IUser | null
}

export interface IAuthProvider {
    children: JSX.Element
}