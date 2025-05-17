// pages/api/recommend.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const answers = req.body;

  // Simulate logic — in future, use Hugging Face here
  // For now just return fake results based on simple rule
  const dummyProducts = [
    {
      name: 'Elegant Red Earrings',
      description: '適合優雅風格鍾意紅色的你',
      image: '/products/pearl-elegant.png',
    },

  ];

  // Simple matching logic
  const match = dummyProducts.find(p => {
    return (
      p.name.toLowerCase().includes(answers.favoriteColor) &&
      p.description.includes(answers.stylePreference)
    );
  });

  res.status(200).json({
    products: match ? [match] : [],
  });
}
