import React, { useState, useEffect } from 'react';

const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => { observer.disconnect(); };
  }, []);

  return isIntersecting;
};

const useScroolWithTabs = (myRefArr, setCurTab) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  const isVisibleArr = myRefArr.reduce((acc, ref) => (
    [...acc, useOnScreen(ref)]
  ), []);

  const goToTop = () => myRefArr[0]?.current.scrollIntoView();

  useEffect(() => {
    if (isVisibleArr.indexOf(true) !== -1) {
      setCurTab(isVisibleArr.indexOf(true));
    }
    if (isVisibleArr.indexOf(true) || isVisibleArr.indexOf(true) === -1) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  }, [isVisibleArr]);

  return [showTopBtn, goToTop];
};

export default useScroolWithTabs;
