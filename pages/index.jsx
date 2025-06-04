import React from 'react';
import { useRouter } from 'next/router';

// Define featured products with their images
const featuredProducts = [
  { name: '粉色花朵耳環', image: '/products/IMG_5315.JPG' },
  { name: '藍色方形花卉耳環', image: '/products/IMG_5028.JPG' },
  { name: '藍色薄紗耳環', image: '/products/IMG_5317.JPG' },
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
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
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
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#3f52e1',
  },
  footer: {
    marginTop: 'auto',
    padding: '12px 0',
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
};

export default function Home() {
  const [btnHover, setBtnHover] = React.useState(false);
  const router = useRouter();

  return (
    <div style={styles.container}>
      <header style={styles.header}>Premiere HK Accessories</header>

      <section style={styles.section}>
        <h2 style={{ fontWeight: 600, fontSize: 24, marginBottom: 12 }}>
          Discover Your Perfect Match
        </h2>
        <p style={{ lineHeight: 1.5, fontSize: 16, color: '#555' }}>
          Take our personality test to find handmade accessories
          designed just for you.
        </p>
      </section>

      <section style={styles.section}>
        <button
          style={{
            ...styles.button,
            ...(btnHover ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          onClick={() => router.push('/personality')}
        >
          Start the Test
        </button>
      </section>

      <section style={styles.section}>
        <h3 style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>
          Featured Products
        </h3>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
          {featuredProducts.map((product, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 140px',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: 8,
                backgroundColor: '#fafafa',
                cursor: 'pointer',
              }}
              onClick={() => alert(`View product: ${product.name}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  height: 140,
                  width: '100%',
                  borderRadius: 10,
                  objectFit: 'cover',
                  marginBottom: 8,
                }}
              />
              <div style={{ fontWeight: 600, fontSize: 16, color: '#222' }}>
                {product.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>© 2025 Premiere HK. All rights reserved.</footer>
    </div>
  );
}