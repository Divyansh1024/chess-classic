"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [ user, setUser ] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup = async () => {
        try {
            setLoading(true);
            try {
                const response = await axios.post("/api/users/signup", user);
                console.log('Response Status:', response.status);
                console.log('Response Data:', response.data);
              } catch (error) {
                console.error('Error:', error);
              }
              
            // const response = await axios.post("/api/users/signup", user);
            // console.log("signup success", response.data);
            router.push("/login")
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div>
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
                className="p-2 m-3 text-black"
                id="username" type="text" value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"/>
            <hr />
            
            <label htmlFor="email">email</label>
            <input 
                className="p-2 m-3 text-black"
                id="email" type="text" value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"/>
            <hr />

            <label htmlFor="password">password</label>
            <input 
                className="p-2 m-3 text-black"
                id="password" type="password" value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"/>
            <hr />

            <button className="p-2 mb-4 bg-slate-300" onClick={onSignup} >
                {buttonDisabled ? "No signup" : "Signup"}
            </button>
            <hr />
            <Link href='/login'>Visit Login Page</Link>
        </div>
    );
}