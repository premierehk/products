import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 px-4 text-center">
      <h1 className="text-3xl font-bold mb-6">歡迎來到 ColorPersona</h1>
      <p className="mb-8 text-lg max-w-md">
        完成測驗，讓我們為你推薦最適合你的手作飾品！
      </p>
      <Link href="/personality" passHref>
        <button className="bg-murasaki-500 hover:bg-murasaki-700 text-white py-3 px-8 rounded-xl shadow text-xl">
          開始測驗
        </button>
      </Link>
    </div>
  );
}
