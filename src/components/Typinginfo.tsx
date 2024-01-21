import { useEffect } from "react";
import styled from "styled-components";

import { useRecoilValue, useRecoilState } from "recoil";
import {
  TypingCountState,
  TypingTimeState,
  // TypingAccuracyState,
  // TypingAccuracyArrState,
  // TypingCpmState,
  TypingSpeedState,
  TypingProgressState,
  TextValueState,
} from "state/atoms";

import { Percent } from "./Percent";
import { Tooltip } from "./Tooltip";

import { FaKeyboard } from "react-icons/fa";

export const TypingInfo = () => {
  const typingCount = useRecoilValue(TypingCountState);
  const time = useRecoilValue(TypingTimeState);
  const [speed, setSpeed] = useRecoilState(TypingSpeedState);
  const progress = useRecoilValue(TypingProgressState);
  const typingValue = useRecoilValue(TextValueState);
  // const accuaracy = useRecoilValue(TypingAccuracyState);
  // console.log(accuaracy);

  // useEffect(() => {
  //   if (typingValue) {
  //     const previousValue = typingValue;
  //     let startTimestamp: number;

  //     const updateSpeed = (timestamp: number) => {
  //       if (!startTimestamp) {
  //         startTimestamp = timestamp;
  //       }

  //       const progress = timestamp - startTimestamp;
  //       const newSpeed = Math.max(speed - 50 * (progress / 1000), 0);

  //       setSpeed(newSpeed);

  //       if (progress < 500) {
  //         // 애니메이션 진행 중일 경우 계속 업데이트
  //         requestAnimationFrame(updateSpeed);
  //       }
  //     };

  //     // requestAnimationFrame으로 애니메이션 시작
  //     requestAnimationFrame(updateSpeed);

  //     return () => {
  //       // 컴포넌트가 언마운트되면 애니메이션 중단
  //       startTimestamp = 0;
  //     };
  //   }
  // }, [typingValue, speed, setSpeed]);

  useEffect(() => {
    if (typingValue) {
      const previousValue = typingValue; // 기존 값 저장
      const timerId = setTimeout(() => {
        // 0.5초 후에 값이 변경되었는지 확인
        if (typingValue !== previousValue) {
          console.log("0.5초 동안 값이 변경되었습니다.");
        } else {
          console.log("0.5초 동안 값이 변경되지 않았습니다.");
          setSpeed((prevSpeed) => Math.max(prevSpeed - 50, 0));
        }
        // setSpeedCount((prev) => prev + 5);
      }, 500);

      // 컴포넌트가 언마운트되거나 타이머가 정리될 때 실행
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [typingValue, setSpeed, speed]);
  return (
    <Container>
      {/* 현재 진행하고 있는 문장에 대한 값들 */}
      <Tooltip message="타자속도" placement="typinginfo">
        <Item style={{ borderRight: "none" }}>
          Speed:
          <Percent value={speed} type="speed" />
        </Item>
      </Tooltip>

      <Tooltip message="타이핑 시간" placement="typinginfo">
        <Item>
          Time
          {time === 0 ? (
            <Percent value={0} type="time" />
          ) : (
            <Percent value={time} type="time" />
          )}
        </Item>
      </Tooltip>

      <Tooltip message="정확도" placement="typinginfo">
        <Item>
          <FaKeyboard />
          {/* <Percent value={accuaracy} type="accuaracy" /> */}
        </Item>
      </Tooltip>

      <Tooltip message="진행도" placement="typinginfo">
        <Item>
          Progress
          <Percent value={progress} type="progress" />
        </Item>
      </Tooltip>

      <Tooltip message="문장 수" placement="typinginfo">
        <Item>
          Count
          <Percent value={typingCount} type="count" />
          {/* <p>{typingCount}/ 10</p> */}
        </Item>
      </Tooltip>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  border-radius: 4px;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor2};
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Item = styled.div`
  position: relative;
  ${({ theme }) => theme.WH100};
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  gap: 10px 0;
  p {
    width: 80px;
    height: 20px;
    color: ${({ theme }) => theme.colors.greey};
    ${({ theme }) => theme.BoxCenter};
    border-radius: 4px;
  }
  svg {
    position: absolute;
    width: 40px;
    height: 40px;
    bottom: 0;
  }
`;
