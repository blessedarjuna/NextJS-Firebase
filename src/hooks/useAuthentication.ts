"use client";
import { LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
const GUEST_ROUTES = [LOGIN_ROUTE,REGISTER_ROUTE];

const useAuthentication = () => {
    const {user, isLogin}:any = useAuth();
    //const isLogin = user?.user || null;
    const router = useRouter();
    const currentRoute = window.location.pathname;

    useEffect(()=>{
        if(!isLogin && !GUEST_ROUTES.includes(currentRoute)){
            router.push(LOGIN_ROUTE)
        }

        if(isLogin && GUEST_ROUTES.includes(currentRoute)){
            router.push(PROFILE_ROUTE);
        }
    },[currentRoute, router, isLogin]);
    return null;

}

export default useAuthentication;