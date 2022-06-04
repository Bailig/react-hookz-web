import { Dispatch, SetStateAction } from 'react';
import { useSafeState } from '..';

/**
 * React state hook that returns the default value when the state is null or undefined.
 *
 * @param defaultValue Value that will be returned when the state is undefined or null.
 * @param initialValue Value that will be returned during the initial render.
 */
export function useDefault<S>(
  defaultValue: S,
  initialValue?: S | (() => S)
): [S, Dispatch<SetStateAction<S | null | undefined>>] {
  const [value, setValue] = useSafeState<S | undefined | null>(initialValue);

  if (value === undefined || value === null) {
    return [defaultValue, setValue];
  }

  return [value, setValue];
}
