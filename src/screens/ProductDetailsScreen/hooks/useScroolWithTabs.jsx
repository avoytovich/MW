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
  parentId,
) => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [stop, setStop] = useState(false);

  const isVisibleArrDown = myRefArr.reduce((acc, ref) => (
    [...acc, useOnScreen(ref)]
  ), []);

  const isVisibleArrUp = refTab.reduce((acc, ref) => (
    [...acc, useOnScreen(ref)]
  ), []);

  const goToTop = () => {
    refTab[0]?.current.scrollIntoView();
    setCurTab(0);
  };

  useEffect(() => {
    if (isScroolDown) {
      if (isVisibleArrDown[0]) {
        setCurTab(0);
      }
      if (isVisibleArrDown[1] && !isVisibleArrUp[0]) {
        setCurTab(1);
      }
      if (isVisibleArrDown[2] && !isVisibleArrUp[1]) {
        setCurTab(2);
      }
      if (isVisibleArrDown[3] && !isVisibleArrUp[2]) {
        setCurTab(3);
      }
      if (isVisibleArrDown[4] && !isVisibleArrUp[3]) {
        setCurTab(4);
      }
      if (isVisibleArrDown[5] && !isVisibleArrUp[4]) {
        setCurTab(5);
      }
      if (isVisibleArrDown[6] && !isVisibleArrUp[5] && !parentId) {
        setCurTab(6);
      }
    }
    if (isScroolUp) {
      if (isVisibleArrUp[0]) {
        setCurTab(0);
      }
      if (isVisibleArrUp.indexOf(true) === -1 && curTab === 1) {
        setCurTab(0);
      }
      if (isVisibleArrUp[1]) {
        setCurTab(1);
      }
      if (!isVisibleArrUp[1] && isVisibleArrUp[2] && isVisibleArrUp[3]) {
        setCurTab(2);
      }
      if (!isVisibleArrUp[2] && isVisibleArrUp[3]) {
        setCurTab(3);
      }
      if (isVisibleArrUp.indexOf(true) === -1 && isVisibleArrDown[3] && curTab === 4) {
        setCurTab(3);
      }
      if (isVisibleArrUp.indexOf(true) === -1 && isVisibleArrDown.indexOf(true) === -1 && curTab === 4) {
        if (!stop) {
          setCurTab(3);
        }
      }
      if (isVisibleArrUp[4]) {
        setCurTab(4);
      }
      if (isVisibleArrUp.indexOf(true) === -1 && curTab === 5) {
        setStop(true);
        setCurTab(4);
      }
      if (isVisibleArrUp[5]) {
        setCurTab(5);
      }
      if (isVisibleArrUp.indexOf(true) === -1 && isVisibleArrDown[5]) {
        setCurTab(5);
      }
      if (isVisibleArrUp[6] && !parentId) {
        setCurTab(6);
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
