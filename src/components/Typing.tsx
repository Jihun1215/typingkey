import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import {
  TextValueState,
  TypingCountState,
  TypingWrongCountState,
  AlertModalState,
  TypingTimeState,
  TypingProgressState,
} from "state/atoms";

import { useRandomTypingText } from "hooks/useRandomTypingText";
import { defaultTypingData } from "utils/TypingMockData";

import { Alert } from "./Alert";

interface TextItem {
  contents: string;
  author: string;
}
export const Typing = () => {
  const [alertModalVisibility, SetAlertModalVisibility] =
    useRecoilState(AlertModalState);

  const typingText = useRandomTypingText(defaultTypingData);

  const valueRef = useRef<HTMLInputElement>(null);
  // 타이핑 된 문장 갯수를 카우팅 하는 State
  const [typingCount, setTypingCount] = useRecoilState(TypingCountState);
  // 타이핑 틀린 갯수 카운팅 하는 State
  const [wrongCount, SetWrongCount] = useRecoilState(TypingWrongCountState);

  // 따라 칠 문장을 보여주기 위한 코드
  const [currentTypingText, setCurrentTypingText] = useState<
    TextItem | undefined
  >(undefined);

  // 최초 타이핑 시작 시간
  const [time, setTime] = useRecoilState(TypingTimeState);
  const [timecheck, setTimeCheck] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let timer: number | null = null;

    if (timecheck) {
      // 시작 시간 기록
      if (startTime === null) {
        setStartTime(Date.now());
      }

      // 1초마다 현재 시간 갱신
      timer = setInterval(() => {
        const elapsedTime = Date.now() - (startTime || 0);
        const trimmedElapsedTime = Math.floor(elapsedTime / 1000);
        setTime(trimmedElapsedTime);
      }, 1000);
    } else {
      setTime(0);
      setStartTime(null);
      // 스피드 초기화
      if (timer) {
        clearInterval(timer);
      }
    }

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timecheck, startTime, setTime]);

  // useEffect를 사용하여 따라친 문장을 가져오는 함수
  useEffect(() => {
    if (typingText.length > 0) {
      if (typingCount === 10) {
        setCurrentTypingText(undefined);
      } else {
        setCurrentTypingText(typingText[typingCount]);
      }
    }
  }, [typingCount, typingText]);

  // 타이핑된 값
  const [typingValue, setTypingValue] = useRecoilState(TextValueState);

  const [incorrectIndices, setIncorrectIndices] = useState<number[]>([]);

  // 정확도 관리하는 State
  // const [accuracy, SetAccuracy] = useState(0);

  const [, SetProgress] = useRecoilState(TypingProgressState);

  // input 값이 입력이될때의 작동하는 함수
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // const curretTextLength = currentTypingArr?.length;
    const inputLength = inputValue.length;

    const currentTextLength = currentTypingArr?.length;

    let correctChars = 0;
    let incorrectChars = 0;

    for (let i = 0; i < inputValue.length; i++) {
      if (inputValue[i] === currentTypingText?.contents[i]) {
        correctChars++;
      } else {
        incorrectChars++;
      }
    }

    // Calculate accuracy percentage
    const accuracy =
      currentTextLength === undefined
        ? 0
        : Number(
            ((correctChars / (correctChars + incorrectChars)) * 100).toFixed(0)
          );
    // parseFloat(inputLength / currentTextLength) * 100).toFixed(1));
    console.log("정확도", accuracy);
    // setAccuracy(newAccuracy);

    // 진행도
    const progress =
      currentTextLength === undefined
        ? 0
        : parseFloat(((inputLength / currentTextLength) * 100).toFixed(0));
    SetProgress(progress);

    // 틀린 부분의 해당하는 인덱스를 찾는 함수
    const incorrectIndices: number[] = [];
    for (let i = 0; i < Math.max(prompt.length, inputLength); i++) {
      if (currentTypingText?.contents[i] !== inputValue[i]) {
        incorrectIndices.push(i);
      }
    }

    setIncorrectIndices(incorrectIndices);
    setTypingValue(inputValue);
    setTimeCheck(true);

    // 최초로 타이핑이 시작되고 timecheck가 false일 때만 timecheck를 true로 설정
    if (!timecheck && inputValue.length > 0) {
      setTimeCheck(true);
    }
  };
  // 변경된 부분
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // 이력한 타자 Length와 따라칠 타주 Length가 같을 경우에
      if (typingValue.length === currentTypingText?.contents.length) {
        const mismatchIndexes: number[] = [];

        const isMatch = typingValue.split("").every((char, index) => {
          if (char !== currentTypingText.contents[index]) {
            mismatchIndexes.push(index);
            return false;
          }
          return true;
        });
        // 오타가 없을 경우
        if (isMatch) {
          setTypingValue("");
          setTypingCount(typingCount + 1);

          if (typingCount === 9) {
            console.log("끝");
            // 여기서 끝나는 로직 추가
          }
        }
        // 오타가 있을 경우
        else {
          setTypingValue("");
          setTypingCount(typingCount + 1);
          SetWrongCount(wrongCount + incorrectIndices.length);
        }
      }
    }
  };

  // 다음 타이핑 문장 미리보여주는 변수
  const [nextTypingText, setNextTypingText] = useState("");
  useEffect(() => {
    if (typingText.length > 0) {
      // 마지막 타이핑 이후에는 NEXT 영역 비우고 알림 모달을 띄움
      if (typingCount >= 10) {
        setNextTypingText("");
        SetAlertModalVisibility(true);
        setTimeCheck(false);
      } else if (typingCount === 9) {
        setNextTypingText("");
      } else {
        // 다음 타이핑 문장 설정
        setNextTypingText(typingText[typingCount + 1].contents);
      }
    }
  }, [typingCount, typingText]);

  const currentTypingArr = currentTypingText?.contents.split("");

  return (
    <Container>
      <TextView>
        <Text>
          <TypingWord>
            {currentTypingArr?.map((char, index) => {
              return (
                <p
                  key={index}
                  style={{
                    position: "relative",
                    whiteSpace: "pre",
                  }}
                >
                  <Circle
                    style={{
                      whiteSpace: "pre",
                      background: incorrectIndices.includes(index)
                        ? "#f03e3e"
                        : "inherit",
                    }}
                  />
                  {incorrectIndices.includes(index) && char === " " ? (
                    <p style={{ color: "#f03e3e" }}>_</p>
                  ) : (
                    char
                  )}
                </p>
              );
            })}
          </TypingWord>
          <TypingAuthor>{currentTypingText?.author}</TypingAuthor>
        </Text>
      </TextView>

      <InputArea>
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
      {alertModalVisibility && <Alert />}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 4px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
`;

const TextView = styled.div`
  width: 100%;
  height: 80px;
  ${({ theme }) => theme.BoxCenter};
`;

const Text = styled.div`
  position: relative;
  width: 90%;
  height: 70px;
  color: ${({ theme }) => theme.color};
  font-size: 20px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
  padding-left: 10px;
`;

const TypingWord = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
  margin-top: 15px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
`;

const TypingAuthor = styled.span`
  width: 100%;
  height: 20%;
  margin-bottom: 5px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray3};
`;

const Circle = styled.span`
  position: absolute;
  margin: 0px auto;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
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
  height: 45px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray1};
  font-size: 20px;
  color: ${({ theme }) => theme.color};
  transition: 0.3s;
  padding-left: 10px;
  background-color: transparent;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
  &:focus {
    /* border-bottom: 2px solid #0288d1; */
    border-bottom: 2px solid #69db7c;
    /* #69db7c */
  }
`;

const NextTypingTextArea = styled.div`
  width: 90%;
  height: 20px;
  padding-left: 10px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  gap: 0 5px;
  color: ${({ theme }) => theme.colors.gray3};
  p {
    color: ${({ theme }) => theme.colors.gray4};
    font-weight: 600;
  }
`;
