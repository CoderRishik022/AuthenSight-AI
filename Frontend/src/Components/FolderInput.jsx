import React, { useState, useRef } from 'react';
<<<<<<< HEAD
import { api, apiAi } from './Axios/axios'; // Ensure this path matches your structure
=======
import { api, apiAi } from './Axios/axios.js';
>>>>>>> 5e181e837b2cd02ccebcb185fdf0dcf1ac7e6ef4
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadImage } from '../store/authSlice';

const FolderInput = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status);
  const dispatch = useDispatch();

  // Handle file selection via click
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);

      // Reset the other input to avoid conflicts
      if (e.target === fileInputRef.current) {
        if (videoInputRef.current) videoInputRef.current.value = null;
      } else {
        if (fileInputRef.current) fileInputRef.current.value = null;
      }
    }
  };

  // Handle Drag & Drop Logic
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
      if (fileInputRef.current) fileInputRef.current.value = null;
      if (videoInputRef.current) videoInputRef.current.value = null;
    }
  };

  const ask = async () => {
    if (!file) return alert("Please select a file first");

    const fileType = file.type.startsWith("video/") ? "video" : "image";

    // 🔹 FormData ONLY for AI
    const aiFormData = new FormData();
    aiFormData.append("queryObject", file);

    try {
      let response;
      if (fileType === "image") {
        response = await apiAi.post("/predict", aiFormData);
      } else {
        response = await apiAi.post("/predict-video", aiFormData);
      }

      let { label, confidence } = response.data;
      label = label.toLowerCase();

      const ansClaim = label === "real";
      const ansPerc = String(confidence);

      // 🔹 FormData ONLY for Node backend
      const queryFormData = new FormData();
      queryFormData.append("queryObject", file);
      queryFormData.append("type", fileType);
      queryFormData.append("ansClaim", ansClaim);
      queryFormData.append("ansPerc", ansPerc);

      if (authStatus) {
        const res = await api.post("/query/queryInfo", queryFormData);
        if (res) navigate(`/query/${res.data.data._id}`);
      } else {
        const previewUrl = URL.createObjectURL(file);
        dispatch(loadImage({ previewUrl, ansClaim, ansPerc }));
        navigate("/unsignedQuery");
      }
    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Something went wrong during analysis.");
    }
  };

  return (
    <div 
      className="w-full max-w-5xl px-6"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        
        {/* IMAGE BOX */}
        <div 
          onClick={() => fileInputRef.current.click()}
          className={`group relative aspect-[4/3] rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col items-center justify-center gap-6 ${
            file && file.type.startsWith("image/") 
            ? "border-emerald-500 bg-emerald-500/[0.05] shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
            : isDragging ? "border-emerald-500/50 bg-emerald-500/10" : "border-slate-800 bg-slate-900/50 hover:border-emerald-500/30"
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
          />
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            file && file.type.startsWith("image/") ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/40" : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
          }`}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-bold text-slate-200 uppercase tracking-[0.2em] text-xs">Image Forensics</span>
        </div>

        {/* VIDEO BOX */}
        <div 
          onClick={() => videoInputRef.current.click()}
          className={`group relative aspect-[4/3] rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col items-center justify-center gap-6 ${
            file && file.type.startsWith("video/") 
            ? "border-emerald-500 bg-emerald-500/[0.05] shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
            : isDragging ? "border-emerald-500/50 bg-emerald-500/10" : "border-slate-800 bg-slate-900/50 hover:border-emerald-500/30"
          }`}
        >
          <input 
            type="file" 
            ref={videoInputRef} 
            accept="video/*" 
            onChange={handleFileChange} 
            className="hidden" 
          />
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            file && file.type.startsWith("video/") ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/40" : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
          }`}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-bold text-slate-200 uppercase tracking-[0.2em] text-xs">Video Forensics</span>
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
    dispatch(loadImage({ previewUrl, ansClaim, ansPerc, fileType }))
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

      {/* STATUS & ACTION BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-slate-900/80 border border-slate-800/50 backdrop-blur-md rounded-[2.5rem] gap-6">
        <div className="text-center md:text-left">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Forensic Buffer Status</p>
          <p className="text-emerald-400 font-mono text-sm">
            {file ? `READY: ${file.name}` : "AWAITING SOURCE FILE..."}
          </p>
        </div>
        
        <button
          onClick={ask}
          disabled={!file}
          className={`px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 transform active:scale-95 ${
            file 
            ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-xl shadow-emerald-900/30" 
            : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
          }`}
        >
          Authen-Sight
        </button>
      </div>
    </div>
  );
};

export default FolderInput;