import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { TextValueState } from "state/atoms";

import { defaultTypingData } from "utils/TypingMockData";

export const Typing = () => {
  const [typingText, setTypingText] = useState<
    Array<{ contents: string; author: string }>
  >([]);

  // 배열에서 랜덤한 인덱스를 가져오는 함수
  const getRandomIndexes = (max: number, count: number) => {
    const indexes = Array.from({ length: max }, (_, index) => index);
    for (let i = indexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    return indexes.slice(0, count);
  };

  // 컴포넌트가 마운트될 때 랜덤한 텍스트를 설정하기 위한 useEffect
  useEffect(() => {
    const randomIndexes = getRandomIndexes(defaultTypingData.length, 10);
    const randomTexts = randomIndexes.map(
      (index) => defaultTypingData[index] || {}
    );
    // setTypingText(randomTexts);
    // console.log(randomIndexes);
    // console.log(randomTexts);
    setTypingText(randomTexts as Array<{ contents: string; author: string }>);
  }, []);

  // console.log(typingText);
  // console.log(typingText.length);
  const [typingValue, setTypingValue] = useRecoilState(TextValueState);

  const valueRef = useRef<HTMLInputElement>(null);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypingValue(e.target.value);
  };

  const [typingCount, setTypingCount] = useState<number>(0);
  console.log("함수밖카운테", typingCount);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (typingValue === "") {
      return;
    }

    // 입력된 input 값과 따라칠 Text값이 동일될떄
    // Typing count가 올라가야 하고, 다른 타이핑 값이 나오야 한다.
    if (
      typingText.length > 0 &&
      typingText[typingCount].contents === typingValue
    ) {
      console.log("확인");
      setTypingValue("");
      setTypingCount(typingCount + 1);
      console.log("정답", typingCount);
      // console.log(typingCount);
      // 10개가 되면 바로 점수판 나오고 타이핑 끝나게 구현하기
      if (typingCount === 10) {
        console.log("끝");
      }

      //   window.scrollTo({ top: 0 });
    } else {
      console.log("틀림");
    }
  };

  return (
    <Container>
      <TextView>
        <Text>
          {typingText.length > 0  ? (
            <p> {typingText[typingCount].contents} </p>
          ) : null}
          {/* {typingText.length > 0 ? <Text> {typingText[0]} </Text>} */}
          {/* {typingText} */}
        </Text>
      </TextView>

      <InputArea onSubmit={onSubmit}>
        <TextInput
          type="text"
          ref={valueRef}
          value={typingValue}
          onChange={onChangeValue}
          placeholder=""
        />
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

const InputArea = styled.form`
  width: 100%;
  height: 80px;
  border: 1px solid red;
  ${({ theme }) => theme.BoxCenter};
`;

const TextInput = styled.input`
  width: 90%;
  height: 40px;
  border-bottom: 2px solid #63a080;
  font-size: 20px;
  color: #333;
  padding-left: 10px;
  transition: 0.3s;
  &::placeholder {
    color: ${({ theme }) => theme.color2};
  }
  &:focus {
    border-bottom: 2px solid #0288d1;
    /* #63a080 */
  }
`;
