import styled from "styled-components";

import { useRecoilState } from "recoil";
import {
  ModeToggleState,
  TypingKRState,
  TypingCountState,
  TextValueState,
  TypingTimeState,
  TypingSpeedState,
  TypingProgressState,
  TypingincorrectArrState,
} from "state/atoms";

import { Tooltip } from "components/Tooltip";

import MainLogo from "assets/webLogo.svg?react";
import { IoSunnySharp, IoMoon } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";

export const Header = () => {
  const [darkmode, SetDarkmode] = useRecoilState(ModeToggleState);
  // 타이핑된 값
  const [, setTypingCount] = useRecoilState(TypingCountState);
  const [, setTypingValue] = useRecoilState(TextValueState);
  const [, setTime] = useRecoilState(TypingTimeState);
  const [, setSpeed] = useRecoilState(TypingSpeedState);
  const [, setProgress] = useRecoilState(TypingProgressState);
  // const [, setAccuracyArr] = useRecoilState(TypingAccuracyArrState);
  const [TypingKrCheck, setTypingKrCheck] = useRecoilState(TypingKRState);

  const [, setIncorrectIndices] = useRecoilState<number[]>(
    TypingincorrectArrState
  );

  const onClickChangeDarkMode = () => {
    SetDarkmode(!darkmode);
  };

  const onClickChangeTypingLanguageKr = () => {
    setTypingKrCheck(true);
    setTypingValue("");
    setTime(0);
    setTypingCount(0);
    setSpeed(0);
    setProgress(0);
    setIncorrectIndices([]);
  };

  const onClickChangeTypingLanguageEn = () => {
    setTypingKrCheck(false);
    setTypingValue("");
    setTime(0);
    setTypingCount(0);
    setSpeed(0);
    setProgress(0);
    setIncorrectIndices([]);
  };

  const onClickReStart = () => {
    location.reload();
  };

  return (
    <Container>
      <TitleArea>
          <MainLogo/>
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
              typingkrcheck={TypingKrCheck.toString()}
            >
              Kor
            </Tab>
            <Tab
              className="en"
              onClick={() => {
                onClickChangeTypingLanguageEn();
              }}
              typingkrcheck={TypingKrCheck.toString()}
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
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  justify-content: space-between;
  gap: 0 50px;
  height: 100px;
  border-radius: 6px;
  @media (max-width: 900px) {
    width: 90%;
  }
`;

const TitleArea = styled.div`
  width: 320px;
  height: 100%;
  ${({ theme }) => theme.BoxCenter};
  gap: 0 20px;
`;


const Title = styled.h3`
  ${({ theme }) => theme.KCCFontTitle};
  /* 브라우저에게 해당 요소에 변환 효과가 있다고 미리 알리는 CSS 속성으로,렌더링 최적화를 수행할 수 있도록 도와준다 */
  /* will-change: transform; */
  color: ${({ theme }) => theme.color};
`;

const MenuArea = styled.div`
  width: 410px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: ${({ theme }) => theme.bgColor2};
`;

const MemuItem = styled.div`
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

const Tab = styled.p<{ typingkrcheck: string }>`
  width: 50%;
  height: 100%;
  ${({ theme }) => theme.BoxCenter};
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0.1rem 0.2rem 0 0 rgba(0, 0, 0, 0.3);
  font-size: 18px;
  &.kr {
    background-color: ${(props) =>
      props.typingkrcheck === "true" ? "#00db84" : "#575757"};
  }
  &.en {
    background-color: ${(props) =>
      props.typingkrcheck === "false" ? `#00db84` : "#575757"};
  }
`;
