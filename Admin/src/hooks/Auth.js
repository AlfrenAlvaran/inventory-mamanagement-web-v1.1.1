import { useCookies } from "react-cookie";

export const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const isAuthenticated = Boolean(cookies.token)

    const setAuth = (token) => {
        setCookie('token', token, { path: '/', maxAge: 24 * 60 * 60 })
    }

    const removeAuth = () => {
        removeCookie('token', { path: '/' })
    }

    return { isAuthenticated, setAuth, removeAuth }
}