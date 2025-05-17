// /pages/quiz/personality.js
import { useRouter } from 'next/router';
import { useState } from 'react';

const personalityOptions = [
  { label: '開朗活潑', value: 'extrovert' },
  { label: '冷靜內斂', value: 'introvert' },
  { label: '創意豐富', value: 'creative' },
  { label: '細心敏銳', value: 'sensitive' },
];

export default function PersonalityQuiz() {
  const router = useRouter();
  const { color } = router.query;
  const [personality, setPersonality] = useState('');

  const handleResult = () => {
    if (personality) {
      router.push({
        pathname: '/result',
        query: { color, personality },
      });
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-bold mb-4">你覺得自己屬於邊種性格？</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {personalityOptions.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setPersonality(value)}
            className={`p-4 rounded-xl border-2 transition ${personality === value ? 'border-murasaki-500 bg-murasaki-100' : 'border-gray-300 bg-white'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        onClick={handleResult}
        className="bg-murasaki-500 hover:bg-murasaki-700 text-white py-2 px-6 rounded-xl shadow"
        disabled={!personality}
      >
        查看推薦
      </button>
    </div>
  );
}
