export interface User {
    _id: string;
    name: string;
    password:string;
    email: string;
    role: string;
    isVerified: boolean;
}