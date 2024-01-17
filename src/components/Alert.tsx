// import { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  AlertModalState,
  TypingTimeArrState,
  TypingCountState,
  TypingWrongCountState,
  TypingAccuracyArrState,
  TypingCpmArrState,
} from "state/atoms";
// import { useEffect, useState } from "react";

export const Alert = () => {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-50%", transition: { duration: 0.1 } },
  };

  const [alertmodal, setAlertmodla] = useRecoilState(AlertModalState);

  // 최초 타이핑 후 지속된 시간 State
  const [timeArr, setTime] = useRecoilState(TypingTimeArrState);

  const [accuracy, setAccuracy] = useRecoilState(TypingAccuracyArrState);

  const cpmArr = useRecoilValue(TypingCpmArrState);

  const cpmsum = cpmArr.reduce((cpm, currentValue) => cpm + currentValue, 0);
  // console.log(cpmsum);
  // 배열 요소의 합 계산
  const timesum = timeArr.reduce(
    (time, currentValue) => time + currentValue,
    0
  );

  const cpmAverage = cpmsum / accuracy.length;

  // console.log(cpmAverage);

  // 배열 요소의 합 계산
  const sum = accuracy.reduce((acc, currentValue) => acc + currentValue, 0);

  // 배열의 평균 계산
  const average = sum / accuracy.length;

  // 타이핑 된 문장 갯수를 카우팅 하는 State
  const [, setTypingCount] = useRecoilState(TypingCountState);
  // 타이핑 틀린 갯수 카운팅 하는 State
  const [wrongCount, SetWrongCount] = useRecoilState(TypingWrongCountState);

  const onClickCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const element = e.target as HTMLElement;
    const TagName = element.tagName;
    // e.stopPropagation()
    if (TagName === "DIV") {
      setAlertmodla(false);
      setTime([]);
      setTypingCount(0);
      SetWrongCount(0);
      setAccuracy([]);
    }
  };

  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const thisdate = year + "-" + month + "-" + day;
  const curretTime = hours + ":" + minutes;

  return (
    <AnimatePresence>
      {alertmodal && (
        <Container
          onClick={onClickCloseModal}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <ModalCard
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            // onClick={(e) => e.stopPropagation()}
          >
            <CardTitle> TypingKey </CardTitle>
            <CardInfo>
              <InfoItem>타이핑 걸린 시간: {timesum}s</InfoItem>
              <InfoItem>평균 Acc: {average}</InfoItem>
              <InfoItem>평균 CPM: {cpmAverage}</InfoItem>
              <InfoItem>틀린갯수 / 정확도 :{wrongCount},</InfoItem>
            </CardInfo>
            <CardDate>
              {thisdate}
              {curretTime}
            </CardDate>
          </ModalCard>
        </Container>
      )}
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  ${({ theme }) => theme.FlexRow};
  justify-content: center;
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
`;

const ModalCard = styled(motion.section)`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  top: 20%;
  border-radius: 8px;
  width: 320px;
  height: 450px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

const CardTitle = styled.h3`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  padding-left: 30px;
  font-size: 24px;
  font-weight: 600;
`;

const CardInfo = styled.div`
  width: 100%;
  height: 70%;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  border: 1px solid red;
`;

const InfoItem = styled.div`
  width: 90%;
  height: 20%;
  border: 1px solid black;
`;

const CardDate = styled.div`
  width: 100%;
  height: 10%;
  font-size: 16px;
`;
