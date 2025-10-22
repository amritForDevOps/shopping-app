import React, { useEffect, useState } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        setProducts(data || []);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Shopping Demo</h1>
      <p>Minimal demo frontend that fetches products from /api/products</p>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
