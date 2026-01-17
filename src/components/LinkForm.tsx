"use client";
import React, { useState } from "react";
import CopyButton from "./CopyButton";
import { Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
const LinkForm = () => {
  const [url, setUrl] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [loading, setLoading] = useState(false);

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
      if (!res.ok) {
        throw new Error(data.error || "Bir hata oluştu.");
      }

      setShortLink(`${window.location.origin}/${data.shortCode}`);
      toast.success("Link başarıyla kısaltıldı!");
      setUrl(""); // Input'u temizle
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
      {shortLink && (
        <div className="mt-6 p-4 bg-gray-700/50 border border-gray-600 rounded-lg flex flex-col sm:flex-row items-center justify-between animate-in fade-in zoom-in duration-300">
          <p className="text-lg text-white mb-2 sm:mb-0">
            Kısa Linkin:{" "}
            <a
              className="font-mono text-green-400 hover:underline"
              href={shortLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortLink}
            </a>
          </p>
          <CopyButton text={shortLink} />
        </div>
      )}
    </div>
  );
};

export default LinkForm;
