import { useState, useEffect } from 'react';

export default function LiveCarCounter() {
  const [count, setCount] = useState(250000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="text-4xl lg:text-5xl font-bold mb-2">{count.toLocaleString()}+</p>
      <p className="text-red-100 text-sm lg:text-base">Cars Serviced</p>
    </div>
  );
}
