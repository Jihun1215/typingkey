import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import {
  TextValueState,
  TypingCountState,
  TypingWrongCountState,
} from "state/atoms";

import { useRandomTypingText } from "hooks/useRandomTypingText";

import { defaultTypingData } from "utils/TypingMockData";

export const Typing = () => {
  const typingText = useRandomTypingText(defaultTypingData);

  const valueRef = useRef<HTMLInputElement>(null);
  // 타이핑 된 문장 갯수를 카우팅 하는 State
  const [typingCount, setTypingCount] = useRecoilState(TypingCountState);
  // 타이핑 틀린 갯수 카운팅 하는 State
  const [wrongCount, SetWrongCount] = useRecoilState(TypingWrongCountState);

  // 따라 칠 문장을 보여주기 위한 코드
  const [currentTypingText, setCurrentTypingText] = useState("");
  // useEffect를 사용하여 따라친 문장을 가져오는 함수
  useEffect(() => {
    if (typingText.length > 0) {
      if (typingCount === 10) {
        setCurrentTypingText("");
      } else {
        setCurrentTypingText(typingText[typingCount].contents);
      }
    }
  }, [typingCount, typingText]);

  // 타이핑된 값
  const [typingValue, setTypingValue] = useRecoilState(TextValueState);

  // 바꿔야할 코드
  // const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputValue = e.target.value;
  //   setTypingValue(inputValue);

  //   // 입력된 값과 따라 쳐야 할 문장의 길이가 같을 때 비교
  //   if (inputValue.length === currentTypingText.length) {
  //     // 각 글자를 비교하여 일치 여부에 따라 상태 업데이트
  //     wconst isMatch = inputValue
  //       .split("")
  //       .every((char, index) => char === currentTypingText[index]);

  //     if (isMatch) {
  //       // 입력된 값과 따라 쳐야 할 문장이 일치할 때의 처리
  //       setTypingCount(typingCount + 1);
  //       setTypingValue(""); // 다음 문장을 받기 위해 입력 값 초기화

  //       if (typingCount === 9) {
  //         console.log("끝");
  //         // 여기서 끝나는 로직 추가
  //       }
  //     } else {
  //       // 입력된 값과 따라 쳐야 할 문장이 일치하지 않을 때의 처리
  //       console.log("틀림");
  //     }
  //   }
  // };

  const [incorrectIndices, setIncorrectIndices] = useState<number[]>([]);
  // console.log(incorrectIndices);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // console.log(currentTypingText.length);
    // console.log(inputValue);

    // 틀린 부분을 찾아서 인덱스를 저장
    const incorrectIndices: number[] = [];
    for (let i = 0; i < Math.max(prompt.length, inputValue.length); i++) {
      if (currentTypingText[i] !== inputValue[i]) {
        incorrectIndices.push(i);
      }
    }
    setIncorrectIndices(incorrectIndices);

    setTypingValue(inputValue);
  };

  // 변경된 부분
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (typingValue.length === currentTypingText.length) {
        const mismatchIndexes: number[] = [];

        const isMatch = typingValue.split("").every((char, index) => {
          // console.log(char);
          if (char !== currentTypingText[index]) {
            mismatchIndexes.push(index);
            console.log(index);
            return false;
          }
          return true;
        });

        if (isMatch) {
          setTypingCount(typingCount + 1);
          setTypingValue("");

          if (typingCount === 9) {
            console.log("끝");
            // 여기서 끝나는 로직 추가
          }
        }
        // 틀렸을때 틀리부분을 카운트올리고 초기화 시키기
        else {
          SetWrongCount(wrongCount + mismatchIndexes.length);
          setTypingValue("");
          console.log("틀림");
          console.log("틀린 부분 인덱스:", mismatchIndexes);

          // // 여기에서 mismatchIndexes를 사용하여 시각적으로 어떤 부분이 틀렸는지 표시
          // const mismatchedText = currentTypingText
          //   .split("")
          //   .map((char, index) => {
          //     if (mismatchIndexes.includes(index)) {
          //       return `<span style="color: red">${char}</span>`;
          //     }
          //     return char;
          //   })
          //   .join("");

          // console.log("시각적으로 표시:", mismatchedText);
          // 여기에서 mismatchedText를 활용하여 시각적으로 틀린 부분을 표시하는 등의 로직을 추가하면 됩니다.
        }
      }
    }
  };

  // 다음 타이핑 문장 미리보여주는 변수
  const [nextTypingText, setNextTypingText] = useState("");
  useEffect(() => {
    if (typingText.length > 0) {
      // 이번째 타이핑 끝 나고 점수판 보여주고 다시 시작할 수 있게 구현ㄴ
      if (typingCount >= 10) {
        setNextTypingText("");
        alert("점수판");
      } else if (typingCount === 9) {
        setNextTypingText("");
      } else {
        setNextTypingText(typingText[typingCount + 1].contents);
      }
    }
  }, [typingCount, typingText]);

  const data = currentTypingText.split("");
  return (
    <Container>
      <TextView>
        <Text>
          {data.map((char, index) => {
            return (
              <p
                key={index}
                style={{
                  whiteSpace: "pre",
                  color: incorrectIndices.includes(index) ? "red" : "inherit",
                }}
              >
                {incorrectIndices.includes(index) && char === " " ? (
                  <span>_</span>
                ) : (
                  char
                )}
              </p>
            );
          })}
        </Text>
      </TextView>

      <InputArea
      // onSubmit={onSubmit}
      >
        <TextInput
          type="text"
          ref={valueRef}
          value={typingValue}
          onChange={onChangeValue}
          onKeyDown={onKeyDown}
          placeholder="위 문장을 타이핑 하세요."
        />
        <NextTypingTextArea>
          NEXT
          <p>{nextTypingText}</p>
        </NextTypingTextArea>
      </InputArea>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: 160px;
  margin-bottom: 25px;
  border-radius: 4px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  background: #fff;
`;

const TextView = styled.div`
  width: 100%;
  height: 80px;
  ${({ theme }) => theme.BoxCenter};
`;

const Text = styled.div`
  width: 90%;
  height: 50px;
  background-color: ${({ theme }) => theme.bgColor};
  color: #fff;
  font-size: 20px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  padding-left: 10px;
`;

const InputArea = styled.div`
  width: 100%;
  height: 80px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  gap: 5px 0;
`;

const TextInput = styled.input`
  width: 90%;
  height: 40px;
  border-bottom: 2px solid #63a080;
  font-size: 20px;
  color: #333;
  transition: 0.3s;
  padding-left: 10px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
  &:focus {
    border-bottom: 2px solid #0288d1;
  }
`;

const NextTypingTextArea = styled.div`
  width: 90%;
  height: 20px;
  padding-left: 10px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  gap: 0 5px;
  color: ${({ theme }) => theme.colors.gray};
  p {
    color: ${({ theme }) => theme.colors.black};
  }
`;
