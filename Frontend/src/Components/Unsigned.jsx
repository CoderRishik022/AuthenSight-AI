import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { api } from './Axios/axios'

function Unsigned() {
    const navigate = useNavigate()

    const image = useSelector(state => state.auth.unsignedImage)
    const ansClaim = useSelector(state => state.auth.unsignedClaim)
    const ansPerc = useSelector(state => state.auth.unsignedPerc)
    const type = useSelector(state => state.auth.type)
    const navigateToHome = () => {

        navigate("/")
    }
  return (
    <div className='flex flex-col items-center min-h-screen w-screen bg-gradient-to-br from-black via-gray-900 to-black '>
        <div className="flex items-center justify-center p-6">
            <div className="max-w-5xl w-full bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8">
            
            {/* Left: Analysis */}
            <div className="flex-1 space-y-6">
                <h2 className="text-2xl font-bold text-white tracking-wide">
                Analysis Result
                </h2>

                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                <p className="text-sm uppercase tracking-wider text-gray-400 mb-1">
                    Claim
                </p>
                <p className="text-lg font-semibold text-amber-300">
                    {ansClaim ? "Real" : "Fake"}
                </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                <p className="text-sm uppercase tracking-wider text-gray-400 mb-1">
                    Surety
                </p>
                <p className="text-4xl font-bold text-indigo-400">
                    {ansPerc}%
                </p>
                </div>
            </div>

            {/* Right: Image */}
            <div className="flex-1 flex items-center justify-center">
                <div className="relative rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                {type === "image" ?
            <img
              src={image}
              alt="Analyzed content"
              className="w-full max-h-[260px] md:max-h-[360px] object-contain"
            />
            : 
            <video
              src={image}
              className="object-contain h-full"
              controls
              playsInline
            />

            }
                </div>
            </div>
            </div>
        </div>
        <button
        onClick={navigateToHome}
          type="submit"
          className="py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition duration-200 shadow-lg shadow-indigo-600/30 w-1/10 mt-3"
        >
          Authen-Sight Again
        </button>
  </div>
);
}

export default Unsigned
