import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

interface ProgressBarProps {
  value: number;
  type: "count" | "progress" | "time" | "average" | "time" | "cpm";
}

export const Percent = ({ value, type }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    if (type === "count") {
      setProgress(value * 10);
    } else if (type === "progress") {
      setProgress(value);
    } else if (type === "time") {
      setProgress(Math.min(value * 10, 100));
    } else if (type === "cpm") {
      setProgress(Math.min(value, 100));
    }
  }, [value]);

  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

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
        <Point>{value}</Point>
      </AnimatePresence>
    </ProgressBar>
  );
};

const ProgressBar = styled(motion.div)`
  position: relative;
  z-index: 10;
  width: 120px;
  height: 20px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray5};
  /* border: 2px solid ${({ theme }) => theme.colors.black}; */
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
  font-size: 14px;
  font-weight: 700;
`;
