import React, { useState } from 'react'
import { login, loginWithEmailAndPassword, signUpWithEmailAndPassword } from '../utils/api/auth';
import { Link, Navigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
const provider = new GoogleAuthProvider();
const auth = getAuth();

export default function Login({ user, setUser, islogin, setLoading }) {

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setError] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (islogin) {
                const res = await loginWithEmailAndPassword(formData.email, formData.password);
                setLoading(true);
                setUser(res);
            } else {
                const res = await signUpWithEmailAndPassword(formData.email, formData.password);
                setLoading(true);
                setUser(res)
            }
        } catch (error) {
            setError(error);
        }
    }
    const loginWithEmail = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                setLoading(true);
                const res = await login(result);
                setUser(res);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
            })
    }
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    if (user) {
        return <Navigate to={'/'} />
    }
    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:w-1/2 px-8 md:px-16">
                    {islogin ?
                        <h2 className="font-bold text-2xl text-[#002D74]">Login</h2> :
                        <h2 className="font-bold text-2xl text-[#002D74]">Create Account</h2>
                    }
                    {errors &&
                        <div className="bg-red-100 border border-red-400 text-red-700 px-1 py-1 rounded text-xs" role="alert">
                            <span className="block sm:inline">{errors}</span>
                        </div>
                    }

                    <form onSubmit={submitHandler} className="flex flex-col gap-4">
                        <input onChange={changeHandler} required className="p-2 mt-8 rounded-xl border" type="email" name="email" value={formData.email} placeholder="Email" />
                        <input onChange={changeHandler} required minLength={8} className="p-2 rounded-xl border w-full" type="password" name="password" value={formData.password} placeholder="Password" />
                        <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">{islogin ? "Login" : "Sign Up"}</button>
                    </form>

                    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-400" />
                    </div>

                    <button onClick={loginWithEmail} className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                        <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                        Login with Google
                    </button>

                    {islogin && <div className="mt-5 text-xs py-4 text-[#002D74]">
                        Forgot your password ? <Link to="/reset" className='underline'>Reset password</Link>
                    </div>}
                    <div className="mt-2 text-xs text-[#002D74]">
                        {islogin ?
                            <p>Dont't have Account ? <Link onClick={() => { setFormData({ email: "", password: "" }); setError(null) }} to={'/signup'} className='underline'>Sign Up</Link></p>
                            : <p>Already have account ? <Link onClick={() => { setFormData({ email: "", password: "" }); setError(null) }} to={'/login'} className='underline'>Login</Link></p>
                        }
                    </div>
                </div>

                <div className="md:block hidden w-1/2">
                    <img alt='' className="rounded-2xl h-[30rem]" src="https://images.unsplash.com/photo-1692158961403-4d2a98e9878e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80" />
                </div>
            </div>
        </section>
    )
}
