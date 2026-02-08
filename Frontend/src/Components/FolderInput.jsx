import React, { useState, useRef } from "react";
import { api, apiAi } from "./Axios/axios.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadImage } from "../store/authSlice";

const FolderInput = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  /* -------------------- FILE HANDLERS -------------------- */

  const handleFileChange = (e) => {
    if (!e.target.files?.[0]) return;

    setFile(e.target.files[0]);

    if (e.target === fileInputRef.current && videoInputRef.current) {
      videoInputRef.current.value = null;
    }
    if (e.target === videoInputRef.current && fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

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

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    setFile(droppedFile);
    if (fileInputRef.current) fileInputRef.current.value = null;
    if (videoInputRef.current) videoInputRef.current.value = null;
  };

  /* -------------------- MAIN ACTION -------------------- */

  const ask = async () => {
    if (!file) return alert("Please select a file first");

    const fileType = file.type.startsWith("video/") ? "video" : "image";

    try {
      /* ---- AI REQUEST ---- */
      const aiFormData = new FormData();
      aiFormData.append("queryObject", file);

      const response =
        fileType === "image"
          ? await apiAi.post("/predict", aiFormData)
          : await apiAi.post("/predict-video", aiFormData);

      let { label, confidence } = response.data;
      label = label.toLowerCase();

      const ansClaim = label === "real";
      const ansPerc = String(confidence);

      /* ---- BACKEND REQUEST ---- */
      const queryFormData = new FormData();
      queryFormData.append("queryObject", file);
      queryFormData.append("type", fileType);
      queryFormData.append("ansClaim", ansClaim);
      queryFormData.append("ansPerc", ansPerc);

      if (authStatus) {
        const res = await api.post("/query/queryInfo", queryFormData);
        navigate(`/query/${res.data.data._id}`);
      } else {
        const previewUrl = URL.createObjectURL(file);
        dispatch(loadImage({ previewUrl, ansClaim, ansPerc, fileType }));
        navigate("/unsignedQuery");
      }
    } catch (err) {
      console.error("Analysis failed:", err);
      alert("Something went wrong during analysis.");
    }
  };

  /* -------------------- UI -------------------- */

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
          <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />
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
          <input type="file" ref={videoInputRef} accept="video/*" onChange={handleFileChange} className="hidden" />
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            file && file.type.startsWith("video/") ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/40" : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
          }`}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-bold text-slate-200 uppercase tracking-[0.2em] text-xs">Video Forensics</span>
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
