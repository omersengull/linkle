"use client";
import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full z-50 border-t border-white/5 bg-[rgb(30,41,59)] transition-all px-4 sm:px-8 duration-500 ease-in-out ${isExpanded ? "py-8" : "py-4"}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          {/* SOL: Logo ve Slogan */}
          <div
            className={`flex items-center transition-all duration-500 overflow-hidden ${isExpanded ? "flex-col items-start space-y-2" : "flex-row gap-4"}`}
          >
            <Link href="/" className="group flex items-center gap-2">
              <span
                className={`${isExpanded ? "text-3xl" : "text-2xl"} font-black tracking-tighter text-white group-hover:text-blue-400 transition-all duration-500`}
              >
                LINKLE<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p
              className={`${isExpanded ? "text-[12px]" : "text-[11px]"} uppercase tracking-[0.15em] text-slate-300 font-semibold whitespace-nowrap transition-all duration-500`}
            >
              Linklerini Şıkça Kısalt
            </p>
          </div>

          {/* ORTA: Telif Hakkı (Sadece Geniş Modda) */}
          <div
            className={`hidden md:flex flex-col items-center text-[13px] text-slate-400 space-y-2 transition-all duration-500 ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
          >
            <p className="font-medium">
              © {currentYear} Linkle Inc. Tüm Hakları Saklıdır.
            </p>
            <div className="flex items-center gap-2 text-slate-500">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="uppercase tracking-widest text-[10px]">
                Cloud Infrastructure Active
              </span>
            </div>
          </div>

          {/* SAĞ: GitHub ve Kontrol Butonu */}
          <div className="flex flex-col items-end gap-3">
            {/* Genişlet/Küçült Butonu - Her zaman en sağda */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[9px] sm:text-[10px] uppercase cursor-pointer tracking-[0.15em] sm:tracking-[0.2em] text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1.5 bg-white/5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border shrink-0 border-white/10 active:scale-95 transition-transform"
            >
              {isExpanded ? (
                <>
                  <span className="hidden xs:inline">Küçült</span>
                  <span className="rotate-180 transition-transform inline-block text-xs">
                    ↑
                  </span>
                </>
              ) : (
                <>
                  <span className="hidden xs:inline">Genişlet</span>
                  <span className="inline-block text-xs">↑</span>
                </>
              )}
            </button>

            {/* GitHub Butonu (Sadece Geniş Modda, Butonun Altında) */}
            <div
              className={`transition-all duration-500 ${isExpanded ? "opacity-100 scale-100 h-auto translate-y-0" : "opacity-0 scale-90 h-0 overflow-hidden translate-y-2"}`}
            >
              <Link
                href="https://github.com/omersengull"
                target="_blank"
                className="flex items-center gap-3 text-sm text-slate-200 hover:text-white transition-all duration-300 bg-white/5 px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span className="font-bold tracking-tight text-xs">GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobil için alt telif yazısı (Opsiyonel) */}
        <div
          className={`md:hidden text-center mt-4 transition-all duration-500 ${isExpanded ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"}`}
        >
          <p className="text-[11px] text-slate-400 font-medium">
            © {currentYear} Linkle Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
