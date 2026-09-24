import { useEffect, useState } from "react";

interface AnimatedProgressProps {
  value: number;
  duration?: number;
}

const AnimatedProgress = ({
  value,
  duration = 1000,
}: AnimatedProgressProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const progressTime = Math.min((currentTime - startTime) / duration, 1);

      setProgress(progressTime * value);

      if (progressTime < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <div
      className="h-[6px] rounded-[10px] bg-[#28C76F]"
      style={{
        width: `${Math.min(Math.max(progress, 0), 100)}%`,
      }}
    />
  );
};

export default AnimatedProgress;
