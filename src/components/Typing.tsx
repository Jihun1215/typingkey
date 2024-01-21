import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  ModeToggleState,
  TypingKRState,
  TextValueState,
  TypingCountState,
  TypingWrongCountState,
  TypingProgressState,
  // TypingAccuracyState,
  TypingAccuracyArrState,
  TypingTimeState,
  TypingTimeArrState,
  TypingCpmState,
  TypingCpmArrState,
  // TypingCpmState,
  TypingSpeedState,
} from "state/atoms";

import { defaultKRTypingData, defaultEnTypingData } from "utils/TypingMockData";
import {
  useCurrentTypingText,
  useRandomTypingText,
  useNextTypingText,
} from "hooks";

export const Typing = () => {
  const mode = useRecoilValue(ModeToggleState);
  const TypingKrCheck = useRecoilValue(TypingKRState);

  const typingText = useRandomTypingText(
    TypingKrCheck ? defaultKRTypingData : defaultEnTypingData
  );

  // input Ref
  const valueRef = useRef<HTMLInputElement>(null);

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
  // console.log(typingValue);
  // 틀린부분 인덱스를 보관하는 State
  const [incorrectIndices, setIncorrectIndices] = useState<number[]>([]);

  // 현재 문장의 정확도 관리하는 State
  const [accuracy, setAccuracy] = useState(0);
  const [accuracyArr, setAccuracyArr] = useRecoilState(TypingAccuracyArrState);
  // 현재 문장의 진행도를 저장하는 State
  const [, SetProgress] = useRecoilState(TypingProgressState);

  useEffect(() => {
    let timer: number | null = null;

    if (timecheck) {
      // 시작 시간 기록
      if (startTime === null) {
        setStartTime(Date.now());
        // setTypingValue("");
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

  // CPM을 저장하는 State
  const [cpm, setCpm] = useState(0);
  const [, setCurrentCpm] = useRecoilState(TypingCpmState);

  const [cpmArr, setCpmArr] = useRecoilState(TypingCpmArrState);
  const [speed, setSpeed] = useRecoilState(TypingSpeedState);

  // console.log(speed);
  // const { point, separateHangul } = useTypingScore();

  // 작성한 타자
  let textChars = 0;
  // 정확한 타자
  let correctChars = 0;
  // 틀린 타자
  let incorrectChars = 0;
  //  타자스피드
  let resultSpeed = 0;

  // count를 위한 state 추가
  const [speedcount, setSpeedCount] = useState(0);

  // input 값이 입력이될때의 작동하는 함수
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const inputLength = inputValue.length;
    // onChangeSpeed();

    const currentTextLength = currentTypingArr?.length;

    // 타자 수가 증가 할때마다 정확한 타자와 부정확한 타자를 체크하여 증가하는 반복문
    for (let i = 0; i < inputValue.length; i++) {
      if (inputValue[i] === currentTypingText?.contents[i]) {
        correctChars++;
        textChars++;
      } else {
        incorrectChars++;
        textChars++;
      }
    }
    resultSpeed = Math.round((textChars / time) * 60);
    setSpeed(resultSpeed + 135);
    // 아무 입력이 없을 때에도 textChars를 감소시킴
    // textChars = Math.max(textChars - 1, 0);
    // setSpeed(resultSpeed + 135);

    const cpmValue =
      currentTextLength === undefined || time === 0 || correctChars === 0
        ? 0
        : Math.round((correctChars / time!) * 60);

    setCpm(cpmValue);

    if (inputValue.length === 0) {
      setSpeed(0);
    }

    const accuracy =
      currentTextLength === undefined
        ? 0
        : Number(
            ((correctChars / (correctChars + incorrectChars)) * 100).toFixed(0)
          );

    setAccuracy(accuracy);

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
    // startTypingInterval(inputValue);

    // 최초로 타이핑이 시작되고 timecheck가 false일 때만 timecheck를 true로 설정
    if (!timecheck && inputValue.length > 0) {
      setTimeCheck(true);
      // startTypingInterval();
      // startTypingInterval(inputValue);
    }
  };

  // useEffect(() => {
  //   // 최초 실행될 때 한 번만 실행
  //   const previousValue = typingValue; // 기존 값 저장
  //   const timerId = setTimeout(() => {
  //     // 0.3초 후에 값이 변경되었는지 확인
  //     if (typingValue !== previousValue) {
  //       console.log("0.3초 동안 값이 변경되었습니다.");
  //     } else {
  //       console.log("0.3초 동안 값이 변경되지 않았습니다.");
  //     }
  //     // setSpeedCount((prev) => prev + 5);
  //   }, 500);

  //   // 컴포넌트가 언마운트되거나 onChangeValue가 호출되면 타이머 정리
  //   return () => {
  //     clearTimeout(timerId);
  //   };
  // }, [typingValue]);

  // console.log(speedcount);
  // const [intervalId, setIntervalId] = useState<number | null>(null);

  // 0.1초마다 작동하는 함수
  // const startTypingInterval = (text: string) => {
  // console.log(text);
  // 파라미터로 받는 text.length가 계속 그대로라면 카운터로 점수줄여기
  // 0.2초가 지나도 그대로 라면 count + 5씩 증가
  // const prevLength = typingValue.length;
  // console.log(typingValue);

  // const count = 0;
  // console.log(text.length);
  // console.log(currentTypingArr?.length);
  // const interval = setInterval(() => {
  // const currentLength = typingValue.length;
  // console.log(typingValue);
  // }, 2000);

  // setIntervalId(interval);
  // };

  // 타이핑 시 스피드 줄어는 함수 정지시키는 함수
  // const stopTypingInterval = () => {
  //   if (intervalId !== null) {
  //     clearInterval(intervalId);
  //     setIntervalId(null);
  //   }
  // };

  // 엔터 클릭 시
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // 타자 Length와 따라칠 타자 Length가 같을 경우에
      if (typingValue.length === currentTypingText?.contents.length) {
        // 엔터 키를 누르면 타이핑 멈춤
        // stopTypingInterval();
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

        // 첫문장 타이핑 중이라면
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
        // 리코일 cpm 제거하기
        setCurrentCpm(0);
        setSpeed(0);
        setTypingValue("");
        SetProgress(0);
      }
    }
  };

  const currentTypingArr = currentTypingText?.contents.split("");

  return (
    <Container>
      <TextView>
        <Text>
          <TypingWord>
            {currentTypingArr?.map((char, index) => {
              return (
                <div
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
                </div>
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
          mode={mode.toString()}
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
  width: 100%;
  height: 160px;
  margin-top: 20px;
  border-radius: 4px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  background-color: ${({ theme }) => theme.bgColor2};
  /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
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

const TextInput = styled.input<{ mode: string }>`
  width: 90%;
  height: 45px;
  border-bottom: 3px solid
    ${(props) => (props.mode === "true" ? "#F6F6F6" : "#9A9A9A")};
  font-size: 20px;
  color: ${({ theme }) => theme.color};
  transition: 0.3s;
  padding-left: 10px;
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
    font-weight: 600;
  }
`;
