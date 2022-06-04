import { renderHook } from '@testing-library/react-hooks/server';
import { useDefault } from '../..';

describe('useDefault', () => {
  it('should be defined', () => {
    expect(useDefault).toBeDefined();
  });

  it('should render without initial value', () => {
    const { result } = renderHook(() => useDefault('some default value'));
    expect(result.error).toBeUndefined();
  });

  it('should render with initial value', () => {
    const { result } = renderHook(() => useDefault('some default value', 'some initial value'));
    expect(result.error).toBeUndefined();
  });
});
