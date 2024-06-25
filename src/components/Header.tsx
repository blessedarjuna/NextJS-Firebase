"use client";
import { HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { useAuth } from "@/provider/AuthProvider";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const {user,isLogin}:any = useAuth();
    const router = useRouter();
    const logOut = () => {
        signOut(auth).then(()=>{
            router.push(LOGIN_ROUTE);
        }).catch((e)=>{
            console.log("Logout Catch ",e.message)
        })
    }

    return (
        <header className="h-20 bg-gradient-to-br from-yellow-400/20 via-blue-300 to-purple-400/60 flex px-10 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.5)] justify-between items-center">
            <div>
                <Link href={HOME_ROUTE}>
                    <span className="font-mono text-2xl text-black font-semibold bg-yellow-300 p-2 rounded-lg cursor-pointer">Aloha</span>
                </Link>
            </div>
            <nav className="flex w-1/2 justify-between">
                {!isLogin && (
                    <>
                        <Link href={LOGIN_ROUTE}><span className="text-black cursor-pointer">Login</span></Link>
                        <Link href={REGISTER_ROUTE}><span className="text-black cursor-pointer">Register</span></Link>
                    </>
                )}
                {isLogin && (
                    <>
                        <Link href={PROFILE_ROUTE}><span className="text-black cursor-pointer">Profile</span></Link>
                        <span className="cursor-pointer text-black" onClick={logOut}>Logout</span>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;