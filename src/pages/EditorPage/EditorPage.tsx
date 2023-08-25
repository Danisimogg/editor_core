import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

// Function to generate a random number in a given range
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Canvas styles
const canvasStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

// Function to get animation settings
function getAnimationSettings(originXA: number, originXB: number) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}

// Fireworks component
const EditorPage: React.FC = () => {
  const refAnimationInstance = useRef<any>(null);
  const [intervalId, setIntervalId] = useState<any>(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      const id = setInterval(nextTickAnimation, 400);
      setIntervalId(id);
    }
  }, [intervalId, nextTickAnimation]);

  const pauseAnimation = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  const stopAnimation = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    if (refAnimationInstance.current) {
      refAnimationInstance.current.reset();
    }
  }, [intervalId]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <>
      <div>
        <button onClick={startAnimation}>Start</button>
        <button onClick={pauseAnimation}>Pause</button>
        <button onClick={stopAnimation}>Stop</button>
      </div>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  );
};

export default EditorPage;
