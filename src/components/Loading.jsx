import { useEffect, useState } from 'react';

const Loading = () => {
  const [show, setShow] = useState(true);
  const [imgError, setImgError] = useState(false);

  // We use a relative string path to avoid Vite build errors for missing files
  // The user should place the file at src/assets/loading.gif
  // Vite will attempt to resolve this at runtime if possible, or it will trigger onError
  const loadingGifPath = "/src/assets/loading.gif";

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <div className="relative w-64 h-64 flex flex-col items-center justify-center">
        {!imgError ? (
          <img 
            src={loadingGifPath} 
            alt="Loading..." 
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-maroon-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-maroon-500 animate-pulse">Atelier is Baking...</p>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center animate-luxury">
        <h2 className="text-3xl font-bold text-ebony serif italic mb-2 tracking-tighter">Hometown<span className="text-yellow-accent">.</span></h2>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Crafting your gourmet experience</p>
      </div>
    </div>
  );
};

export default Loading;
