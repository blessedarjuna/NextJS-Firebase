import { inputFieldT } from "@/types/FormTypes"

const InputField = ({type, name, placeholder,label, register, error}:inputFieldT) => {
    return (
        <div className="my-2 flex flex-col">
            <label className="py-1 text-md text-black/50 font-mono font-medium">
                {label}
            </label>
            <input 
                {...register(name)}
                //className="px-3 py-2 text-black border rounded-md border-black/30 placeholder:text-sm"
                className={`px-3 py-2 text-black border rounded-md placeholder:text-sm ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                type={type} 
                name={name} 
                autoComplete="off"
                placeholder={placeholder} 
                id={`field_${name}`} 
            />
            {
                error && <span className=" text-red-500 py-1">{error.message}</span>
            }
        </div>
    )
};

export default InputField;