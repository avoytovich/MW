import React, { useState, useRef, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const useSessionCountDown = () => {
  const decodeToken = jwtDecode(localStorage.getItem('accessToken'));
  const currentTime = Math.ceil(Date.now() / 1000);
  const sessionTime = decodeToken.exp - currentTime;

  const ref = useRef(null);
  const [timer, setTimer] = useState(sessionTime);

  useEffect(() => {
    const id = setTimeout(() => {
      const newTimer = sessionTime - 1;
      if (newTimer >= 0) {
        setTimer(newTimer);
      }
    }, 1000);
    ref.current = id;

    return () => {
      clearTimeout(ref.current);
    };
  });

  return timer;
};

export default useSessionCountDown;
