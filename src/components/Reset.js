import React, { useState } from 'react'
import { resetPassword } from '../utils/api/auth'
import { Link, useNavigate } from 'react-router-dom';

export default function Reset() {
    const [email,setEmail]=useState("");
    const navigate=useNavigate();

    const resetHandler=(e)=>{
        e.preventDefault();
        try {
            resetPassword(email);
            alert("Reset Email sent to gmail");
            navigate('/login');
        } catch (error) {
            
        }

    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center h-screen px-6">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <div className="px-8 mb-4 text-center">
                            <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                        </div>
                        <form onSubmit={resetHandler} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" for="email">
                                    Email
                                </label>
                                <input required onChange={(e)=>setEmail(e.target.value)}
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Enter Email Address..."
                                    value={email}
                                />
                            </div>
                            <div className="mb-6 text-center">
                                <button
                                    className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 w-full"
                                    type="submit"
                                >
                                    Reset Password
                                </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <Link
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    to={"/login"}
                                >
                                    Login / Create Accoount
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
