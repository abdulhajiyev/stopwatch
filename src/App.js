import React, { useState, useRef } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  const animate = (timeStamp) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timeStamp;
    }
    const elapsedTime = timeStamp - startTimeRef.current;
    setTime(elapsedTime);
    requestRef.current = requestAnimationFrame(animate);
  };

  const handleStart = () => {
    setIsRunning(true);
    requestRef.current = requestAnimationFrame(animate);
  };

  const handleStop = () => {
    setIsRunning(false);
    cancelAnimationFrame(requestRef.current);
    startTimeRef.current = null;
  };

  const handleReset = () => {
    setIsRunning(false);
    cancelAnimationFrame(requestRef.current);
    startTimeRef.current = null;
    setTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App bg-blue-300">
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="flex justify-center text-7xl">{formatTime(time)}</div>
        <div className='flex gap-2'>
          {!isRunning ? (
            <button className="block bg-white rounded-md px-5 py-2" onClick={handleStart}>Start</button>
          ) : (
            <button className="block bg-white rounded-md px-5 py-2" onClick={handleStop}>Stop</button>
          )}
          <button className="block bg-white rounded-md px-5 py-2" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;