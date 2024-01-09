// import { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import {
  useRecoilState,
  // useRecoilValue
} from "recoil";
import {
  AlertModalState,
  TypingTimeState,
  TypingCountState,
  TypingWrongCountState,
} from "state/atoms";
import { useEffect, useState } from "react";

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
  const [time, setTime] = useRecoilState(TypingTimeState);

  const [saveTime, setSaveTime] = useState<number | null>(null);
  useEffect(() => {
    return setSaveTime(time);
  }, []);

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
      setTime(0);
      setTypingCount(0);
      SetWrongCount(0);
    }
  };

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
            타이핑 결과 모시깽 ,{saveTime}s, WPM, 틀린갯수 :{wrongCount}, 날짜
            시간
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
  background-color: #fff;
  top: 20%;
  border-radius: 8px;
  width: 320px;
  height: 450px;
  ${({ theme }) => theme.BoxCenter};
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;
