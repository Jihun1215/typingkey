import { useEffect, useState } from "react";

export const useRandomTypingText = (
  defaultTypingData: Array<{ contents: string; author: string }>
) => {
  const [typingText, setTypingText] = useState<
    Array<{ contents: string; author: string }>
  >([]);

  const getRandomIndexes = (max: number, count: number) => {
    const indexes = Array.from({ length: max }, (_, index) => index);
    for (let i = indexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    return indexes.slice(0, count);
  };

  useEffect(() => {
    const randomIndexes = getRandomIndexes(defaultTypingData.length, 10);
    const randomTexts = randomIndexes.map(
      (index) => defaultTypingData[index] || {}
    );
    setTypingText(randomTexts as Array<{ contents: string; author: string }>);
  }, [defaultTypingData]);

  return typingText;
};
