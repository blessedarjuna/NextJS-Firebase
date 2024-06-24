import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';

const profileSchema = Yup.object({
    //name:Yup.string().nullable(),
    name:Yup.string().required("Please enter your name"),
    photo:Yup.string().nullable()
});

// export const profileValidation = () => useForm({
//     resolver:yupResolver(profileSchema)
// });

const profilePasswordSchema = Yup.object({
    //password:Yup.string().nullable(),   
    password: Yup.string().min(6, "Please enter a minimum of 6 characters for the password.").required("Please fill this field"),
});

// export const ProfilePasswordValidation = () => useForm({
//     resolver:yupResolver(profilePasswordSchema)
// });

// const profileSchema =Yup.object({
//     name:Yup.string().required("Please enter your name"),
//     photo:Yup.string().nullable(),
//     email:Yup.string().email("Please enter Valid email").required("please fill this field"),
//     password: Yup.string().min(6, "Please enter a minimum of 6 characters for the password.").required("Please fill this field"),
//     cnfpassword: Yup.string().required("Please fill this field").oneOf([Yup.ref('password')],"Enter Password not matched.")
// });

export const useProfileValidation = () => {
    return useForm({
        resolver: yupResolver(profileSchema)
    });
};
export const useProfilePasswordValidation = () => {
    return useForm({
        resolver: yupResolver(profilePasswordSchema)
    });
};