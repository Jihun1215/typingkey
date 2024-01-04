import styled from "styled-components";

import { useRecoilState } from "recoil";
import { ModeToggleState } from "state/atoms";

import { IoSunnySharp, IoMoon } from "react-icons/io5";

export const Header = () => {
  const [darkmode, SetDarkmode] = useRecoilState(ModeToggleState);

  const onClickChangeDarkMode = () => {
    SetDarkmode(!darkmode);
  };

  return (
    <Container>
      <TitleArea>
        <Title>TypingKey</Title>
      </TitleArea>
      <MenuArea>
        <Toggle>
          {darkmode ? (
            <IoSunnySharp
              fill="#8A7EBE"
              onClick={() => {
                onClickChangeDarkMode();
              }}
            />
          ) : (
            <IoMoon
              fill="#8A7EBE"
              onClick={() => {
                onClickChangeDarkMode();
              }}
            />
          )}
        </Toggle>
      </MenuArea>
    </Container>
  );
};

const Container = styled.header`
  position: absolute;
  top: 25px;
  width: 80vw;
  ${({ theme }) => theme.BoxCenter};
  /* height: 80px; */
  height: 60px;
  background-color: ${({ theme }) => theme.bgColor2};
  border-radius: 6px;
`;

const TitleArea = styled.div`
  width: 40%;
  height: 100%;
  ${({ theme }) => theme.BoxCenter};
`;

// const Img = styled.img``
const Title = styled.h3`
  font-size: 30px;
  color: ${({ theme }) => theme.color};
`;

const MenuArea = styled.div`
  width: 60%;
  height: 100%;
`;

const Toggle = styled.div`
  width: 100px;
  height: 100%;
  ${({ theme }) => theme.BoxCenter};
  gap: 0 20px;
  svg {
    font-size: 24px;
    cursor: pointer;
  }
`;
