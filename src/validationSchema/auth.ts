import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const loginSchema = Yup.object({
    email:Yup.string().email("Please enter Valid email").required("please fill this field"),
    password: Yup.string().min(6, "Please enter a minimum of 6 characters for the password.").required("Please fill this field"),
})

// Create a custom hook for login validation
export const useLoginValidation = () => {
    return useForm({
        resolver: yupResolver(loginSchema)
    });
};

const registerSchema =Yup.object({
    email:Yup.string().email("Please enter Valid email").required("please fill this field"),
    password: Yup.string().min(6, "Please enter a minimum of 6 characters for the password.").required("Please fill this field"),
    cnfpassword: Yup.string().required("Please fill this field").oneOf([Yup.ref('password')],"Enter Password not matched.")
});

export const useRegisterValidation = () => {
    return useForm({
        resolver: yupResolver(registerSchema)
    });
};

// const profileSchema =Yup.object({
//     name:Yup.string().required("Please enter your name"),
//     photo:Yup.string().nullable(),
//     email:Yup.string().email("Please enter Valid email").required("please fill this field"),
//     password: Yup.string().min(6, "Please enter a minimum of 6 characters for the password.").required("Please fill this field"),
//     cnfpassword: Yup.string().required("Please fill this field").oneOf([Yup.ref('password')],"Enter Password not matched.")
// });

// export const useProfileValidation = () => {
//     return useForm({
//         resolver: yupResolver(profileSchema)
//     });
// };