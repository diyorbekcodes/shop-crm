import { useEffect, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  formattingFn?: (value: number) => string;
}

export default function CountUp({
  end,
  duration = 1000,
  formattingFn,
}: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const progress = Math.min((currentTime - startTime) / duration, 1);

      const currentValue = Math.floor(progress * end);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);

  return <>{formattingFn ? formattingFn(count) : count.toLocaleString()}</>;
}
