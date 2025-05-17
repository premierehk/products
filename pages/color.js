// /pages/quiz/color.js
import { useRouter } from 'next/router';
import { useState } from 'react';

const colorOptions = [
  { color: '紅色', value: 'red' },
  { color: '藍色', value: 'blue' },
  { color: '綠色', value: 'green' },
  { color: '紫色', value: 'purple' },
];

export default function ColorQuiz() {
  const [selectedColor, setSelectedColor] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (selectedColor) {
      router.push({
        pathname: '/quiz/personality',
        query: { color: selectedColor },
      });
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-bold mb-4">你最鍾意邊隻色？</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {colorOptions.map(({ color, value }) => (
          <button
            key={value}
            onClick={() => setSelectedColor(value)}
            className={`p-4 rounded-xl border-2 transition ${selectedColor === value ? 'border-murasaki-500 bg-murasaki-100' : 'border-gray-300 bg-white'}`}
          >
            {color}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="bg-murasaki-500 hover:bg-murasaki-700 text-white py-2 px-6 rounded-xl shadow"
        disabled={!selectedColor}
      >
        下一步
      </button>
    </div>
  );
}
