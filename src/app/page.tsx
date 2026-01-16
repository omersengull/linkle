import { supabase } from "@/lib/supabase";
import { UrlEntry } from "@/types/database";
import LinkForm from "@/components/LinkForm";
import { Clipboard } from "lucide-react";
import Link from "next/link";

async function getRecentUrls(): Promise<UrlEntry[]> {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) return [];
  return data as UrlEntry[];
}

export default async function Home() {
  const recentUrls = await getRecentUrls();

  return (
    <main className="max-w-4xl mx-auto p-10 bg-blue-950">
      <Link href="/" className="group flex items-center gap-2">
        <span className="text-2xl font-black tracking-tighter text-white group-hover:text-blue-400 transition-colors">
          LINKLE<span className="text-blue-500">.</span>
        </span>
      </Link>

      <div className="bg-white shadow-md rounded-lg p-6 mb-10 text-black">
        <LinkForm />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Son Kısaltılan Linkler
        </h2>
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
          <table className="min-w-full text-left">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-400">
                  Orijinal Link
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-400">
                  Kısa Kod
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-400">
                  Tıklama
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-400">
                  Kopyala
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 text-white">
              {recentUrls.map((url) => (
                <tr key={url.id}>
                  <td className="px-6 py-4 truncate max-w-xs">
                    <a className="" href={url.original_url} target="_blank">
                      {url.original_url}
                    </a>
                  </td>
                  <td className="px-6 py-4 font-mono text-blue-400">
                    {url.short_code}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-900 text-green-300 px-2 py-1 rounded-full text-xs">
                      {url.clicks} tık
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Clipboard style={{ marginRight: "2px" }} size={18} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
