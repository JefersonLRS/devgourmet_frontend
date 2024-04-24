import { ReactNode, createContext, useState } from "react"
import { destroyCookie } from 'nookies'
import Router from "next/router"

type AuthContextData = {
    user: UserProps | undefined,
    isAuthenticated: boolean,
    signIn: (credentials: SignInProps) => Promise<void>
    signUp: (credentials: SignUpProps) => Promise<void>
    signOut: () => void
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

function signOut() {
    try {
        // Remove user data from cookies
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }
    catch (error) {
        console.log("Error logging out user", error)
    }
}


function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>()
    const [isAuthenticated, setIsAuthenticated] = useState(!!user)

    async function signIn({ email, password }: SignInProps) {
        alert(`DADOS DO LOGIN: ${email}, ${password}`)
    }

    async function signUp({ name, email, password }: SignUpProps) {
        alert(`DADOS DO CADASTRO: ${name}, ${email}, ${password}`)
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider };