"use client";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import { PROFILE_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import Link from "next/link";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import { useLoginValidation } from "@/validationSchema/auth";
import useAuthentication from "@/hooks/useAuthentication";
import { useAuth } from "@/provider/AuthProvider";
import { UserCredential } from "firebase/auth";
import Header from "@/components/Header";


const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useLoginValidation();
    const router = useRouter();
    const { googleSignIn } = useAuth();
    useAuthentication();

    const submitForm = (values: any) => {
        signInWithEmailAndPassword(auth, values.email, values.password).then((response) => {
            router.push(PROFILE_ROUTE);
        }).catch((e) => {
            console.log("Login Error ", e.message);
            alert("Please try Again");
        });
    };

    const handleGoogleSignIn = async() => {
        try {
            await googleSignIn();
            router.push(PROFILE_ROUTE);
        } catch (e: any) {
            console.log("Google Sign-In Error", e.message);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-yellow-400/20 via-blue-300 to-purple-400/60">
            <div className="w-1/2 h-3/4 rounded-md bg-white/30 shadow-lg flex justify-between flex-col">
                <div className="h-28 w-full justify-center flex items-center">
                    <span className=" text-3xl text-black font-mono font-semibold bg-yellow-300 p-3 rounded-lg">Welcome To SignIn</span>
                </div>
                <form onSubmit={handleSubmit(submitForm)} className="h-full w-1/2 mx-auto ">
                    <InputField
                        register={register}
                        error={errors.email}
                        type="text"
                        placeholder="Enter Your Email Here..."
                        name="email"
                        label="Email"
                    />
                    <InputField
                        register={register}
                        error={errors.password}
                        type="password"
                        placeholder="Enter Your Password Here..."
                        name="password"
                        label="password"
                    />
                    <SubmitButton label="Submit" />
                </form>
                <div className="h-20 mx-auto">
                    <span className="text-sm text-gray-600">Do not have an account?
                        <Link href={REGISTER_ROUTE}><span className="text-blue-500 font-semibold text-md"> Register Here</span></Link>
                    </span>
                </div>
                <div className="h-20 mx-auto">
                    <button onClick={handleGoogleSignIn} className="text-blue-500 font-semibold text-md">Sign in with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;