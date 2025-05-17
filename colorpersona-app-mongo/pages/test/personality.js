import { useRouter } from 'next/router';

export default function PersonalityTest() {
  const router = useRouter();
  const handleComplete = () => {
    router.push('/result');
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">性格測驗</h1>
      <p className="mb-4">請回答幾條簡單問題（模擬畫面）</p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleComplete}>
        查看結果
      </button>
    </div>
  );
}
