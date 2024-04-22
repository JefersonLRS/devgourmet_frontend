import { ReactNode, createContext, useState } from "react"

type AuthContextData = {
    user: UserProps | undefined,
    isAuthenticated: boolean,
    signIn: (credentials: SignInProps) => Promise<void>
}

type UserProps = {
    id: string,
    name: string,
    email: string,
}

type SignInProps = {
    email: string,
    password: string,
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>()
    const [isAuthenticated, setIsAuthenticated] = useState(!!user)

    async function signIn(credentials: SignInProps) {
        alert('CLICOU NO LOGIN')
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider };