"use client";
import { useState } from "react";
import { Clipboard } from "lucide-react";
export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="text-xs text-black p-1">
      <div className="flex items-center justify-center border rounded-lg text-white px-3 py-2 bg-blue-500">
        <Clipboard style={{ marginRight: "2px" }} size={18} />
        {copied ? "Kopyalandı!" : "Kopyala"}
      </div>
    </button>
  );
}
