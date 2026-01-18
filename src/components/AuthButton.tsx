"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, User } from "lucide-react";
import AuthModal from "./AuthModal";
import { useState } from "react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (status === "loading") return null;

  return (
    <div className="fixed top-6 right-6 z-[50]">
      {session ? (
        // Giriş Yapılmışsa: Profil ve Çıkış
        <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-md border border-gray-700 p-1.5 pr-4 rounded-full shadow-xl">
          {session.user?.image ? (
            <img 
              src={session.user.image} 
              alt="Profil" 
              className="w-8 h-8 rounded-full border border-gray-600"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              <User size={16} />
            </div>
          )}
          <span className="text-sm font-medium hidden sm:inline">{session.user?.name}</span>
          <button 
            onClick={() => signOut()}
            className="p-1.5 hover:bg-red-500/20 cursor-pointer hover:text-red-400 rounded-full transition-colors text-gray-400"
            title="Çıkış Yap"
          >
            <LogOut size={18} />
          </button>
        </div>
      ) : (
        // Giriş Yapılmamışsa: Giriş Butonu
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg transition-all active:scale-95"
          >
            <LogIn size={18} />
            <span>Giriş Yap</span>
          </button>
          
          <AuthModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
      )}
    </div>
  );
}