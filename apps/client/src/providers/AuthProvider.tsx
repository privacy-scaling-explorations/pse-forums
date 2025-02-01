import { createContext, type JSXElementConstructor, type ReactElement, useCallback, useEffect, useMemo, useState } from "react"

type AuthData = {
    token: string;
    uid: number;
    username: string;
}

type AuthContextData = {
    auth?: AuthData;
    isSignedIn: boolean;
    setAuth: (value: AuthData) => void;
    logout: () => void;
}

const AUTH_LOCAL_STORAGE_KEY = "auth";

export const AuthContext = createContext<AuthContextData>({
    isSignedIn: false,
    setAuth: () => {},
    logout: () => {},
});

export const getAuth = (): AuthData | undefined => {
    const authJsonStr = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
    if (!authJsonStr) {
        return undefined
    }
    return JSON.parse(authJsonStr)
}

export function AuthProvider({
  children,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: necessary to match the rpsc react-query types
  children: ReactElement<any, string | JSXElementConstructor<any>> | undefined
}) {
    const [auth, setAuthImpl] = useState<AuthData>();

    const setAuth = useCallback((value: AuthData | undefined) => {
        if (!value) {
            return;
        }

        const authJsonStr = JSON.stringify(value)
        localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, authJsonStr)
        setAuthImpl(value)
    }, [])

    // Set existing auth info from local storage on mount
    useEffect(() => {
        const auth = getAuth()
        if (!auth) {
            return;
        }

        setAuthImpl(auth)
    }, [])

    // Clear all auth data, including in local storage
    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
        setAuthImpl(undefined)
    }, [])

    const isSignedIn = useMemo(() => !!auth, [auth])

    const ctxVal = useMemo(() => ({
        auth,
        isSignedIn,
        setAuth,
        logout,
    }), [auth, isSignedIn, setAuth, logout])

    return (
        <AuthContext.Provider value={ctxVal}>
            {children}
        </AuthContext.Provider>
    )
}
