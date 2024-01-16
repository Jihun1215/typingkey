import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

interface ProgressBarProps {
  value: number;
  type: "count" | "progress" | "time" | "accuaracy" | "time" | "speed";
}

export const Percent = ({ value, type }: ProgressBarProps) => {
  // console.log(value, type);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    if (type === "count") {
      setProgress(value * 10);
    } else if (type === "progress") {
      setProgress(Math.min(value, 100));
    } else if (type === "time") {
      setProgress(Math.min(value * 10, 100));
    } else if (type === "speed") {
      setProgress(Math.min(value, 100));
    } else {
      setProgress(value);
    }
  }, [type, value]);

  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  const percentageSign = ["accuracy", "progress"].includes(type) ? "%" : null;

  return (
    <ProgressBar>
      <AnimatePresence>
        <ProgressBarFill
          key={progress}
          initial={{ width: `${progress}%` }}
          animate={{ width: `${progress}%` }}
          exit={{ width: "0%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "linear" }}
        />
        <Point>
          {value}
          {percentageSign}
        </Point>
      </AnimatePresence>
    </ProgressBar>
  );
};

const ProgressBar = styled(motion.div)`
  position: relative;
  z-index: 10;
  width: 140px;
  height: 30px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray5};
`;

const ProgressBarFill = styled(motion.div)`
  position: absolute;
  z-index: 12;
  height: 100%;
  width: 0;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.greey};
`;

const Point = styled.span`
  bottom: 0;
  z-index: 13;
  position: absolute;
  background-color: transparent;
  color: ${({ theme }) => theme.color};
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: 700;
`;
