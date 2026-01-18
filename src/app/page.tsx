import LinkForm from "@/components/LinkForm";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import SessionObserver from "@/components/SessionObserver";
import AuthButton from "@/components/AuthButton";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getUserLinks } from "@/lib/actions";
import CopyButton from "@/components/CopyButton";
import UserStats from "@/components/UserStats";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
// async function getRecentUrls(): Promise<UrlEntry[]> {
//   const { data, error } = await supabase
//     .from("urls")
//     .select("*")
//     .order("created_at", { ascending: false })
//     .limit(10);

//   if (error) return [];
//   return data as UrlEntry[];
// }
export const dynamic = "force-dynamic";
export default async function Home() {
  const searchParams = useSearchParams();
  if (searchParams.get("error") === "not_found") {
    toast.error("Aradığınız kısa link bulunamadı!");
  }
  const session = await getServerSession(authOptions);
  // const recentUrls = await getRecentUrls();
  let userLinks = [];
  if (session?.user?.id) {
    userLinks = await getUserLinks(session.user.id);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8 pb-32">
      <SessionObserver />
      <AuthButton />
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
        {session && (
          <div className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              Senin Linklerin
            </h2>

            <UserStats links={userLinks} />

            <div className="space-y-4">
              {userLinks.map((link) => (
                <div
                  key={link.id}
                  className="bg-gray-800 border border-gray-700 p-5 rounded-2xl flex items-center justify-between group hover:border-gray-600 transition-all"
                >
                  <div className="overflow-hidden mr-4">
                    <a
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/${link.short_code}`}
                      className="text-blue-400 font-mono truncate"
                    >
                      {process.env.NEXT_PUBLIC_BASE_URL}/{link.short_code}
                    </a>
                    <p className="text-gray-500 text-sm truncate">
                      {link.original_url}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-sm text-gray-400 bg-gray-900 px-3 py-1 rounded-full">
                      {link.clicks || 0} tıklama
                    </span>
                    <CopyButton
                      text={`${process.env.NEXT_PUBLIC_BASE_URL}/${link.short_code}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="h-24 w-full" aria-hidden="true" />
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
