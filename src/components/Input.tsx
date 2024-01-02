import { useState, useRef } from "react";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { TextValueState } from "state/atoms";

export const Input = () => {
  const [typingValue, setTypingValue] = useRecoilState(TextValueState);

  console.log(typingValue);

  const valueRef = useRef<HTMLInputElement>(null);

  // input 활성화 State
  const [isInput, setIsInput] = useState<boolean>(false);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypingValue(e.target.value);
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (typingValue === "") {
      return;
    }

    setIsInput(false);
    setTypingValue("");
    window.scrollTo({ top: 0 });
  };

  const onClickElement = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.target as HTMLElement;
    const TagName = element.tagName;
    e.stopPropagation();
    if (TagName === "DIV") {
      setIsInput(false);
      setTypingValue("");
    } else if (TagName === "svg" || TagName === "circle") {
      if (valueRef.current) valueRef.current.focus();
      setIsInput(true);
      setTypingValue("");
    }
  };

  return (
    <Container>
      <TextView />
      <InputArea>
        <TextInput
          type="text"
          ref={valueRef}
          isinput={isInput.toString()}
          value={typingValue}
          onChange={onChangeValue}
          placeholder="검색어를 입력해주세요"
        />
      </InputArea>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: 300px;
  border-radius: 4px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  gap: 20px 0;
  background: #fff;
`;

const TextView = styled.div`
  width: 100%;
  height: 80px;
  border: 1px solid red;
`;

const InputArea = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid red;
  ${({ theme }) => theme.BoxCenter};
`;

const TextInput = styled.input<{ isinput: string }>`
  width: 580px;
  height: 120px;
  border: 1px solid red;
  color: #333;
  padding-left: 30px;
  transition: 0.3s;
  /* opacity: ${(props) => (props.isinput === "true" ? "1" : "0")}; */
  border-radius: 4px;
  &::placeholder {
    color: ${({ theme }) => theme.color2};
  }
  &:focus {
    border: 2px solid #0288d1;
  }
`;
