"use client";
import { useEffect, useState } from "react";
import Form from "@/app/crm/form";
import { collection, DocumentData, getDocs,query, where, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { db } from "@/services/firebase";
import SubmitButton from "@/components/Button";
import { updatePassword, validatePassword } from "firebase/auth";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export default function Home() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [modifyingId, setModifyingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: Partial<Customer> }>({});
  const [editableFields, setEditableFields] = useState<{ [key: string]: boolean }>({});

  const fetchDocs = async () => {
    setLoading(true);
    const collectionRef = collection(db, "Users");
    const docs = await getDocs(collectionRef);
    const customersData: Customer[] = [];
    docs.forEach((doc) => {
      customersData.push({ id: doc.id, ...doc.data() } as Customer);
    });
    setCustomers(customersData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDocs();
  }, []);
  const validateName = (name: string): string | null => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name should be at least 3 characters long";
    return null;
  };

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    if (!phone) return "Phone number is required";
    const phoneRegex = /^\d{10}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Phone number should be at exactly 10 digits";
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password should be at least 6 characters";
    return null;
  };

  const validateFields = (customer: Customer): Partial<Record<keyof Customer, string>> => {
    const nameError = validateName(customer.name);
    const emailError = validateEmail(customer.email);
    const phoneError = validatePhone(customer.phone);
    const passwordError = validatePassword(customer.password);

    return {
      name: nameError !== null ? nameError : undefined,
      email: emailError !== null ? emailError : undefined,
      phone: phoneError !== null ? phoneError : undefined,
      password: passwordError!== null ? passwordError : undefined,
    };
  };

  const hasErrors = (errors: Partial<Record<keyof Customer, string>>) => {
    return !!(errors.name || errors.email || errors.phone ||errors.password);
  };

  const onDeleteHandler = async (id: string) => {
    const docRef =doc(db, "Users", id);
    try {
      setModifyingId(id);
      setLoading(true);
    await deleteDoc(docRef);
    setLoading(true);
    //await fetchDocs(); //for locally deleted documents
    const newCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(newCustomers);
      
    } catch (error) {
    alert(error);
      
    }finally {
      setModifyingId(null);
      setLoading(false);
    }
    }
  // const onUpdateHandler = async (id: string) => {
  //   const docRef = doc(db, "Users", id);
  //   const customer = customers.find((customer) => customer.id === id);
  //   if (customer) {
  //     const { name, email, phone } = customer;
  //     const updatedCustomer = { name, email, phone };
  //     try {
  //       setLoading(true);
  //       await updateDoc(docRef, updatedCustomer);
  //       await fetchDocs();
  //       setLoading(false);
  //     } catch (error) {
  //       alert(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };
  const onUpdateHandler = async (id: string, updatedFields: Partial<Customer>) => {
    const docRef = doc(db, "Users", id);
    try {
      setLoading(true);
      await updateDoc(docRef, updatedFields);
      await fetchDocs();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      setModifyingId(null);
    }
  }
  ;
  const handleEditToggle = (customerId: string) => {
    setEditableFields((prevState) => ({
      ...prevState,
      [customerId]: !prevState[customerId],
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Customer Relationship Management</h1>
      <Form onCustomerAdded={fetchDocs} /> {/* Pass the fetchDocs function as a prop */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-4 border-b">Customer Name</th>
                <th className="text-left py-2 px-4 border-b">Customer Email</th>
                <th className="text-left py-2 px-4 border-b">Customer Phone</th>
                <th className="text-left py-2 px-4 border-b">Customer Password</th>
                <th className="text-left py-2 px-4 border-b">Customer Update</th>
                <th className="text-left py-2 px-4 border-b">Customer Delete</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {editableFields[customer.id] ? (
                      <>
                        <input
                          type="text"
                          value={customer.name}
                          onChange={(e) => {
                            const updatedName = e.target.value;
                            setCustomers((prevCustomers) =>
                              prevCustomers.map((prevCustomer) =>
                                prevCustomer.id === customer.id ? { ...prevCustomer, name: updatedName } : prevCustomer
                              )
                            );
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              [customer.id]: { ...prevErrors[customer.id], name: validateName(updatedName) ||undefined },
                            }));
                          }}
                          className={`w-full p-1 border ${errors[customer.id]?.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors[customer.id]?.name && <p className="text-red-500 text-sm">{errors[customer.id]?.name}</p>}
                      </>
                    ) : (
                      customer.name
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editableFields[customer.id] ? (
                      <>
                        <input
                          type="email"
                          value={customer.email}
                          onChange={(e) => {
                            const updatedEmail = e.target.value;
                            setCustomers((prevCustomers) =>
                              prevCustomers.map((prevCustomer) =>
                                prevCustomer.id === customer.id ? { ...prevCustomer, email: updatedEmail } : prevCustomer
                              )
                            );
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              [customer.id]: { ...prevErrors[customer.id], email: validateEmail(updatedEmail) ||undefined },
                            }));
                          }}
                          className={`w-full p-1 border ${errors[customer.id]?.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors[customer.id]?.email && <p className="text-red-500 text-sm">{errors[customer.id]?.email}</p>}
                      </>
                    ) : (
                      customer.email
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editableFields[customer.id] ? (
                      <>
                        <input
                          type="text"
                          value={customer.phone}
                          onChange={(e) => {
                            const updatedPhone = e.target.value;
                            setCustomers((prevCustomers) =>
                              prevCustomers.map((prevCustomer) =>
                                prevCustomer.id === customer.id ? { ...prevCustomer, phone: updatedPhone } : prevCustomer
                              )
                            );
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              [customer.id]: { ...prevErrors[customer.id], phone: validatePhone(updatedPhone) || undefined},
                            }));
                          }}
                          className={`w-full p-1 border ${errors[customer.id]?.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors[customer.id]?.phone && <p className="text-red-500 text-sm">{errors[customer.id]?.phone}</p>}
                      </>
                    ) : (
                      customer.phone
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editableFields[customer.id] ? (
                      <>
                        <input
                          type="password"
                          value={customer.password}
                          onChange={(e) => {
                            const updatedPassword = e.target.value;
                            setCustomers((prevCustomers) =>
                              prevCustomers.map((prevCustomer) =>
                                prevCustomer.id === customer.id ? { ...prevCustomer, password: updatedPassword } : prevCustomer
                              )
                            );
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              [customer.id]: { ...prevErrors[customer.id], password: validatePassword(updatedPassword) ||undefined },
                            }));
                          }}
                          className={`w-full p-1 border ${errors[customer.id]?.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors[customer.id]?.password && <p className="text-red-500 text-sm">{errors[customer.id]?.password}</p>}
                      </>
                    ) : (
                      customer.password
                    )}
                  </td>
                
                  <td className="py-2 px-4 border-b">
                    <SubmitButton
                      label={loading && modifyingId === customer.id ? "Updating..." : "Update"}
                      onClick={() => {
                        if (editableFields[customer.id]) {
                          const customerErrors = validateFields(customer);
                          if (!hasErrors(customerErrors)) {
                            onUpdateHandler(customer.id, customers.find((c) => c.id === customer.id) || {});
                          } else {
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              [customer.id]: customerErrors,
                            }));
                            return;
                          }
                        }
                        handleEditToggle(customer.id);
                      }}
                      disabled={loading && modifyingId !== null}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <SubmitButton
                      label={loading && modifyingId === customer.id ? "Deleting..." : "Delete"}
                      onClick={() => onDeleteHandler(customer.id)}
                      disabled={loading || modifyingId === customer.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}