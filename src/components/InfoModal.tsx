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

export const InfoModal = () => {
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
  // 배열 요소의 합 계산
  const timesum = timeArr.reduce(
    (time, currentValue) => time + currentValue,
    0
  );

  const cpmAverage = cpmsum / accuracy.length;

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

  const thisdate = year + "-" + month + "-" + day + " " + hours + ":" + minutes;

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
              <InfoItem>
                <h1> 총 타이핑 시간</h1>
                <p>{timesum}s</p>
              </InfoItem>
              <InfoItem>
                <h1> 평균 Acc</h1>
                <p>{average}</p>
              </InfoItem>
              <InfoItem>
                <h1> 평균 CPM</h1>
                <p>{cpmAverage}</p>
              </InfoItem>
              <InfoItem>
                <h1> 틀린갯수 / 정확도</h1>
                <p>{wrongCount}</p>
              </InfoItem>
            </CardInfo>
            <CardDate>
              <p>{thisdate}</p>
            </CardDate>

            <ButtonArea>
              <Button>종료하기</Button>
            </ButtonArea>
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
  width: 320px;
  height: 450px;
  background-color: ${({ theme }) => theme.colors.white};
  top: 20%;
  border-radius: 16px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

const CardTitle = styled.h3`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  font-size: 24px;
  font-weight: 600;
  ${({ theme }) => theme.KCCFontTitle};
`;

const CardInfo = styled.div`
  width: 100%;
  height: 300px;
  ${({ theme }) => theme.FlexCol};
  /* gap: 5px 0; */
  background: linear-gradient(0deg, #ebfbee 33%, #d3f9d8 66%, #ebfbee 100%);
`;

const InfoItem = styled.div`
  width: 100%;
  height: 75px;
  ${({ theme }) => theme.FlexCol};
  align-items: center;
  padding-top: 10px;
  border: 1px solid #dcdcdc;
  ${({ theme }) => theme.Flex}
  h1 {
    width: 100%;
    height: 30px;
    padding-left: 10px;
  }
  p {
    width: 100%;
    height: 40px;
    padding-left: 20px;
  }
`;

const CardDate = styled.div`
  width: 100%;
  height: 30px;
  ${({ theme }) => theme.FlexRow};
  align-items: center;
  justify-content: right;
  padding-right: 20px;
  p {
    font-size: 16px;
  }
`;

const ButtonArea = styled.div`
  width: 100%;
  height: 70px;
  ${({ theme }) => theme.BoxCenter};
`;

const Button = styled.button`
  width: 260px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.lavender};
`;
