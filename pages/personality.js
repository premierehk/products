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
  {
    id: 'lifestyle',
    question: '你平時嘅生活節奏係點？',
    options: [
      { label: '快節奏，活動量高', value: 'fast-paced' },
      { label: '中等節奏，喜歡平衡', value: 'balanced' },
      { label: '慢節奏，享受靜態生活', value: 'slow-paced' },
    ],
  },
  {
    id: 'emotion',
    question: '你處理情緒嘅方式？',
    options: [
      { label: '即時講出嚟', value: 'expressive' },
      { label: '慢慢消化唔講出嚟', value: 'reserved' },
      { label: '轉化成創作或文字', value: 'reflective' },
    ],
  },
  {
    id: 'aesthetic',
    question: '你偏好嘅穿搭風格？',
    options: [
      { label: '可愛甜美', value: 'girly' },
      { label: '極簡清新', value: 'minimal' },
      { label: '華麗夢幻', value: 'luxury' },
      { label: '個性街頭', value: 'edgy' },
    ],
  },
  {
    id: 'risk',
    question: '你傾向挑戰新事物？',
    options: [
      { label: '絕對願意，超愛冒險！', value: 'adventurous' },
      { label: '有啲保留，要睇情況', value: 'cautious' },
      { label: '唔太鍾意改變', value: 'conservative' },
    ],
  },
];


const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    maxWidth: 375,
    margin: '0 auto',
    padding: '20px 16px',
    backgroundColor: '#fff',
    color: '#111',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  questionBlock: {
    marginBottom: 32,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionButton: isSelected => ({
    padding: '14px 12px',
    borderRadius: 12,
    border: `2px solid ${isSelected ? '#5568FE' : '#ddd'}`,
    backgroundColor: isSelected ? '#EEF0FF' : '#fff',
    color: isSelected ? '#5568FE' : '#333',
    fontWeight: '500',
    fontSize: 15,
    cursor: 'pointer',
    textAlign: 'center',
    marginBottom: 12,
    transition: '0.2s ease',
  }),
  button: {
    backgroundColor: '#5568FE',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    padding: '14px 24px',
    fontSize: 18,
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    boxShadow: '0 4px 10px rgba(85,104,254,0.3)',
    marginTop: 16,
  },
  productCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 10,
    marginBottom: 8,
  },
  footer: {
    marginTop: 'auto',
    padding: '12px 0',
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
};

export default function PersonalityPage() {
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
      }, 200);
    } catch (e) {
      alert('出錯，請稍後再試');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>配對測試</header>

      {!submitted && (
        <>
          {questions.map(({ id, question, options }) => (
            <div key={id} style={styles.questionBlock}>
              <p style={styles.questionText}>{question}</p>
              <div>
                {options.map(({ label, value }) => (
                  <div
                    key={value}
                    onClick={() => handleOptionChange(id, value)}
                    style={styles.optionButton(answers[id] === value)}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button onClick={handleSubmit} style={styles.button}>
            提交
          </button>
        </>
      )}

      {submitted && (
        <div ref={resultRef} style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: '700', marginBottom: 16 }}>推薦產品</h2>
          {recommendations?.length > 0 ? (
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {recommendations.map((p, i) => (
                <li key={i} style={styles.productCard}>
                  <img src={p.image} alt={p.name} style={styles.image} />
                  <h3 style={{ fontSize: 16, fontWeight: '600' }}>{p.name}</h3>
                  <p style={{ fontSize: 14, color: '#555' }}>{p.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#888' }}>無推薦產品</p>
          )}
        </div>
      )}

      <footer style={styles.footer}>&copy; 2025 Premiere HK. All rights reserved.</footer>
    </div>
  );
}
