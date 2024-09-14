import axios, { isAxiosError } from "axios";

interface RegisterUser {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}
const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function registerUser(user: RegisterUser): Promise<string> {
    const { firstName, lastName, username, email, password } = user;

    try {
        // this api endpoint registers a new user and return jwt
        const res = await axios.post(`${API_URL}/auth/register`, {
            firstName,
            lastName,
            username,
            email,
            password,
        });
        console.log(res.data);
        // set token to local storage
        localStorage.setItem("token", res.data.token);

        // redirect to homepage
        window.location.href = "/home";
        return "";
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 400) {
                return "Invalid input";
            }
            if (error.response?.status === 409) {
                return "Username or email already exists";
            }
        }
        return "Something went wrong. Please try again later.";
    }
}

interface LoginUser {
    emailUsername: string;
    password: string;
}

export async function loginUser(user: LoginUser): Promise<string> {
    const { emailUsername, password } = user;

    // Determine if emailUsername is an email or username
    const isEmail = emailUsername.includes("@");

    let body;
    if (isEmail) {
        body = { email: emailUsername, password };
    } else {
        body = { username: emailUsername, password };
    }

    try {
        const res = await axios.post(`${API_URL}/auth/login`, body);
        console.log(res.data);
        // set token to local storage
        localStorage.setItem("token", res.data.token);

        // redirect to homepage
        window.location.href = "/home";
        return "";
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 400) {
                return "Invalid input";
            }
            if (error.response?.status === 401) {
                return "Invalid credentials";
            }
        }
        return "Something went wrong. Please try again later.";
    }
}

export async function checkUsername(username: string): Promise<boolean> {
    try {
        const res = await axios.get(`${API_URL}/auth/check-username`, {
            params: { username },
        });
        return res.data.available;
    } catch (error) {
        return false;
    }
}
