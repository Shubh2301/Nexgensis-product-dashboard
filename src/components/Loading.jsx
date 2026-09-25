function Loading({ message = "Loading..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EBF2F8] p-6">
      <div className="flex flex-col items-center rounded-3xl border border-white/70 bg-white/80 px-8 py-10 shadow-[0_12px_40px_rgba(54,70,105,0.12)] backdrop-blur-xl">
        
        {/* Loader */}
        <div className="mb-5 h-10 w-10 animate-spin rounded-full border-4 border-[#D9E1E8] border-t-[#3A4B75]" />

        {/* Message */}
        <p className="text-sm font-medium text-[#6F767E]">
          {message}
        </p>
      </div>
    </div>
  );
}

export default Loading;