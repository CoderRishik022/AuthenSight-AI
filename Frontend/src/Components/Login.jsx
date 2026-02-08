import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { api } from './Axios/axios'


function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error,setError] = useState('');
    const login = async(e) => {
      e.preventDefault()
        try {
          const { data } = await api.post("/user/login", {
              email,
              password
          })
          const userdata = data?.data
          if(userdata) dispatch(authLogin(userdata));
          navigate("/")
        } catch (err) {
          setError(err)
          console.log(error)
        }
    }
  return (
  <div className="min-h-screen flex items-center justify-center bg-[#0a0c10] px-4">
  {/* Subtle Background Glow to match Hero */}
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-emerald-600/5 blur-[120px]" />
  </div>

  <div className="w-full max-w-lg bg-[#0d1117]/80 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-slate-800 shadow-2xl relative z-10">
    
    <div className="mb-8 flex flex-col items-center">
      <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
        <span className="text-black font-black text-xl">AS</span>
      </div>
      <h2 className="text-center text-3xl font-bold text-white tracking-tight">
        Welcome Back
      </h2>
      <p className="mt-3 text-center text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
        >
          Create one now
        </Link>
      </p>
    </div>

    {error && (
      <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-shake">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Invalid credentials. Please try again.
      </div>
    )}

    <form onSubmit={login} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
        <input
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-4 rounded-2xl bg-slate-900/50 text-white placeholder-slate-600 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-4 rounded-2xl bg-slate-900/50 text-white placeholder-slate-600 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 mt-4 rounded-2xl bg-emerald-600 text-white font-bold uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
      >
        Sign In
      </button>
    </form>
  </div>
</div>
);

}

export default Login