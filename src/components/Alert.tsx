import { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { useRecoilState } from "recoil";
import { AlertModalState } from "state/atoms";

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
  //   const alertText = useRecoilValue(AlertTextState);
  //   useEffect(() => {
  //     if (alertmodal) {
  //       setAlertmodla(alertmodal);
  //       const timeoutId = setTimeout(() => {
  //         setAlertmodla(false);
  //       }, 1500);
  //       return () => clearTimeout(timeoutId);
  //     }
  //   }, [alertmodal, setAlertmodla]);

  return (
    <AnimatePresence>
      {alertmodal && (
        <Container
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
            onClick={(e) => e.stopPropagation()}
          >
            타이핑 결과 모시깽 넣기
            시간, WPM, 정확도, 날짜 시간 
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

const ModalCard = styled(motion.div)`
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
