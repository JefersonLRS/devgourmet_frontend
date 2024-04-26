import { ReactNode, createContext, useEffect, useState } from "react"
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from "next/router"
import { api } from "@/services/apiClient"
import { toast } from 'react-toastify'

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

export function signOut() {
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

    useEffect(() => {

        const { '@nextauth.token': token } = parseCookies()

        if (token) {
            api.get('/me').then(response => {
                const { id, name, email } = response.data
                setUser({ id, name, email })
                setIsAuthenticated(true)
            })
            .catch(() => {
                signOut()
            })
        }

    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            })
            
            const { token, id, name } = response.data
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/' // all routes have access to this cookie
            })

            setUser({ id, name, email }) //email is not returned from the api, so we use the one provided by the user
            setIsAuthenticated(true)
            api.defaults.headers['Authorization'] = `Bearer ${token}`
            toast.dark('User logged in successfully')
            Router.push('/dashboard')
        } catch (error: any) {
            toast.error(error.response.data.error)
            console.log(error.response.data.error);
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })
            Router.push('/')
            toast.dark('User created successfully')
        } catch (error: any) {
            toast.error(error.response.data.error)
            console.log(error.response.data.error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider };