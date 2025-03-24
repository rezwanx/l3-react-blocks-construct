import { useState, useEffect } from 'react';

interface ResendOTPProps {
  initialTime?: number;
  onResend: () => void;
}

const useResendOTP = ({ initialTime = 120, onResend }: ResendOTPProps) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (minutes > 0) {
      return `${minutes} min ${seconds} sec`;
    } else {
      return `${seconds} sec`;
    }
  };

  useEffect(() => {
    if (remainingTime === 0) {
      setIsResendDisabled(false);
      return;
    }

    if (remainingTime > 0 && isResendDisabled) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime, isResendDisabled]);

  const resetTimer = () => {
    setRemainingTime(initialTime);
    setIsResendDisabled(true);
  };

  const handleResend = () => {
    resetTimer();
    onResend();
  };

  return {
    formattedTime: formatTime(remainingTime),
    isResendDisabled,
    handleResend,
  };
};

export default useResendOTP;
