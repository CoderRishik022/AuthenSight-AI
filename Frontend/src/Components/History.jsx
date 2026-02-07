import React, {useEffect, useState} from 'react'
import { api } from './Axios/axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function History() {
    const userdata = useSelector(state => state.auth.userdata)
    const [history, setHistory] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await api.post("/user/history",)
            console.log(data.data.data)
            setHistory(data.data.data)
        }
        getData()
    },[])
    if(history.length === 0) return <p>Loading History</p>
    return (
  <div className="min-h-screen w-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">
        Analysis History
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {history.map((e) => (
          <Link
            to={`/query/${e._id}`}
            key={e._id}
            className="group"
          >
            <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-200 hover:scale-[1.02] hover:border-indigo-500">
              
              {/* Image */}
              <div className="h-48 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={e.queryObject}
                  alt="Analyzed content"
                  className="object-contain h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      e.ansClaim
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {e.ansClaim ? 'Real' : 'Fake'}
                  </span>

                  <span className="text-sm font-medium text-indigo-400">
                    {e.ansPerc}%
                  </span>
                </div>

                <p className="text-sm text-gray-400">
                  Click to view detailed analysis →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

}

export default History
