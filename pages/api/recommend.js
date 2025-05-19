export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const userAnswers = req.body;

  // Your existing product catalog (can also load from a JSON file)
  const productsCatalog = `
名稱: 創意編織耳環 圖片: products/IMG_5315.JPG
名稱: 個性流蘇耳環 圖片: products/IMG_5319.JPG
名稱: 耳環 圖片: products/IMG_5324.JPG
`;

  // Create prompt including products list and user answers
const prompt = `
你是一個飾物推薦助手。以下是可供推薦的飾物清單：
${productsCatalog}

根據以下使用者資料，推薦兩款最合適的飾物（名稱 + 合適原因 + 圖片路徑 + ）：

${Object.entries(userAnswers)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')}

請用中文以 JSON 陣列回應，先找找看那一張圖最附合users的選擇，每個元素包含 "name", "description" 和 "image"，名稱只能是6個中文字，且輸出為什你覺得合適。
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
