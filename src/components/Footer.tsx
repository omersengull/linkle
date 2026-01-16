import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 border-t border-white/5 bg-[rgb(30,41,59)] py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Sol: Marka ve Slogan */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-blue-400 transition-colors">
              LINKLE<span className="text-blue-500">.</span>
            </span>
          </Link>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
            Linklerini Şıkça Kısalt
          </p>
        </div>

        

   
        <div className="flex flex-col items-center md:items-end text-[12px] text-slate-400 space-y-1">
          <p>© {currentYear} Linkle Inc. Tüm Hakları Saklıdır.</p>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="uppercase tracking-tighter text-[10px]">Cloud Infrastructure Active</span>
          </div>
        </div>

        <div className="flex items-center">
          <Link 
            href="https://github.com/omersengull" 
            target="_blank" 
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-all duration-300 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" height="20" 
              viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="2" 
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span className="font-medium">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}