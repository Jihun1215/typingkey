import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import {
  TextValueState,
  TypingCountState,
  TypingWrongCountState,
  AlertModalState,
  TypingProgressState,
  TypingAccuracyArrState,
  TypingTimeState,
  TypingTimeArrState,
  TypingCpmState,
  TypingCpmArrState,
  TypingAccuracyState,
  // TypingCpmState,
} from "state/atoms";

import { useRandomTypingText } from "hooks/useRandomTypingText";
import { defaultTypingData } from "utils/TypingMockData";

import { Alert } from "./Alert";

interface TextItem {
  contents: string;
  author: string;
}
export const Typing = () => {
  // mockData안에 있는 문장 중 랜덤한 10개 문장을 가져오는 코드
  const typingText = useRandomTypingText(defaultTypingData);

  // input Ref
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
  // 타이핑 시간을 저장하는 Arr State
  const [timeArr, setTimeArr] = useRecoilState(TypingTimeArrState);

  const [timecheck, setTimeCheck] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // 결과창 모달 관리하는 State
  const [modalVisibility, SetModalVisibility] = useRecoilState(AlertModalState);

  // 타이핑된 값
  const [typingValue, setTypingValue] = useRecoilState(TextValueState);
  // 틀린부분 인덱스를 보관하는 State
  const [incorrectIndices, setIncorrectIndices] = useState<number[]>([]);

  // 현재 문장의 정확도 관리하는 State
  const [accuracy, setAccuracy] = useState(0);
  // 전체 문장의 정확도를 저장하는 State
  const [accuracyArr, setAccuracyArr] = useRecoilState(TypingAccuracyArrState);
  // 현재 문장의 진행도를 저장하는 State
  const [, SetProgress] = useRecoilState(TypingProgressState);

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

  // CPM을 저장하는 State
  const [cpm, setCpm] = useState(0);
  const [, setCurrentCpm] = useRecoilState(TypingCpmState);

  // console.log(cpm);

  // useEffect(() => {
  //   setCurrentCpm(cpm);
  // }, [cpm]);

  // console.log(cpm);
  const [cpmArr, setCpmArr] = useRecoilState(TypingCpmArrState);

  // const calculateCpm = () => {
  //   if (startTime) {
  //     const cpmValue = (correctChars / time) * 60; // 분당 CPM 계산
  //     setCpm(cpmValue);
  //   }
  // };

  // input 값이 입력이될때의 작동하는 함수
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // const curretTextLength = currentTypingArr?.length;
    const inputLength = inputValue.length;

    const currentTextLength = currentTypingArr?.length;

    let textChars = 0;

    // 정확한 문장
    let correctChars = 0;
    // 틀린 문장
    let incorrectChars = 0;

    for (let i = 0; i < inputValue.length; i++) {
      if (inputValue[i] === currentTypingText?.contents[i]) {
        correctChars++;
        textChars++;
      } else {
        incorrectChars++;
        textChars++;
      }
    }

    // 실시간 타수 계산
    // const endTime = new Date();
    // const resultTime =
    //   startTime === null ? 0 : (endTime.getTime() - startTime) / 1000; // 분당시간
    // const resultSpeed = Number(
    //   (textChars - incorrectChars) / (resultTime / 60)
    // ); // 입력한 글자 - 틀린글자 / 분당시간
    // console.log(resultSpeed);

    // const typingSpeed = Math.max(0, 1000 - (textChars / time) * 100); // 스피드를 1000에서 0으로 표현
    // console.log(typingSpeed);

    //   if(resultSpeed < 0){
    //     typingSpeed.innerHTML = 0;
    // }else{
    //     typingSpeed.innerHTML = resultSpeed;
    // }

    // const endTime = new Date();
    // const resultTime = 0;
    // console.log(endTime.getTime());
    // console.log(startTime);
    // if (startTime !== null) {
    //   resultTime = (endTime.getTime() - startTime.getTime()) / 1000;
    // }
    // const resultSpeed = Number(
    //   (textChars - incorrectChars) / (resultTime / 60)
    // );

    // // 타자 스피드 계산
    // const typingSpeed = Math.max(0, 1000 - (textChars / time) * 100); // 스피드를 1000에서 0으로 표현

    // console.log("타자속도", textChars);

    const cpmValue =
      currentTextLength === undefined || time === 0 || correctChars === 0
        ? 0
        : Math.round((correctChars / time) * 60);

    // console.log(Number(correctChars / (time / 60)));
    // console.log("CPM", cpmValue);
    // console.log();
    // const cpm = (characterCount / time) * 5; // 공식에 따른 CPM
    // console.log(cpmValue);

    // const cpmValue = (correctChars / time) * 60; // 분당 CPM 계산
    // if () {
    // }

    setCpm(cpmValue);

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

    // console.log(!timecheck);
    // 최초로 타이핑이 시작되고 timecheck가 false일 때만 timecheck를 true로 설정
    if (!timecheck && inputValue.length > 0) {
      setTimeCheck(true);
    }
    // console.log(time);
  };

  // 엔터 클릭 시
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // 타자 Length와 따라칠 타자 Length가 같을 경우에
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
          // console.log(time);
          // 문장 당 타이핑
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
        // console.log(cpm);
      }
    }
  };

  // 다음 타이핑 문장 미리보여주는 변수
  const [nextTypingText, setNextTypingText] = useState("");

  useEffect(() => {
    if (typingText.length > 0) {
      // 마지막 타이핑 이후에는 NEXT 영역 비우고 알림 모달을 띄움
      if (typingCount >= 10) {
        // 다음 미리보기 제거
        setNextTypingText("");
        // Alert Modal 공개
        SetModalVisibility(true);
        // 시간 정지
        setTimeCheck(false);
      } else if (typingCount === 9) {
        // 다음 미리보기 제거
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
      {modalVisibility && <Alert />}
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
    border-bottom: 2px solid ${({ theme }) => theme.colors.greey};
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
