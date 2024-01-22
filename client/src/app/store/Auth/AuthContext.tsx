import { createContext, useContext, useEffect, useState } from "react";
import agent from "../../api/agent";
import { router } from "../../router/Router";
import { UserFormValues } from "../../models/user";

interface User {
    email: string;
    token: string;
}

const AuthContext = createContext<User | {}>({});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any>(null);
    const [isLogged, setIsLogged] = useState(false);

    const login = async (email: string, password: string) => {
        try {
            const user = await agent.Account.login({
                email,
                password,
            });

            const token = user.token;

            localStorage.setItem("userToken", token);
            agent.Account.setToken(token);
            setUser(user);
            setIsLogged(true);
            router.navigate("/documents");
        } catch (error) {
            console.log("Failed to login", error);
        }
    };


    const register = async (userFormValue: UserFormValues) => {
        try {
            const user = await agent.Account.register({
                username: userFormValue.username,
                firstName: userFormValue.firstName,
                lastName: userFormValue.lastName,
                email: userFormValue.email,
                address: userFormValue.address,
                phoneNumber: userFormValue.phoneNumber,
                password: userFormValue.password,
            });

            const token = user.token;

            localStorage.setItem("userToken", token);
            agent.Account.setToken(token);
            setUser(user);
            setIsLogged(true);
            router.navigate("/documents");
        } catch (error) {
            console.log("Failed to register", error);
        }
    }

    const logout = () => {
        localStorage.removeItem("userToken");
        setUser(null);
        setIsLogged(false);
        router.navigate("/");
    };

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            agent.Account.setToken(token);
            setUser(token);
        }
    }, []);

    const value = {
        user,
        login,
        register,
        logout,
        isLogged,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context as {
        user: any;
        login: (email: string, password: string) => Promise<void>;
        register: (userFormValue: UserFormValues) => Promise<void>;
        logout: () => void;
        isLogged: boolean;
    };
};