import styled from "styled-components";

import { useRecoilState } from "recoil";
import { ModeToggleState, TypingKRState } from "state/atoms";

import { Tooltip } from "components/Tooltip";

import MainLogo from "assets/webLogo.png";
import { IoSunnySharp, IoMoon } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";

export const Header = () => {
  const [darkmode, SetDarkmode] = useRecoilState(ModeToggleState);

  const [TypingKrCheck, setTypingKrCheck] = useRecoilState(TypingKRState);

  const onClickChangeDarkMode = () => {
    SetDarkmode(!darkmode);
  };

  const onClickChangeTypingLanguageKr = () => {
    setTypingKrCheck(true);
  };

  const onClickChangeTypingLanguageEn = () => {
    setTypingKrCheck(false);
  };

  const onClickReStart = () => {
    location.reload();
  };

  return (
    <Container>
      <TitleArea>
        <Logo src={MainLogo} alt="logo" />
        <Title>TypingKey</Title>
      </TitleArea>
      <MenuArea>
        <MemuItem>
          {darkmode ? (
            <Tooltip message="light" placement="header">
              <IoSunnySharp
                fill="#8A7EBE"
                onClick={() => {
                  onClickChangeDarkMode();
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip message="Dark" placement="header">
              <IoMoon
                fill="#8A7EBE"
                onClick={() => {
                  onClickChangeDarkMode();
                }}
              />
            </Tooltip>
          )}
        </MemuItem>

        <MemuItem>
          <LanguageTab>
            <Tab
              className="kr"
              onClick={() => {
                onClickChangeTypingLanguageKr();
              }}
              TypingKrCheck={TypingKrCheck}
            >
              Kor
            </Tab>
            <Tab
              className="en"
              onClick={() => {
                onClickChangeTypingLanguageEn();
              }}
              TypingKrCheck={TypingKrCheck}
            >
              En
            </Tab>
          </LanguageTab>
        </MemuItem>
        <MemuItem>
          <Tooltip message="Restart" placement="header">
            <VscDebugRestart fill="#8A7EBE" onClick={onClickReStart} />
          </Tooltip>
        </MemuItem>
      </MenuArea>
    </Container>
  );
};

const Container = styled.header`
  position: absolute;
  top: 55px;
  width: 880px;
  ${({ theme }) => theme.BoxCenter};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  height: 100px;
  background-color: ${({ theme }) => theme.bgColor2};
  border-radius: 6px;
  @media (max-width: 900px) {
    width: 90%;
  }
`;

const TitleArea = styled.div`
  width: 30%;
  height: 100%;
  ${({ theme }) => theme.BoxCenter};
  gap: 0 20px;
`;

const Logo = styled.img`
  width: 64px;
  height: 50%;
`;

const Title = styled.h3`
  ${({ theme }) => theme.KCCFontTitle};
  color: ${({ theme }) => theme.color};
`;

const MenuArea = styled.div`
  width: 60%;
  height: 100%;
  ${({ theme }) => theme.FlexRow};
`;

const MemuItem = styled.div`
  width: 30%;
  height: 100%;
  ${({ theme }) => theme.BoxCenter};
  svg {
    font-size: 24px;
    cursor: pointer;
  }
`;

const LanguageTab = styled.div`
  width: 100px;
  height: 25px;
  ${({ theme }) => theme.BoxCenter};
  border-radius: 4px;
`;

const Tab = styled.p<{ TypingKrCheck: boolean }>`
  width: 50%;
  height: 100%;
  ${({ theme }) => theme.BoxCenter};
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0.1rem 0.2rem 0 0 rgba(0, 0, 0, 0.3);
  font-size: 18px;
  &.kr {
    background-color: ${(props) =>
      props.TypingKrCheck === true ? "#00db84" : "#575757"};
  }
  /* #8A7EBE */
  /* #74c0fc */
  &.en {
    background-color: ${(props) =>
      props.TypingKrCheck === false ? `#00db84` : "#575757"};
  }
`;
