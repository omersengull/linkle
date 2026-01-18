"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SessionObserver() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      // 1. HOŞ GELDİN MESAJI (Senin kodun)
      const storageKey = `welcome_shown_${session.user.email}`;
      if (!localStorage.getItem(storageKey)) {
        toast.success(`Hoş geldin, ${session.user.name}!`, { icon: "👋" });
        localStorage.setItem(storageKey, "true");
      }

      // 2. BEKLEYEN LİNKLERİ EŞİTLEME (EKSİK OLAN KISIM)
      const syncPendingLinks = async () => {
        const pendingLinks = JSON.parse(localStorage.getItem("pending_links") || "[]");
        
        if (pendingLinks.length > 0) {
          try {
            const res = await fetch("/api/links/sync", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ codes: pendingLinks }),
            });

            if (res.ok) {
              const data = await res.json();
              if (data.count > 0) {
                toast.success(`${data.count} link hesabınızla eşlendi!`);
              }
              localStorage.removeItem("pending_links"); // İşlem bitince temizle
              router.refresh(); // Listeyi güncelle
            }
          } catch (err) {
            console.error("Senkronizasyon hatası:", err);
          }
        }
      };

      syncPendingLinks();
    }

    // Çıkış yapınca temizleme mantığın doğru, kalsın.
  }, [status, session]);

  return null;
}