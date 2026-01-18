export default function UserStats({ links }: { links: any[] }) {
  const totalClicks = links.reduce((acc, curr) => acc + (curr.clicks || 0), 0);

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-2xl">
        <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Toplam Link</p>
        <p className="text-2xl font-bold text-blue-500">{links.length}</p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-2xl">
        <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Toplam Tıklama</p>
        <p className="text-2xl font-bold text-green-500">{totalClicks}</p>
      </div>
    </div>
  );
}