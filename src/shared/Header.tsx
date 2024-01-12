import styled from "styled-components";

import { useRecoilState } from "recoil";
import { ModeToggleState } from "state/atoms";

import { Tooltip } from "components/Tooltip";

import { IoSunnySharp, IoMoon } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import { RiEnglishInput } from "react-icons/ri";

export const Header = () => {
  const [darkmode, SetDarkmode] = useRecoilState(ModeToggleState);

  const onClickChangeDarkMode = () => {
    SetDarkmode(!darkmode);
  };

  const onClickReStart = () => {
    location.reload();
  };

  return (
    <Container>
      <TitleArea>
        <Title>TypingKey</Title>
      </TitleArea>
      <MenuArea>
        <MemuItem>
          <Tooltip message="다크모드">
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
          </Tooltip>
        </MemuItem>
        <MemuItem>
          <Tooltip message="문장바꾸기">
            <RiEnglishInput fill="#8A7EBE" />
          </Tooltip>
          {/* 영문 타자 넣기  */}
        </MemuItem>
        <MemuItem>
          <Tooltip message="다시하기">
            <VscDebugRestart fill="#8A7EBE" onClick={onClickReStart} />
          </Tooltip>
        </MemuItem>

        {/* <MemuItem>1</MemuItem> */}
        {/* <MemuItem>1</MemuItem> */}
        {/* <Toggle>
        
        </Toggle> */}
      </MenuArea>
    </Container>
  );
};

const Container = styled.header`
  position: absolute;
  top: 55px;
  width: 880px;
  ${({ theme }) => theme.BoxCenter};
  /* height: 80px; */
  height: 100px;
  background-color: ${({ theme }) => theme.bgColor2};
  border-radius: 6px;
  @media (max-width: 900px) {
    width: 90%;
  }
`;

const TitleArea = styled.div`
  width: 40%;
  height: 100%;
  ${({ theme }) => theme.BoxCenter};
`;

const Title = styled.h3`
  font-size: 30px;
  color: ${({ theme }) => theme.color};
`;

const MenuArea = styled.div`
  width: 60%;
  height: 100%;

  ${({ theme }) => theme.FlexRow};
`;

const MemuItem = styled.div`
  width: 20%;
  height: 100%;
  ${({ theme }) => theme.BoxCenter};
  svg {
    font-size: 24px;
    cursor: pointer;
  }
`;
