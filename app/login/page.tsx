"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const route = useRouter();

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();  
        const result = await signIn("credentials",{
            email,
            password,
            redirect:false,
        })
        if(result?.error){
            console.log(result.error)
        }else{
            route.push("/")
        }
    }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='Emter Email' value={email} onChange={(e)=> setEmail(e.target.value)} />
        <input type='password' placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <button type='submit'>Login</button>
      </form>
      <div>
        Don't have an account ?<button onClick={()=> route.push("/register")}>Register</button>
      </div>
    </div>
  )
}

export default LoginPage
