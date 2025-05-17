import { useState } from 'react';

const questions = [
  {
    id: 'favoriteColor',
    question: '你最鍾意邊隻色？',
    options: [
      { label: '紅色', value: 'red' },
      { label: '藍色', value: 'blue' },
      { label: '綠色', value: 'green' },
      { label: '紫色', value: 'purple' },
    ],
  },
  {
    id: 'stylePreference',
    question: '你喜歡咩風格？',
    options: [
      { label: '優雅', value: 'elegant' },
      { label: '活力', value: 'energetic' },
      { label: '自然', value: 'natural' },
      { label: '前衛', value: 'avantgarde' },
    ],
  },
  // Add more questions as needed
];

export default function ColoursQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const handleOptionChange = (qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = async () => {
    // Validate all questions answered
    if (questions.some(q => !answers[q.id])) {
      alert('請完成所有問題');
      return;
    }

    // Send answers to backend AI endpoint
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      setRecommendations(data.products); // Assume products array returned
      setSubmitted(true);
    } catch (e) {
      alert('出錯，請稍後再試');
    }
  };

  if (submitted) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">推薦產品</h2>
      {recommendations?.length > 0 ? (
  <ul>
    {recommendations.map((p, i) => (
      <li key={i} className="mb-4 border p-4 rounded shadow">
        <img src={p.image} alt={p.name} className="w-full h-auto mb-2 rounded" />
        <h3 className="font-semibold">{p.name}</h3>
        <p>{p.description}</p>
      </li>
    ))}
  </ul>
) : (
  <p>無推薦產品</p>
)}

      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">個人化配對測試</h1>
      {questions.map(({ id, question, options }) => (
        <div key={id} className="mb-6">
          <p className="mb-2">{question}</p>
          <div className="grid grid-cols-2 gap-4">
            {options.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => handleOptionChange(id, value)}
                className={`p-3 rounded border ${
                  answers[id] === value
                    ? 'border-indigo-600 bg-indigo-100'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-6 py-2 rounded disabled:opacity-50"
        disabled={questions.some(q => !answers[q.id])}
      >
        提交
      </button>
    </div>
  );
}
