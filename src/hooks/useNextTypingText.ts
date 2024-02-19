import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { AlertModalState } from "state/atoms";
import { TextItem } from "types/type";

export const useNextTypingText = (
  typingText: TextItem[],
  typingCount: number
): string => {
  const [nextTypingText, setNextTypingText] = useState("");
  // 결과창 모달 관리하는 State
  const [, SetModalVisibility] = useRecoilState(AlertModalState);

  const setNextText = useCallback(() => {
    if (typingText.length > 0) {
      if (typingCount >= 10) {
        setNextTypingText("");
        SetModalVisibility(true);
      } else if (typingCount === 9) {
        setNextTypingText("");
      } else {
        setNextTypingText(typingText[typingCount + 1]?.contents || "");
      }
    }
  }, [typingCount, typingText, SetModalVisibility]);

  useEffect(() => {
    setNextText();
  }, [setNextText]);

  return nextTypingText;
};
