export interface User {
    id: number;
    email: string;
    password: string;
    password_attempt: number;
    is_blocked: boolean;
    created_at: string;
    updated_at: string;
};