import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  ModeToggleState,
  TypingKRState,
  TextValueState,
  AlertModalState,
  TypingCountState,
  TypingWrongCountState,
  TypingProgressState,
  TypingAccuracyArrState,
  TypingTimeState,
  TypingTimeArrState,
  TypingCpmState,
  TypingCpmArrState,
  TypingSpeedState,
  TypingincorrectArrState,
} from "state/atoms";

import { defaultKRTypingData, defaultEnTypingData } from "utils/TypingMockData";
import {
  useCurrentTypingText,
  useRandomTypingText,
  useNextTypingText,
} from "hooks";

import Hangul from "hangul-js";

export const Typing = () => {
  const mode = useRecoilValue(ModeToggleState);
  const TypingKrCheck = useRecoilValue(TypingKRState);
  const AlertModalCheck = useRecoilValue(AlertModalState);

  // input Ref
  const valueRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (AlertModalCheck) {
      valueRef.current = null;
    }
  }, [AlertModalCheck]);

  const typingText = useRandomTypingText(
    TypingKrCheck ? defaultKRTypingData : defaultEnTypingData
  );

  // 타이핑 된 문장 갯수를 카우팅 하는 State
  const [typingCount, setTypingCount] = useRecoilState(TypingCountState);

  const nextTypingText = useNextTypingText(typingText, typingCount);
  const currentTypingText = useCurrentTypingText(typingText, typingCount);

  // 타이핑 틀린 갯수 카운팅 하는 State
  const [wrongCount, SetWrongCount] = useRecoilState(TypingWrongCountState);

  // 최초 타이핑 시작 시간
  const [time, setTime] = useRecoilState(TypingTimeState);
  // 타이핑 시간을 저장하는 Arr State
  const [timeArr, setTimeArr] = useRecoilState(TypingTimeArrState);
  const [timecheck, setTimeCheck] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // 타이핑된 값
  const [typingValue, setTypingValue] = useRecoilState(TextValueState);
  // 틀린부분 인덱스를 보관하는 State
  const [incorrectIndices, setIncorrectIndices] = useRecoilState<number[]>(
    TypingincorrectArrState
  );

  // 현재 문장의 정확도 관리하는 State
  const [accuracy, setAccuracy] = useState(0);
  const [accuracyArr, setAccuracyArr] = useRecoilState(TypingAccuracyArrState);
  // 현재 문장의 진행도를 저장하는 State
  const [, SetProgress] = useRecoilState(TypingProgressState);

  useEffect(() => {
    let timer: NodeJS.Timeout | number | null = null;

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
    }
    // timecheck False일때
    else {
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

  useEffect(() => {
    setTimeCheck(false);
  }, [TypingKrCheck]);

  // CPM을 저장하는 State
  const [cpm, setCpm] = useState(0);
  const [, setCurrentCpm] = useRecoilState(TypingCpmState);

  const [cpmArr, setCpmArr] = useRecoilState(TypingCpmArrState);
  const [, setResultSpeed] = useRecoilState(TypingSpeedState);

  const currentTypingArr = currentTypingText?.contents.split("");

  let textChars = 0;
  let correctChars = 0;
  let incorrectChars = 0;

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // console.log(valueRef.current?.value);

    // 모든 글자가 한글, 띄어쓰기, 또는 특수문자인지 체크
    const isAllHangulOrSpaceOrSpecialChar = Array.from(inputValue).every(
      (char) => Hangul.isComplete(char) || char === " " || /[.,;'"]/g.test(char)
    );

    const inputLength = inputValue.length;

    const currentTextLength = currentTypingArr?.length;

    for (let i = 0; i < inputValue.length; i++) {
      if (inputValue[i] === currentTypingText?.contents[i]) {
        correctChars++;
        textChars++;
      } else {
        incorrectChars++;
        textChars++;
      }
    }

    // 틀린 부분의 해당하는 인덱스를 찾는 함수
    const incorrectIndices: number[] = [];
    for (let i = 0; i < Math.max(prompt.length, inputLength); i++) {
      if (currentTypingText?.contents[i] !== inputValue[i]) {
        incorrectIndices.push(i);
      }
    }

    if (isAllHangulOrSpaceOrSpecialChar) {
      // 타자 수가 증가 할때마다 정확한 타자와 부정확한 타자를 체크하여 증가하는 반복문
      const saveSpeed = time !== 0 ? Math.round((textChars / time) * 60) : 0;
      setResultSpeed(saveSpeed + 135);

      const cpmValue =
        currentTextLength === undefined || time === 0 || correctChars === 0
          ? 0
          : Math.round((correctChars / time!) * 60);

      setCpm(cpmValue);

      if (inputValue.length === 0) {
        setResultSpeed(0);
      }

      const accuracy =
        currentTextLength === undefined
          ? 0
          : Number(
              ((correctChars / (correctChars + incorrectChars)) * 100).toFixed(
                0
              )
            );

      setAccuracy(accuracy);

      // 진행도
      const progress =
        currentTextLength === undefined
          ? 0
          : parseFloat(((inputLength / currentTextLength) * 100).toFixed(0));
      SetProgress(progress);
    }

    setIncorrectIndices(incorrectIndices);
    setTypingValue(inputValue);
    setTimeCheck(true);

    if (timecheck && inputLength === 0) {
      setTimeCheck(false);
      setTime(0);
    }

    // 최초로 타이핑이 시작되고 timecheck가 false일 때만 timecheck를 true로 설정
    if (!timecheck && inputValue.length > 0) {
      setTimeCheck(true);
    }
  };

  // const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     if (typingValue.length === currentTypingText?.contents.length) {
  //       hadleSumit();
  //       setTypingValue("");
  //       setTimeCheck(false);
  //       setIncorrectIndices([]);
  //     }
  //   }
  // };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const currentContents = currentTypingText?.contents;
      // typingValue 마지막 길이 값이 따라칠 문장 마지막 글자와 동일 할 때만 작동하는
      if (currentContents && typingValue.endsWith(currentContents.slice(-1))) {
        hadleSumit();
        setTypingValue("");
        setTimeCheck(false);
        setIncorrectIndices([]);
      }
    }
  };

  const hadleSumit = () => {
    const mismatchIndexes: number[] = [];
    const isMatch = typingValue.split("").every((char, index) => {
      if (char !== currentTypingText!.contents[index]) {
        mismatchIndexes.push(index);
        return false;
      }
      return true;
    });
    // 오타가 없을 경우
    if (isMatch) {
      setTypingCount(typingCount + 1);
      setTypingValue("");
    }
    // 오타가 있을 경우
    else {
      setTypingCount(typingCount + 1);
      SetWrongCount(wrongCount + incorrectIndices.length);
      setTypingValue("");
    }
    if (typingCount === 0) {
      setAccuracyArr([accuracy]);
      setTimeArr([time]);
      setCpmArr([cpm]);
      setTimeCheck(false);
    } else {
      // 문장 당 정확도
      const copyAccArr = [...accuracyArr];
      copyAccArr.push(accuracy);
      setAccuracyArr(copyAccArr);

      // 문장 당 타이핑 시간
      const copyTimeArr = [...timeArr];
      copyTimeArr.push(time);
      setTimeArr(copyTimeArr);

      const copyCpmArr = [...cpmArr];
      copyCpmArr.push(cpm);
      setCpmArr(copyCpmArr);

      setTimeCheck(false);
    }
    setIncorrectIndices([]);
    setCurrentCpm(0);
    setResultSpeed(0);
    setTypingValue("");
    SetProgress(0);
  };

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
          // onKeyPress={onKeyPress}
          placeholder="위 문장을 타이핑 하세요."
          mode={mode.toString()}
        />
        <NextTypingTextArea>
          <p>NEXT {nextTypingText}</p>
        </NextTypingTextArea>
      </InputArea>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 160px;
  margin-top: 20px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  background-color: ${({ theme }) => theme.bgColor2};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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

const TextInput = styled.input<{ mode: string }>`
  width: 90%;
  height: 45px;
  border-bottom: 3px solid
    ${(props) => (props.mode === "true" ? "#F6F6F6" : "#9A9A9A")};
  font-size: 20px;
  color: ${({ theme }) => theme.color};
  transition: 0.3s;
  ${({theme}) => theme.PretendardFontBody}
  background-color: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
  &:focus {
    border-bottom: 3px solid ${({ theme }) => theme.colors.greey};
  }
  
`;

const NextTypingTextArea = styled.div`
  width: 90%;
  height: 30px;
  padding-left: 10px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  gap: 0 5px;
  color: ${({ theme }) => theme.colors.gray3};
  p {
    color: ${({ theme }) => theme.colors.gray4};
    font-weight: 500;
  }
`;
