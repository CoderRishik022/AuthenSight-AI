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
          const { data } = await api.post("/user/login", { email, password })
          if(data?.data) dispatch(authLogin(data.data));
          navigate("/")
      } catch (err) { setError("INVALID_CREDENTIALS"); }
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02040a] px-4 py-32">
          <div className="w-full max-w-lg bg-[#0d1117]/40 backdrop-blur-3xl rounded-[3rem] p-12 border border-white/5 shadow-2xl space-y-10">
              <div className="flex flex-col items-center gap-6">
                  <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                      <span className="text-black font-black text-2xl">AS</span>
                  </div>
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-white tracking-tight">SYSTEM ACCESS</h2>
                    <p className="text-slate-500 font-mono text-xs tracking-widest uppercase">Initialize Authentication</p>
                  </div>
              </div>

              <form onSubmit={login} className="space-y-6">
                  <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Address</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-5 rounded-[1.5rem] bg-black border border-white/5 text-white placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-mono" />
                  </div>
                  <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-5 rounded-[1.5rem] bg-black border border-white/5 text-white placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-mono" />
                  </div>
                  <button type="submit" className="w-full py-5 rounded-[1.5rem] bg-emerald-600 text-white font-black uppercase tracking-widest text-xs hover:bg-emerald-500 shadow-xl shadow-emerald-900/20 active:scale-95 transition-all">Sign In</button>
              </form>
              <p className="text-center text-slate-500 text-xs font-bold tracking-widest">NO ACCOUNT? <Link to="/signup" className="text-emerald-400 hover:underline">REGISTER SOURCE</Link></p>
          </div>
      </div>
    )
}
export default Login