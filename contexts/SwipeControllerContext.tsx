import React, { createContext, useContext, useRef, ReactNode } from 'react';

type SwipeHandler = () => void;

interface SwipeControllerContextValue {
  like: SwipeHandler;
  refuse: SwipeHandler;
  registerHandlers: (handlers: { like: SwipeHandler; refuse: SwipeHandler }) => void;
  updateProgressX: (x: number) => void;
  progressX: number;
  subscribe: (cb: () => void) => () => void;
}

const noop = () => {};

const SwipeControllerContext = createContext<SwipeControllerContextValue>({
  like: noop,
  refuse: noop,
  registerHandlers: () => {},
  updateProgressX: () => {},
  progressX: 0,
  subscribe: () => noop,
});

export function SwipeControllerProvider({ children }: { children: ReactNode }) {
  const likeRef = useRef<SwipeHandler>(noop);
  const refuseRef = useRef<SwipeHandler>(noop);
  const progressRef = useRef<number>(0);
  const subscribers = useRef<Set<() => void>>(new Set());

  const registerHandlers = (handlers: { like: SwipeHandler; refuse: SwipeHandler }) => {
    likeRef.current = handlers.like || noop;
    refuseRef.current = handlers.refuse || noop;
  };

  // lightweight pub-sub so consumers can read latest value without rerender storms
  const notify = () => subscribers.current.forEach(cb => cb());

  const updateProgressX = (x: number) => {
    progressRef.current = x;
    notify();
  };

  const value: SwipeControllerContextValue = {
    like: () => likeRef.current(),
    refuse: () => refuseRef.current(),
    registerHandlers,
    updateProgressX,
    get progressX() {
      return progressRef.current;
    },
    subscribe: (cb: () => void) => {
      subscribers.current.add(cb);
      return () => {
        subscribers.current.delete(cb);
      };
    },
  } as SwipeControllerContextValue;

  return (
    <SwipeControllerContext.Provider value={value}>{children}</SwipeControllerContext.Provider>
  );
}

export function useSwipeController() {
  return useContext(SwipeControllerContext);
}


