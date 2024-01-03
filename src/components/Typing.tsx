import { useState, useRef } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { TextValueState } from "state/atoms";

// import { defaultTypingData } from "utils/TypingMockData";

export const Typing = () => {
  const [typingText] = useState("안녕하세요.");

  const [typingValue, setTypingValue] = useRecoilState(TextValueState);

  const valueRef = useRef<HTMLInputElement>(null);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypingValue(e.target.value);
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (typingValue === "") {
      return;
    }

    // 입력된 input 값과 따라칠 Text값이 동일될떄
    // Typing count가 올라가야 하고, 다른 타이핑 값이 나오야 한다.
    if (typingText === typingValue) {
      console.log("확인");

      setTypingValue("");
      window.scrollTo({ top: 0 });
    }
    // 틀렷을때 애니메이션효과를 주거나 해서 시각적인 효과를 줄 예정
    else {
      console.log("틀림");
    }
  };

  return (
    <Container>
      <TextView>
        <Text>{typingText}</Text>
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
  font-size: 24px;
  ${({ theme }) => theme.BoxCenter};
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

  color: #333;
  padding-left: 30px;
  transition: 0.3s;
  &::placeholder {
    color: ${({ theme }) => theme.color2};
  }
  &:focus {
    border-bottom: 2px solid #0288d1;
    /* #63a080 */
  }
`;
