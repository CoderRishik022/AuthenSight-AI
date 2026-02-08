import React, { useState, useRef } from "react";
import { api, apiAi } from "./Axios/axios.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadImage } from "../store/authSlice";

const FolderInput = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  /* ---------------- FILE HANDLERS ---------------- */

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

  /* ---------------- MAIN ACTION ---------------- */

  const ask = async () => {
    if (!file) return alert("Please select a file first");

    const fileType = file.type.startsWith("video/") ? "video" : "image";

    try {
      setLoading(true);

      // ---- AI REQUEST ----
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

      // ---- BACKEND REQUEST ----
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
      alert("Analysis failed. System error.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-emerald-400 font-mono text-sm tracking-widest">
              ANALYZING MEDIA...
            </p>
          </div>
        </div>
      )}

      <div
        className="w-full max-w-5xl"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {/* INPUT BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          {/* IMAGE BOX */}
          <div
            onClick={() => fileInputRef.current.click()}
            className={`group relative aspect-[4/3] rounded-[2rem] border-2 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center gap-6 ${
              file?.type.startsWith("image/")
                ? "border-emerald-500 bg-emerald-500/[0.05] shadow-[0_0_40px_-15px_rgba(16,185,129,0.3)]"
                : "border-white/5 bg-white/[0.02] hover:border-emerald-500/40"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                file?.type.startsWith("image/")
                  ? "bg-emerald-500 text-black shadow-lg"
                  : "bg-[#0d1117] text-slate-500 group-hover:text-emerald-400"
              }`}
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <span className="font-black text-white uppercase tracking-[0.3em] text-xs">
              Image Forensic
            </span>
          </div>

          {/* VIDEO BOX */}
          <div
            onClick={() => videoInputRef.current.click()}
            className={`group relative aspect-[4/3] rounded-[2rem] border-2 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center gap-6 ${
              file?.type.startsWith("video/")
                ? "border-emerald-500 bg-emerald-500/[0.05] shadow-[0_0_40px_-15px_rgba(16,185,129,0.3)]"
                : "border-white/5 bg-white/[0.02] hover:border-emerald-500/40"
            }`}
          >
            <input
              type="file"
              ref={videoInputRef}
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                file?.type.startsWith("video/")
                  ? "bg-emerald-500 text-black shadow-lg"
                  : "bg-[#0d1117] text-slate-500 group-hover:text-emerald-400"
              }`}
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <span className="font-black text-white uppercase tracking-[0.3em] text-xs">
              Video Forensic
            </span>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between p-10 bg-[#0d1117]/60 backdrop-blur-xl border border-white/5 rounded-[3rem] gap-8 shadow-2xl">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">
              Node Status: Active
            </p>
            <p className="text-white font-mono text-sm tracking-tight">
              {file ? `[BUFFERED]: ${file.name}` : "AWAITING SOURCE..."}
            </p>
          </div>

          <button
            onClick={ask}
            disabled={!file || loading}
            className={`px-16 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] transition-all duration-500 ${
              file && !loading
                ? "bg-emerald-600 text-white hover:bg-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)] active:scale-95"
                : "bg-white/5 text-slate-600 cursor-not-allowed"
            }`}
          >
            {loading ? "PROCESSING..." : "Authen-Sight"}
          </button>
        </div>
      </div>
    </>
  );
};

export default FolderInput;
