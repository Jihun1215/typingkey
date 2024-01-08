import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import {
  TextValueState,
  TypingCountState,
  TypingWrongCountState,
  AlertModalState,
  TypingTimeState,
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
  const [, setTime] = useRecoilState(TypingTimeState);
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
        console.log(elapsedTime);
        console.log(elapsedTime.toString().charAt(0), 10);


        setTime(parseInt(elapsedTime.toString().slice(0, 2), 10));
      }, 1000);
    } else {
      // 시간 초기화 및 타이머 해제
      setTime(0);
      setStartTime(null);
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

  // timecheck === ture 일때 실시간 시간 변경되게 구현
  // useEffect(() => {
  //   // 이 조건일 에서만 시간이 계속해서 변경되게구현
  //   if (timecheck) {
  //   } else {
  //     // 시간 초기화
  //   }
  // }, [timecheck]);

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

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // 틀린 부분을 찾아서 인덱스를 저장
    const incorrectIndices: number[] = [];
    for (let i = 0; i < Math.max(prompt.length, inputValue.length); i++) {
      if (currentTypingText?.contents[i] !== inputValue[i]) {
        incorrectIndices.push(i);
      }
    }
    setIncorrectIndices(incorrectIndices);

    setTypingValue(inputValue);
    setTimeCheck(true);

    // 최초로 타이핑이 시작되면 timecheck를 true로 설정
    // if (!timecheck) {
    //   setTimeCheck(true);
    // }
    // 최초로 타이핑이 시작되고 timecheck가 false일 때만 timecheck를 true로 설정
    if (!timecheck && inputValue.length > 0) {
      setTimeCheck(true);
    }
  };
  // 변경된 부분
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (typingValue.length === currentTypingText?.contents.length) {
        const mismatchIndexes: number[] = [];

        const isMatch = typingValue.split("").every((char, index) => {
          // console.log(char);
          if (char !== currentTypingText.contents[index]) {
            mismatchIndexes.push(index);
            // console.log(index);
            return false;
          }
          return true;
        });

        if (isMatch) {
          setTypingValue("");
          setTypingCount(typingCount + 1);
          console.log("일치한 뒤 타이핑 값:", typingValue);

          if (typingCount === 9) {
            console.log("끝");
            // 여기서 끝나는 로직 추가
          }
        } else {
          // 틀렸을 때 틀린 부분을 카운트 올리고 초기화
          setTypingValue("");
          setTypingCount(typingCount + 1);
          SetWrongCount(wrongCount + mismatchIndexes.length);
        }
        // 타이핑이 완료되면 타이머 초기화
        // setStartTime(null);
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
  border: 1px solid red;
`;

const Text = styled.div`
  position: relative;
  width: 90%;
  height: 70px;
  background-color: ${({ theme }) => theme.bgColor};
  color: #fff;
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
  /* bottom: 5px; */
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};
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
