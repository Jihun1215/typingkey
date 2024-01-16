import { useState, useEffect } from "react";

import { TextItem } from "components/types/type";


export const useCurrentTypingText = (
  typingText: TextItem[],
  typingCount: number
): TextItem | undefined => {
  const [currentTypingText, setCurrentTypingText] = useState<
    TextItem | undefined
  >(undefined);

  useEffect(() => {
    if (typingText.length > 0) {
      if (typingCount === 10) {
        setCurrentTypingText(undefined);
      } else {
        setCurrentTypingText(typingText[typingCount]);
      }
    }
  }, [typingCount, typingText]);

  return currentTypingText;
};

