"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import useAuthentication from "@/hooks/useAuthentication";
import { useAuth } from "@/provider/AuthProvider";
import { useProfilePasswordValidation, useProfileValidation } from "@/validationSchema/profile";
import { updatePassword, updateProfile } from "firebase/auth";
import Header from "@/components/Header";

const Profile = () => {
    useAuthentication();
    const { handleSubmit, register, formState: { errors } } = useProfileValidation();
    const { handleSubmit: passwordHandleSubmit, register: registerPassword, formState: { errors: passwordErrors } } = useProfilePasswordValidation();
    const { user }: any = useAuth();
    const router = useRouter();
    const [visibleForm, setVisibility] = useState<string | null>(null);
    const userInfo = user || null;

    // useEffect(() => {
    //     if (!user) {
    //         router.push("LOGIN_ROUTE");
    //     }
    // }, [user, router]);

    const submitForm = async ({ name, photo }: { name?: string | null, photo?: string | null }) => {
        if (userInfo && (name || photo)) {
            try {
                await updateProfile(userInfo, {
                    displayName: name || userInfo.displayName,
                    photoURL: photo || userInfo.photoURL,
                });
                console.log("Profile updated");
                setVisibility(null);
            } catch (e: any) {
                console.log("Failed to update profile", e.message);
            }
        }
    };

    const submitPasswordForm = async ({ password }: { password?: string | null }) => {
        if (password) {
            try {
                await updatePassword(userInfo, password);
                console.log("Password changed");
                setVisibility(null);
            } catch (e: any) {
                console.log("Failed to change password", e.message);
            }
        }
    };

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-yellow-400/20 via-blue-300 to-purple-400/60">
            <div className="w-1/2 rounded-md bg-white/30 shadow-lg flex flex-col">
                <div className="h-28 w-full flex justify-center items-center">
                    <span className="text-3xl text-black font-mono font-semibold bg-yellow-300 p-3 rounded-lg">Welcome Back at Phonon</span>
                </div>
                <div className="flex flex-col items-start justify-evenly w-1/2 self-center ">
                    <div className="text-black font-bold text-lg">Email: {userInfo?.email}</div>
                    <div className="text-black font-bold text-lg">Name: {userInfo?.displayName}</div>
                    <div className="text-black font-bold text-lg">Photo Url: {userInfo?.photoURL}</div>
                </div>

                <div className="flex w-full items-center justify-around my-4">
                    <span className="cursor-pointer py-1 px-2 bg-yellow-400 rounded-md" onClick={() => setVisibility("profile")}>Update Profile</span>
                    <span className="cursor-pointer py-1 px-2 bg-yellow-400 rounded-md" onClick={() => setVisibility("password")}>Change Password</span>
                </div>

                {visibleForm === 'profile' && (
                    <>
                        <div className="h-28 w-full flex justify-center items-center">
                            <span className="text-3xl text-black font-mono font-semibold bg-yellow-300 p-3 rounded-lg">Update Profile</span>
                        </div>

                        <form onSubmit={handleSubmit(submitForm)} className="h-full w-1/2 mx-auto ">
                            <InputField
                                register={register}
                                error={errors.name}
                                type="text"
                                placeholder="Enter Your Name Here..."
                                name="name"
                                label="Full Name"
                            />
                            <InputField
                                register={register}
                                error={errors.photo}
                                type="text"
                                placeholder="Enter Your Photo URL Here..."
                                name="photo"
                                label="Photo URL"
                            />
                            <SubmitButton label="Update" />
                        </form>
                    </>
                )}
                {visibleForm === 'password' && (
                    <>
                        <div className="h-28 w-full flex justify-center items-center">
                            <span className="text-3xl text-black font-mono font-semibold bg-yellow-300 p-3 rounded-lg">Change Password</span>
                        </div>
                        <form onSubmit={passwordHandleSubmit(submitPasswordForm)} className="h-full w-1/2 mx-auto ">
                            <InputField
                                register={registerPassword}
                                error={passwordErrors.password}
                                type="password"
                                placeholder="Enter Your Password Here..."
                                name="password"
                                label="Password"
                            />
                            <SubmitButton label="Update" />
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;
