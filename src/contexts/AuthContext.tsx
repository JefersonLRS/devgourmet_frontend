import { ReactNode, createContext, useState } from "react"

type AuthContextData = {
    user: UserProps | undefined,
    isAuthenticated: boolean,
    signIn: (credentials: SignInProps) => Promise<void>
    signUp: (credentials: SignUpProps) => Promise<void>
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

type SignUpProps = {
    name: string,
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

    async function signUp(credentials: SignUpProps) {
        alert('CLICOU NO CADASTRO')
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider };