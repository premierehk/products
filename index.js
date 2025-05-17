import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 text-center">
      <h1 className="text-4xl font-bold text-murasaki-600 mb-4">色型選選</h1>
      <p className="text-lg mb-6">
        立即開始顏色與性格測驗，獲得屬於你嘅飾物推薦！
      </p>
      <Link href="/quiz/color">
        <button className="bg-murasaki-500 hover:bg-murasaki-700 text-white font-bold py-2 px-6 rounded-xl shadow-md transition">
          開始測驗
        </button>
      </Link>
    </div>
  );
}
