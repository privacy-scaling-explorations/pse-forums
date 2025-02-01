import { AuthContext } from "p/AuthProvider";
import { useContext } from "react";

export function useAuth() {
    const authCtx = useContext(AuthContext)

    if (!authCtx) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    return authCtx
}