"use client";
import React, { useState } from "react";
import CopyButton from "./CopyButton";

const LinkForm = () => {
  const [url, setUrl] = useState("");
  const [shortLink, setShortLink] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/shorten", {
      method: "POST",
      body: JSON.stringify({ originalUrl: url }),
    });
    const data = await res.json();
    // Tarayıcıdaki mevcut adresi alıp sonuna kısa kodu ekliyoruz
    setShortLink(`${window.location.origin}/${data.shortCode}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
          placeholder="Uzun linki yapıştır..."
          className="border w-full p-2 rounded text-black"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Kısalt
        </button>
      </form>

      {shortLink && (
        <div className="mt-5 ">
          Kısa Linkiniz:{" "}
          <a className="mr-1 text-green-700" href={shortLink} target="_blank">
            {shortLink}
          </a>
          <CopyButton text={shortLink} />
        </div>
      )}
    </div>
  );
};

export default LinkForm;
