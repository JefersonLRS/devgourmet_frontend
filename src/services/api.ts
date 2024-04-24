import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export function setupAPIClient(context = undefined) {

    const { signOut } = useContext(AuthContext)

    let cookies = parseCookies(context)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response
    }, (error: AxiosError) => {
        if (error.response?.status === 401) {
            //user not authenticated, should be redirected to login page
            if (typeof window !== undefined) {
                //function to logout user
                signOut();
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error)
    })

    return api;
}