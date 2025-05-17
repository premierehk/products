// /pages/result.js

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function ResultPage() {
  const router = useRouter()
  const { colorType, personalityType } = router.query
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (colorType && personalityType) {
      fetch(`/api/getProducts?colorType=${colorType}&personalityType=${personalityType}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
    }
  }, [colorType, personalityType])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">為你推薦的飾物 💖</h1>

      {products.length === 0 ? (
        <p>暫時未有符合你測驗結果的產品。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border rounded-xl p-4 shadow">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />
              <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-pink-500 font-bold mt-1">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
