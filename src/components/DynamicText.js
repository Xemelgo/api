import React, { useState, useEffect } from 'react';

const words = ["shipments", "inventory", "supply chain", "work orders", "assets"];

const DynamicText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <span style={{ color: "#0D8CFF", fontWeight: "bold" }}>{words[index]}</span>;
};

export default DynamicText;
