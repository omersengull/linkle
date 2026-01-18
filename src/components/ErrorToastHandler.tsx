"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import toast from "react-hot-toast";

function ErrorHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "not_found") {
      toast.error("Aradığınız kısa link sistemde bulunamadı!");
    }
  }, [searchParams]);

  return null;
}

export default function ErrorToastHandler() {
  return (
    <Suspense fallback={null}>
      <ErrorHandler />
    </Suspense>
  );
}