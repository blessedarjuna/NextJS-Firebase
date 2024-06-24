"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

interface FormProps {
  onCustomerAdded: () => Promise<void>;
}

const Form: React.FC<FormProps> = ({ onCustomerAdded }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState({
    userName: false,
    email: false,
    phone: false,
    password: false,
  });

  const validateName = (name: string): string | null => {
    if (!name) return "Name is required";
    return null;
  };

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    const phoneRegex = /^\d{10}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Phone number should be at least 10 digits";
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password should be at least 6 characters";
    return null;
  };

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => ({
      ...prev,
      [field]: true,
    }));
    switch (field) {
      case "userName":
        setNameError(validateName(userName));
        break;
      case "email":
        setEmailError(validateEmail(email));
        break;
      case "phone":
        setPhoneError(validatePhone(phone));
        break;
      case "password":
        setPasswordError(validatePassword(password));
        break;
    }
  };

  const handleChange = (field: string, value: string) => {
    switch (field) {
      case "userName":
        setUserName(value);
        setNameError(validateName(value));
        break;
      case "email":
        setEmail(value);
        setEmailError(validateEmail(value));
        break;
      case "phone":
        setPhone(value);
        setPhoneError(validatePhone(value));
        break;
      case "password":
        setPassword(value);
        setPasswordError(validatePassword(value));
        break;
    }
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameError = validateName(userName);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);

    setNameError(nameError);
    setEmailError(emailError);
    setPhoneError(phoneError);
    setPasswordError(passwordError);

    if (nameError || emailError || phoneError || passwordError) {
      return;
    }
    let customer = {
      name: userName,
      email,
      phone,
      password,  
    };
    try {
      const collectionRef = collection(db, "Users");
      await addDoc(collectionRef, customer);
      await onCustomerAdded(); // Trigger the callback to refresh the list
      setUserName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setTouchedFields({
        userName: false,
        email: false,
        phone: false,
        password: false,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-semibold text-center mb-6">Add a User</h1>
      <form onSubmit={onSubmitHandler} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Enter name"
            value={userName}
            onChange={(e) => handleChange("userName", e.target.value)}
            //className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onBlur={() => handleBlur("userName")}
            //rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              nameError && touchedFields.userName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              emailError && touchedFields.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        <div>
          <input
            type="number"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              phoneError && touchedFields.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              passwordError && touchedFields.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 border-0 rounded-full text-white cursor-pointer inline-block text-lg font-semibold outline-none py-4 px-6 relative text-center no-underline transition-all duration-300 select-none touch-manipulation before:bg-gradient-to-b before:from-white before:to-transparent before:rounded-full before:content-[''] before:h-1/2 before:left-1 before:opacity-50 before:absolute before:top-0 before:transition-all before:duration-300 before:w-11/12 hover:shadow-inner-white-20 hover:scale-105 md:py-4 md:px-12"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
