import React, { useEffect, useState } from 'react'
import { api } from './Axios/axios'
import { useNavigate, useParams } from 'react-router-dom'

function Query() {
    const _id = useParams()
    const navigate = useNavigate()
    const [query, setQuery] = useState({})
    let image = null
    if(query.type === "image") image = true
    else image = false
    useEffect(() => {
      const getQuery = async () => {
        const data = await api.post("/query/getquery", {
          _id
        })
        setQuery(data.data.data)
            // console.log(data.data.data)
        }
        getQuery()
    },[])
    const navigateToHome = () => {
        navigate("/")
    }
  return (
  <div className="min-h-screen w-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center px-4">
    
    <div className="flex items-center justify-center w-full py-6 md:py-12">
      <div className="w-full max-w-5xl bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8">
        
        {/* Left: Analysis */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            Analysis Result
          </h2>

          <div className="bg-gray-800 rounded-xl p-4 md:p-5 border border-gray-700">
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-1">
              Claim
            </p>
            <p className="text-lg md:text-xl font-semibold text-amber-300">
              {query.ansClaim ? "Real" : "Fake"}
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 md:p-5 border border-gray-700">
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-1">
              Surety
            </p>
            <p className="text-3xl md:text-4xl font-bold text-indigo-400">
              {query.ansPerc}%
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-sm md:max-w-md rounded-xl overflow-hidden border border-gray-700 shadow-lg bg-black">
            {image ?
            <img
              src={query.queryObject}
              alt="Analyzed content"
              className="w-full max-h-[260px] md:max-h-[360px] object-contain"
            />
            : 
            <video
              src={query.queryObject}
              className="object-contain h-full"
              controls
              playsInline
            />

            }
            
            
          </div>
        </div>
      </div>
    </div>

    {/* CTA Button */}
    <button
      onClick={navigateToHome}
      type="button"
      className="w-full sm:w-auto px-10 py-3 mb-6 rounded-lg
                 bg-indigo-600 text-white font-semibold
                 hover:bg-indigo-500 transition duration-200
                 shadow-lg shadow-indigo-600/30"
    >
      Authen-Sight Again
    </button>
  </div>
);


}

export default Query
