import { supabase } from "@/lib/supabase";
import { UrlEntry } from "@/types/database";
import LinkForm from "@/components/LinkForm";
import { ArrowUpRight, Copy, Link as LinkIcon, Globe } from "lucide-react";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

// async function getRecentUrls(): Promise<UrlEntry[]> {
//   const { data, error } = await supabase
//     .from("urls")
//     .select("*")
//     .order("created_at", { ascending: false })
//     .limit(10);

//   if (error) return [];
//   return data as UrlEntry[];
// }

export default async function Home() {
  // const recentUrls = await getRecentUrls();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <main className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 mb-4"
          >
            <LinkIcon className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-colors" />
            <span className="text-4xl font-bold tracking-tighter text-white group-hover:text-blue-400 transition-colors">
              Linkle<span className="text-blue-500">.</span>
            </span>
          </Link>
          <p className="text-lg text-gray-400">
            Hızlı ve basit bir şekilde linklerinizi kısaltın ve paylaşın.
          </p>
        </div>

        <div className="bg-gray-800 border border-gray-700 shadow-lg rounded-2xl p-6 sm:p-8 mb-12">
          <LinkForm />
        </div>

        {/* <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white text-center">
            Son Kısaltılan Linkler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentUrls.map((url) => (
              <div
                key={url.id}
                className="bg-gray-800 border border-gray-700 rounded-xl shadow-md p-6 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <a
                      href={url.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline truncate"
                    >
                      {url.original_url}
                    </a>
                  </div>
                  <a
                    href={`/${url.short_code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-green-400">
                    {`${process.env.NEXT_PUBLIC_BASE_URL}/${url.short_code}`}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">
                      {url.clicks} Tıklama
                    </span>
                    <CopyButton text={`${process.env.NEXT_PUBLIC_BASE_URL}/${url.short_code}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </main>
    </div>
);
}
