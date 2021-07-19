import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    setState((prevState) => {
      const { past, present, future } = prevState;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      if (past.length === 0) return prevState;

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((prevState) => {
      const { past, present, future } = prevState;
      const next = future[0];
      const newFuture = future.slice(1);

      if (future.length === 0) return prevState;

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((prevState) => {
      const { past, present, future } = prevState;
      if (newPresent === present) return prevState;

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  return [
    state,
    {
      canRedo,
      canUndo,
      undo,
      redo,
      set,
      reset,
    },
  ];
};
