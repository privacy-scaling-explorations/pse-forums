import { createContext, type JSXElementConstructor, type ReactElement, useEffect, useMemo, useState } from "react"

type AuthData = {
    token: string;
    uid: number;
    username: string;
}

type AuthContextData = {
    auth?: AuthData;
    setAuth: (value: AuthData) => void;
}

const AUTH_LOCAL_STORAGE_KEY = "auth";

export const AuthContext = createContext<AuthContextData>({
    setAuth: () => {},
});

export function AuthProvider({
  children,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: necessary to match the rpsc react-query types
  children: ReactElement<any, string | JSXElementConstructor<any>> | undefined
}) {
    const [auth, setAuth] = useState<AuthData>();

    // Set existing auth info from local storage on mount
    useEffect(() => {
        const authJsonStr = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
        if (!authJsonStr) {
            return
        }
        const auth = JSON.parse(authJsonStr)
        setAuth(auth);
    }, [])

    // Persist change to auth in local storage as a side effect
    useEffect(() => {
        if (!auth) {
            return;
        }
        const authJsonStr = JSON.stringify(auth);
        localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, authJsonStr);
    }, [auth])

    const ctxVal = useMemo(() => ({
        auth,
        setAuth,
    }), [auth])

    return (
        <AuthContext.Provider value={ctxVal}>
            {children}
        </AuthContext.Provider>
    )
}
