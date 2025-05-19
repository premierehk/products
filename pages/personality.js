import { useState, useRef } from 'react';

const questions = [
  {
    id: 'personality',
    question: '你覺得自己屬於邊種性格？',
    options: [
      { label: '開朗活潑', value: 'extrovert' },
      { label: '冷靜內斂', value: 'introvert' },
      { label: '創意豐富', value: 'creative' },
      { label: '細心敏銳', value: 'sensitive' },
    ],
  },
];

export default function ColoursQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const resultRef = useRef(null);

  const handleOptionChange = (qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = async () => {
    if (questions.some(q => !answers[q.id])) {
      alert('請完成所有問題');
      return;
    }

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      setRecommendations(data.products);
      setSubmitted(true);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Delay to allow rendering
    } catch (e) {
      alert('出錯，請稍後再試');
    }
  };

  return (
    <div className="max-w-[375px] mx-auto px-4 py-6 font-sans text-[#111] bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">個人化配對測試</h1>

      {!submitted && (
        <>
          {questions.map(({ id, question, options }) => (
            <div key={id} className="mb-6">
              <p className="text-lg font-medium mb-3">{question}</p>
              <div className="grid grid-cols-2 gap-4">
                {options.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => handleOptionChange(id, value)}
                    className={`p-4 rounded-xl border transition text-sm font-semibold shadow-sm ${
                      answers[id] === value
                        ? 'border-indigo-600 bg-indigo-100 text-indigo-800'
                        : 'border-gray-200 bg-gray-50 text-gray-700'
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
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-medium py-3 rounded-xl shadow transition"
            disabled={questions.some(q => !answers[q.id])}
          >
            提交
          </button>
        </>
      )}

      {submitted && (
        <div ref={resultRef} className="mt-10">
          <h2 className="text-xl font-bold mb-4">推薦產品</h2>
          {recommendations?.length > 0 ? (
            <ul>
              {recommendations.map((p, i) => (
                <li key={i} className="mb-6 p-4 border rounded-xl shadow-sm bg-gray-50">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-auto mb-3 rounded-lg"
                  />
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-sm text-gray-700">{p.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">無推薦產品</p>
          )}
        </div>
      )}
    </div>
  );
}
