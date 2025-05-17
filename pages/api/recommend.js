
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const userAnswers = req.body;

  const prompt = `
你是一個飾物推薦助手。根據以下使用者資料推薦三款最合適的飾物（名稱 + 描述）：

${Object.entries(userAnswers)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')}

請以 JSON 陣列回應，每個元素包含 "name" 和 "description"，不要輸出其他內容。
`;

  const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    const textOutput =
      data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const productsMatch = textOutput.match(/\[.*\]/s);
    const parsed = productsMatch ? JSON.parse(productsMatch[0]) : [];

    res.status(200).json({ products: parsed });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'AI 回應失敗' });
  }
}
