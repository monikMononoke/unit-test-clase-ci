import React from 'react';

export const usePolling = (pollingtime: number) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // Simular llamadas a una api y contarlas
    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, pollingtime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { count };
};
