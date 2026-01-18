"use client";
import React, { useState } from "react";
import CopyButton from "./CopyButton";
import { Send, Loader2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const LinkForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setShortLink("");

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });
      const data = await res.json();
      if (res.ok && data?.shortCode) {
        setShortLink(`${window.location.origin}/${data.shortCode}`);
        if (!session) {
          const pendingLinks = JSON.parse(
            localStorage.getItem("pending_links") || "[]",
          );
          pendingLinks.push(data.shortCode); // veya veritabanı ID'si
          localStorage.setItem("pending_links", JSON.stringify(pendingLinks));
        }
        setUrl("");
        toast.success("Link oluşturuldu!");
        router.refresh();
      } else {
        throw new Error(
          data?.error || "Link oluşturulurken bir veri hatası oluştu.",
        );
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthModal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="url"
          value={url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
          placeholder="https://örnek.com/çok-uzun-bir-link"
          className="flex-grow bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Kısaltılıyor...
            </>
          ) : (
            <>
              Kısalt
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Kısa Link Sonuç Alanı */}
      <AnimatePresence mode="wait">
        {shortLink && (
          <motion.div
            key={shortLink} // Link her değiştiğinde animasyonun tekrar etmesi için key şart
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-6 space-y-4"
          >
            {/* Sonuç Kartı */}
            <div className="p-4 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                  Kısa Linkin
                </span>
                <a
                  className="font-mono text-lg text-green-400 hover:text-green-300 transition-colors truncate"
                  href={shortLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortLink}
                </a>
              </div>
              <CopyButton text={shortLink} />
            </div>

            {/* Giriş Teşvik Banner'ı (Sadece oturum yoksa) */}
            {!session && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }} // Karttan biraz sonra gelsin
                onClick={() => setIsAuthModalOpen(true)}
                className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl cursor-pointer hover:bg-blue-500/20 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm">
                    <ShieldCheck className="text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-300">
                      Bu linkin istatistiklerini takip etmek ister misin?
                    </span>
                  </div>
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-tighter">
                    Giriş Yap
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LinkForm;
