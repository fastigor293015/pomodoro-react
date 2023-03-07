// import { useState, useEffect } from 'react';

// export function useInterval(time: number, delay: number) {
//   // запомнить переданное время в секундах
//   const [timeLeft, setTimeLeft] = useState(time);

//   useEffect(() => {
//     // не запускать когда не задано время задержки
//   	if (delay === null) return;

//   	// уменьшать время на единицу
//     const tick = () => {
//       setTimeLeft(timeLeft - 1);
//     };

//     // старт
//     const timerId = setInterval(tick, delay);

//     // остановить если время истекло
//     if (timeLeft <= 0) clearInterval(timerId);

//     // очистить интервал
//     return () => clearInterval(timerId);
//   }, [delay, timeLeft]);

//   // передать управление интервалом вовне
//   return [timeLeft, setTimeLeft];
// }

import { useEffect, useRef } from 'react'

import { useIsomorphicLayoutEffect } from 'framer-motion';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}

export default useInterval;
