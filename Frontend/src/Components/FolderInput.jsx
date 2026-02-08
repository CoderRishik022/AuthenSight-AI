import React, { useState, useRef } from 'react';
import { api, apiAi } from './Axios/axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadImage } from '../store/authSlice';

const FolderInput = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.status)
  const dispatch = useDispatch()
  let queryObject = new FormData()
  queryObject.append("queryObject", file)
//   if(authStatus) {
//     queryObject.append("ansClaim", false)
//     queryObject.append("ansPerc", 93)
//   }
  

  // Handle file selection via click
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle Drag Events
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // Trigger hidden input click
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const ask = async() => {
    const response = await apiAi.post("/predict", queryObject)
    const {label, confidence} = response.data
    let ansClaim = null
    if(label === "true") ansClaim = true
    else ansClaim = false
    let ansPerc = null
    console.log(typeof(confidence))
    console.log("confidence: ", confidence)
    ansPerc = String(confidence)
    queryObject.append("ansClaim", ansClaim)
    queryObject.append("ansPerc", ansPerc)
    if(authStatus) {
      const res = await api.post("/query/queryInfo", queryObject)
      if(res) navigate(`/query/${res.data.data._id}`);
      // console.log(file)
    }else {
      // const res = await api.post("/query/queryfile", queryObject)
      // console.log(res.data.data.url)
      // dispatch(loadImage(res.data.data.url))
      const previewUrl = URL.createObjectURL(file);
      dispatch(loadImage({previewUrl, ansClaim, ansPerc}))
     if(previewUrl) navigate("/unsignedQuery")
    }
  }

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6 w-screen">
    
    <div
      className={`relative w-72 h-52 transition-all duration-300 ease-in-out cursor-pointer group ${
        isDragging ? 'scale-105' : ''
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={handleClick}
    >
      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Folder Tab */}
      <div
        className={`absolute top-0 left-0 w-28 h-8 rounded-t-lg transition-colors ${
          isDragging
            ? 'bg-indigo-500'
            : 'bg-yellow-500 group-hover:bg-yellow-400'
        }`}
      ></div>

      {/* Folder Body */}
      <div
        className={`absolute top-4 left-0 w-full h-full rounded-b-xl rounded-tr-xl shadow-2xl border-2 flex flex-col items-center justify-center p-4 transition-all ${
          isDragging
            ? 'bg-gray-900 border-indigo-500 border-dashed'
            : 'bg-gray-800 border-gray-700 group-hover:bg-gray-700'
        }`}
      >
        {file ? (
          <div className="text-center">
            <svg
              className="w-12 h-12 text-indigo-400 mb-2 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>

            <p className="text-sm font-semibold text-gray-200 truncate w-56">
              {file.name}
            </p>
            <p className="text-xs text-gray-400">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        ) : (
          <div className="text-center">
            <svg
              className={`w-12 h-12 mb-2 mx-auto transition-colors ${
                isDragging ? 'text-indigo-400' : 'text-yellow-400'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <p
              className={`text-sm font-medium ${
                isDragging ? 'text-indigo-400' : 'text-yellow-300'
              }`}
            >
              {isDragging ? 'Drop it here!' : 'Drag files or click'}
            </p>
          </div>
        )}
      </div>
    </div>

    <button
      onClick={ask}
      className="mt-16 px-8 py-3 rounded-2xl bg-indigo-600 text-white font-semibold tracking-wide
                 hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/40"
    >
      Authen-Sight
    </button>
  </div>
);

};

export default FolderInput;