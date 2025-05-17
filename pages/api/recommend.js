export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const userAnswers = req.body;

  // Your existing product catalog (can also load from a JSON file)
  const productsCatalog = `
產品清單：
1. Pearl Elegant - 優雅珍珠設計，適合正式場合佩戴。 圖片: products/pearl-elegant.png
2. Gold Classic - 經典金色飾品，適合各種風格。 圖片: products/gold-classic.png
3. Rose Charm - 玫瑰花造型，浪漫甜美。 圖片: products/rose-charm.png
`;

  // Create prompt including products list and user answers
const prompt = `
你是一個飾物推薦助手。以下是可供推薦的飾物清單：
${productsCatalog}

根據以下使用者資料，推薦三款最合適的飾物（名稱 + 描述 + 圖片路徑）：

${Object.entries(userAnswers)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')}

請以 JSON 陣列回應，每個元素包含 "name", "description" 和 "image"，且不要輸出其他內容。
`;

  const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || '';


    const productsMatch = textOutput.match(/\[.*\]/s);
    const parsed = productsMatch ? JSON.parse(productsMatch[0]) : [];

    res.status(200).json({ products: parsed });
    console.log("Gemini raw text output:", textOutput);

  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'AI 回應失敗' });
  }
}
