import { useEffect } from 'react';

export default function Result() {
  useEffect(() => {
    fetch('/api/saveResult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'Dreamer + Cool Tone', time: new Date() })
    });
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">你的測驗結果</h1>
      <p className="mb-4">Dreamer + Cool Tone</p>
      <p>根據你嘅測驗結果，我哋推薦以下飾物……（模擬畫面）</p>
    </div>
  );
}
