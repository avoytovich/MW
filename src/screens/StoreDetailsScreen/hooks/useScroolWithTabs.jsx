import React, { useState, useEffect } from 'react';

const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);
  // console.log('isIntersecting', isIntersecting);

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => { observer.disconnect(); };
  }, []);

  return isIntersecting;
};

const useScroolWithTabs = (
  myRefArr,
  curTab,
  setCurTab,
  isScroolUp,
  isScroolDown,
  refTab,
) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  const isVisibleArrDown = myRefArr.reduce((acc, ref) => (
    [...acc, useOnScreen(ref)]
  ), []);

  const isVisibleArrUp = refTab.reduce((acc, ref) => (
    [...acc, useOnScreen(ref)]
  ), []);

  const goToTop = () => myRefArr[0]?.current.scrollIntoView();

  useEffect(() => {
    if (isScroolDown) {
      if (isVisibleArrDown.indexOf(true) !== -1) {
        setCurTab(isVisibleArrDown.lastIndexOf(true));
      }
    }
    if (isScroolUp) {
      if (isVisibleArrUp.indexOf(true) === -1) {
        if ([0, 1].includes(curTab)) {
          setCurTab(0);
        } else {
          setCurTab(isVisibleArrUp.lastIndexOf(false) - 1);
        }
      }
      if (isVisibleArrUp.lastIndexOf(true) !== -1) {
        if ([1, 2].includes(curTab) && isVisibleArrUp[1]) {
          setCurTab(1);
        } else {
          setCurTab(isVisibleArrUp.lastIndexOf(true));
        }
      }
    }

    if (isVisibleArrDown.indexOf(true) || isVisibleArrDown.indexOf(true) === -1) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  }, [isVisibleArrDown]);

  return [showTopBtn, goToTop];
};

export default useScroolWithTabs;
