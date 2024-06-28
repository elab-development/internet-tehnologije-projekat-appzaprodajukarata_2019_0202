export interface User {
    email: string;
    password: string;
}

export interface AuthResponseData {
    email: string;
    userId: string;
    token: string;
    expiresIn: number;
}

