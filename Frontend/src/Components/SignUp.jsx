import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import {Button, Logo, Input} from "./index"
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { api } from './Axios/axios'

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error,SetError] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const registerUser = async(e) => {
        e.preventDefault()
        try {
            const { data } = await api.post("/user/register", {
                        email,
                        password,
                        username
                    })
                    const userdata = data.data
                    if(userdata) dispatch(login(userdata));
                    console.log(userdata)
                    navigate("/")
        } catch (error) {
            SetError(error)
        }
    }
  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
    <div className="w-full max-w-lg bg-gray-900/90 backdrop-blur-xl rounded-2xl p-10 border border-gray-800 shadow-2xl">
      
      <div className="mb-6 flex justify-center">
        {/* <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
        </span> */}
      </div>

      <h2 className="text-center text-3xl font-bold text-white">
        Create your account
      </h2>

      <p className="mt-2 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-indigo-400 hover:text-indigo-300 transition hover:underline"
        >
          Sign in
        </Link>
      </p>

      {error && (
        <p className="mt-6 text-center text-sm text-red-500 bg-red-500/10 py-2 rounded-lg">
          {error}
        </p>
      )}

      <form onSubmit={registerUser} className="mt-8 space-y-5">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition duration-200 shadow-lg shadow-indigo-600/30"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
);

}

export default SignUp