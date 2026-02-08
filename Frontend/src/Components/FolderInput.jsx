import React, { useState, useRef } from 'react';
import { api, apiAi } from './Axios/axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadImage } from '../store/authSlice';

const FolderInput = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null); // ✅ NEW

  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.status)
  const dispatch = useDispatch()

  let queryObject = new FormData()
  queryObject.append("queryObject", file)

  // Handle file selection via click (UPDATED)
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);

      // ✅ ensure only one input is active
      if (e.target === fileInputRef.current) {
        if (videoInputRef.current) videoInputRef.current.value = null
      } else {
        if (fileInputRef.current) fileInputRef.current.value = null
      }
    }
  };

  // Handle Drag Events (unchanged)
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

      // clear both inputs (drag & drop overrides)
      if (fileInputRef.current) fileInputRef.current.value = null
      if (videoInputRef.current) videoInputRef.current.value = null
    }
  };

  // Trigger input click (UPDATED)
  const handleClick = () => {
    // default behavior: open image picker
    fileInputRef.current.click();
  };

const ask = async () => {
  const fileType = file.type.startsWith("video/") ? "video" : "image"

  // 🔹 FormData ONLY for AI
  const aiFormData = new FormData()
  aiFormData.append("queryObject", file)

  let response
  if (fileType === "image") {
    response = await apiAi.post("/predict", aiFormData)
  } else {
    response = await apiAi.post("/predict-video", aiFormData)
  }

  let { label, confidence } = response.data
  label = label.toLowerCase()

  const ansClaim = label === "real"
  const ansPerc = String(confidence)

  // 🔹 FormData ONLY for Node backend
  const queryFormData = new FormData()
  queryFormData.append("queryObject", file)
  queryFormData.append("type", fileType)
  queryFormData.append("ansClaim", ansClaim)
  queryFormData.append("ansPerc", ansPerc)

  if (authStatus) {
    const res = await api.post("/query/queryInfo", queryFormData)
    if (res) navigate(`/query/${res.data.data._id}`)
  } else {
    const previewUrl = URL.createObjectURL(file)
    dispatch(loadImage({ previewUrl, ansClaim, ansPerc }))
    navigate("/unsignedQuery")
  }
}


return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6 w-screen">

    <div className="flex gap-10">

      {/* IMAGE BOX */}
      <div
        className={`relative w-72 h-52 cursor-pointer transition-all ${
          file && file.type.startsWith("image/") ? "ring-2 ring-yellow-400" : ""
        }`}
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const f = e.dataTransfer.files[0]
          if (f && f.type.startsWith("image/")) {
            setFile(f)
            if (videoInputRef.current) videoInputRef.current.value = null
          }
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="w-full h-full rounded-xl bg-gray-800 border-2 border-yellow-500 flex flex-col items-center justify-center">
          <p className="text-yellow-400 font-semibold">Image</p>
        </div>
      </div>

      {/* VIDEO BOX */}
      <div
        className={`relative w-72 h-52 cursor-pointer transition-all ${
          file && file.type.startsWith("video/") ? "ring-2 ring-indigo-400" : ""
        }`}
        onClick={() => videoInputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const f = e.dataTransfer.files[0]
          if (f && f.type.startsWith("video/")) {
            setFile(f)
            if (fileInputRef.current) fileInputRef.current.value = null
          }
        }}
      >
        <input
          type="file"
          ref={videoInputRef}
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="w-full h-full rounded-xl bg-gray-800 border-2 border-indigo-500 flex flex-col items-center justify-center">
          <p className="text-indigo-400 font-semibold">Video</p>
        </div>
      </div>
    </div>

    {/* Selected file info */}
    {file && (
      <p className="mt-6 text-gray-300 text-sm">
        Selected: {file.name}
      </p>
    )}

    <button
      onClick={ask}
      className="mt-12 px-8 py-3 rounded-2xl bg-indigo-600 text-white font-semibold
                 hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/40"
    >
      Authen-Sight
    </button>
  </div>
);

};

export default FolderInput;
