"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function SyncObserver() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Kullanıcı giriş yapmışsa ve bekleyen link varsa
    if (status === "authenticated" && session?.user?.id) {
      const pendingLinks = JSON.parse(localStorage.getItem("pending_links") || "[]");

      if (pendingLinks.length > 0) {
        fetch("/api/links/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ codes: pendingLinks }),
        })
          .then((res) => {
            if (res.ok) {
              // İşlem başarılıysa localStorage'ı temizle
              localStorage.removeItem("pending_links");
              console.log("Anonim linkler başarıyla senkronize edildi.");
            }
          })
          .catch((err) => console.error("Sync Hatası:", err));
      }
    }
  }, [status, session]);

  return null; // Görsel bir şey döndürmez
}