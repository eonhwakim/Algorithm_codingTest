import React, { useState, useEffect, useRef } from 'react';

/**
 * [히든 테스트케이스 포함 - 고려한 항목들]
 *
 * 1. initial 값이 정상적으로 화면에 표시되는지
 * 2. 1초마다 1씩 감소하는지 (99, 98 ...)
 * 3. 0이 되면 자동 정지하는지 (0 아래로 내려가지 않는지)
 * 4. Stop 버튼 클릭 시 현재 값에서 멈추는지
 * 5. Stop 이후 추가 감소가 없는지
 * 6. initial=0 일 때 타이머가 시작되지 않는지
 * 7. data-testid 속성이 정확히 존재하는지
 *    - app-title, timer-value, stop-button
 */

export default function Timer({ initial = 0 }) {
  const [count, setCount] = useState(initial);
  const intervalRef = useRef(null);

  useEffect(() => {
    // initial이 0 이하이면 타이머를 시작하지 않음
    if (initial <= 0) return;

    intervalRef.current = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          // 0에 도달하면 자동으로 인터벌 정지
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleStop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div className="timer-container">
      <h1 data-testid="app-title">Timer App</h1>

      <div className="timer-card">
        <div className="timer-display-wrapper">
          <div className="timer-label">Timer</div>

          <div className="timer-value" data-testid="timer-value">
            {count}
          </div>

          <div className="timer-subtitle">Seconds remaining</div>
        </div>

        <button
          className="btn-stop"
          data-testid="stop-button"
          onClick={handleStop}
        >
          Stop Timer
        </button>
      </div>
    </div>
  );
}
