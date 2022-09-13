import React, { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useClickOutside = (
  ref: any,
  setSortModal: (boolean: boolean) => void
) => {
  useEffect(() => {
    function handler(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Element)) {
        setTimeout(() => setSortModal(false), 0);
      }
    }
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);
};

export const useAutoFetchData = (changeLimit: (number: number) => void) => {
  const scrollHandler = (e: any) => {
    e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight) <
      100 && changeLimit(4);
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);
};
