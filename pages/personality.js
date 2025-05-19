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
