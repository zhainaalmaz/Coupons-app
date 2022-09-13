import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

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
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);
};
