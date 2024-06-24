"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import { LOGIN_ROUTE} from "@/constants/routes";
//import Login from "@/app/login/page";
import useAuthentication from "@/hooks/useAuthentication";
import { auth } from "@/services/firebase";
import { useRegisterValidation } from "@/validationSchema/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addDoc, collection } from 'firebase/firestore'; // Adjust based on your Firestore operations
import { db } from '@/services/firebase'; // Ensure Firestore is properly initialized
import React, { useState, useEffect } from "react"; // Add this import
import { FirebaseError } from "firebase/app"; // Import FirebaseError


const Register = () => {
    const router = useRouter();
    //const [redirecting, setRedirecting] = useState(false);
    useAuthentication();
    const { handleSubmit, register, formState:{errors}, reset} = useRegisterValidation();
    const submitForm = async(values:any) => {
        console.log("Register form values",values)
        try {
            const response = await createUserWithEmailAndPassword(auth, values.email, values.password);
            console.log("Firebase user", response);
            alert("User registered successfully");
            reset();
            //setRedirecting(true);
            router.push(LOGIN_ROUTE);
        } catch (e: unknown) { // Add ': unknown' to catch block
            if (e instanceof FirebaseError) { // Check if 'e' is an instance of FirebaseError
                console.log("Error", e.message);
                alert("Something went wrong, please try again");
            } else {
                console.error("An unexpected error occurred:", e);
            }
        }
    } 
    // useEffect(() => {
    //     if (redirecting) {
    //         console.log("Redirecting to login...");
    //         router.push(LOGIN_ROUTE);
    //     }
    // }, [redirecting, router]);
    // useEffect(() => {
    //     // Additional logging to ensure we know when useAuthentication runs
    //     console.log("useAuthentication hook executed");
    // }, []);

    // if (redirecting) {
    //     return <div>Redirecting...</div>;
    // }

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-yellow-400/20 via-blue-300 to-purple-400/60">
            <div className="w-1/2 rounded-md bg-white/30 shadow-lg flex justify-between flex-col">
                <div className="h-28 w-full justify-center flex items-center">
                    <span className="text-3xl text-black font-mono font-semibold bg-yellow-300 p-3 rounded-lg">Welcome To Register</span>
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
                    <InputField
                        register={register}
                        error={errors.cnfpassword}
                        type="password"
                        placeholder="Enter Your Confirm Password Here..."
                        name="cnfpassword"
                        label="Confirm Password"
                    />
                    <SubmitButton label="Submit" />
                </form>
                <div className="h-20 mx-auto">
                    <span className="text-sm text-gray-600">Already have account? {' '} 
                        <Link href={LOGIN_ROUTE}><span className="text-blue-500 font-semibold text-md" > Login Here</span></Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Register;