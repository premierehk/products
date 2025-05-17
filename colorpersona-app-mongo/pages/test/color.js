import { useRouter } from 'next/router';

export default function ColorTest() {
  const router = useRouter();
  const handleComplete = () => {
    router.push('/test/personality');
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">顏色測驗</h1>
      <p className="mb-4">請選擇你最鍾意嘅顏色（模擬畫面）</p>
      <button className="px-4 py-2 bg-pink-500 text-white rounded" onClick={handleComplete}>
        下一步
      </button>
    </div>
  );
}
