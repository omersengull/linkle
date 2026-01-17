"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-lg cursor-pointer bg-gray-600 hover:bg-gray-500 text-white transition-colors"
      aria-label="Kopyala"
    >
      {copied ? (
        <Check className="w-5 h-5 text-green-400" />
      ) : (
        <Copy className="w-5 h-5" />
      )}
    </button>
  );
}
