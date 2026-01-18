"use client";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

interface AuthModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AuthModal({ isOpen, setIsOpen }: AuthModalProps) {
  const handleLogin = async () => {
  try {
    // Sadece girişi başlatıyoruz, mesaj işini yukarıdaki "Observer" yapacak
    await signIn("google"); 
  } catch (error) {
    toast.error("Beklenmedik bir hata oluştu.");
  }
};
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 antialiased">
          {/* Arka Plan - Blur miktarını iyice düşürdük veya kaldırdık */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            // Blur yerine sadece hafif bir karartma kullanmak FPS'i %50 artırır
            className="absolute inset-0 bg-black/60 transform-gpu"
          />

          {/* Modal Kutu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }} // Scale farkını azalttık (0.95 -> 0.98)
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 15 }}
            transition={{
              type: "tween", // Spring yerine Tween daha düşük işlemci tüketir
              ease: "easeOut",
              duration: 0.25,
            }}
            // GPU'yu doğrudan bu elemente odaklanmaya zorlar
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)",
            }}
            className="relative bg-gray-900 border border-gray-800 p-8 rounded-[2rem] 
                       max-w-sm w-full text-center z-[101]
                       shadow-2xl" // Özel shadow yerine standart Tailwind shadow-2xl
          >
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer absolute top-5 right-5 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6 inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-500">
              <ShieldCheck size={28} />
            </div>

            <h2 className="text-xl font-bold text-white mb-2">
              Analizleri Kaçırma
            </h2>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
              Linkinin kaç kez tıklandığını görmek ve yönetmek için giriş yap.
            </p>

            <button
              onClick={handleLogin}
              className="flex cursor-pointer items-center justify-center gap-3 w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-100 transition-all active:scale-95"
            >
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/fluency/48/google-logo.png"
                alt="google"
              />
              Google ile Giriş Yap
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
