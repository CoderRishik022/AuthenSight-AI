import React, {useEffect, useState} from 'react'
import { api } from './Axios/axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function History() {
  const [openMenuId, setOpenMenuId] = useState(null)
    const userdata = useSelector(state => state.auth.userdata)
    const [history, setHistory] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await api.post("/user/history",)
            console.log(data.data.data)
            setHistory((data.data.data).reverse())
        }
        getData()
    },[])
    useEffect(() => {
      const close = () => setOpenMenuId(null)
      window.addEventListener("click", close)
      return () => window.removeEventListener("click", close)
    }, [])

    const handleDelete = async (id) => {
      try {
        await api.post("/query/deleteQuery", { _id: id }) 
        setHistory(prev => prev.filter(item => item._id !== id))
      } catch (err) {
        console.error("Failed to delete", err)
      }
    }
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
            <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-200 hover:scale-[1.02] hover:border-indigo-500 relative">

              {/* Three-dot menu button */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl z-10"
                onClick={(ev) => {
                  ev.preventDefault()
                  ev.stopPropagation()
                  setOpenMenuId(openMenuId === e._id ? null : e._id)
                }}
              >
                ⋮
              </button>

              {/* Dropdown menu */}
              {openMenuId === e._id && (
                <div
                  className="absolute top-10 right-3 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20"
                  onClick={(ev) => ev.stopPropagation()}
                >
                  <button
                    className="block w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                    onClick={(ev) => {
                      ev.preventDefault()
                      ev.stopPropagation()
                      handleDelete(e._id)
                      setOpenMenuId(null)
                    }}
                  >
                    Delete from history
                  </button>
                </div>
              )}

              {/* Media */}
              <div className="h-48 bg-black flex items-center justify-center overflow-hidden">
                {e.type === "video" ? (
                  <video
                    src={e.queryObject}
                    className="object-contain h-full"
                    muted
                    playsInline
                    controls
                  />
                ) : (
                  <img
                    src={e.queryObject}
                    alt="Analyzed content"
                    className="object-contain h-full group-hover:scale-105 transition-transform duration-300"
                  />
                )}
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
