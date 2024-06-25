"use client";
import { auth } from "@/services/firebase";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, UserCredential } from "firebase/auth";

interface AuthContextType {
    user: any;
    isLogin: boolean;
    googleSignIn: () => Promise<UserCredential>;
    logOut: () => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<UserT>>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLogin: false,
    googleSignIn: async () => {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);
    },
    logOut: async () => {
        await signOut(auth);
    },
    setUser: () => {} // Placeholder, will be replaced with actual implementation
});

type UserT = {
    user: any,
    isLogin: boolean
}
type AuthProviderProps = {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState<boolean>(true)
    const initialState = {
        user: null,
        isLogin: false
    }
    const [user, setUser] = useState<UserT>(initialState);

    const googleSignIn = (): Promise<UserCredential> => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const logOut = (): Promise<void> => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userState) => {
            setUser({ isLogin: userState ? true : false, user: userState });
            setLoading(false);
        });
        return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={{ user: user.user, isLogin: user.isLogin, googleSignIn, logOut, setUser }}>
            {loading && (<div className="h-screen flex w-full justify-center items-center">Loading...</div>)}
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
