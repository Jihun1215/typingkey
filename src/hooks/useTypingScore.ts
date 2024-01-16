import { useState } from "react";
import Hangul from "hangul-js";

import {
  CHO_HANGUL,
  JUNG_HANGUL,
  JONG_HANGUL,
  // SPECIAL_VOWER,
} from "utils/hangulparts";

type HangulParts = {
  initial: string | null;
  medial: string | null;
  final: string | null;
};

export const useTypingScore = () => {
  const [hangulParts, setHangulParts] = useState<HangulParts>({
    initial: null,
    medial: null,
    final: null,
  });

  const separateHangul = (text: string) => {
    const separated = Hangul.disassemble(text);

    setHangulParts({
      initial: separated[0] || null,
      medial: separated[1] || null,
      final: separated[2] || null,
    });
  };

  // 초성, 중성, 종성에 따른 점수 설정
  const calculateScore = () => {
    let point = 0;
    // console.log(hangulParts);
    // 띄어쓰기일 경우
    if (hangulParts.initial === " ") {
      point = 1;
    } else {
      // 초성에 따른 점수
      if (CHO_HANGUL.includes(hangulParts.initial!)) {
        point += 1; // 초성이 CHO_HANGUL 배열에 속하면 1점
      }

      // 중성에 따른 점수
      if (JUNG_HANGUL.includes(hangulParts.medial!)) {
        point += 1; // 중성이 JUNG_HANGUL 배열에 속하면 2점
      }

      // 종성에 따른 점수
      if (JONG_HANGUL.includes(hangulParts.final!)) {
        // console.log("종성 일 경우");
        point += 2; // 종성이 JONG_HANGUL 배열에 속하면 3점
      }

      // 특수 모음에 따른 점수
      // if (
      //   SPECIAL_VOWER.includes(`${hangulParts.initial}${hangulParts.medial}`)
      // ) {
      //   console.log("특수문자 일 경우");
      //   point += 3; // 특수 모음이 SPECIAL_VOWER 배열에 속하면 5점
      // }
    }

    return point;
  };

  const point = calculateScore();

  //   console.log(point);
  return { point, separateHangul };
};
