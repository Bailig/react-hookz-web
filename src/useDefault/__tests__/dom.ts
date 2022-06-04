import { act, renderHook } from '@testing-library/react-hooks/dom';
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

  it('should init state without initial value', () => {
    const { result } = renderHook(() => useDefault('some default value'));

    expect(result.current[0]).toEqual('some default value');
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  it('should init state with initial value', () => {
    const { result } = renderHook(() => useDefault('some default value', 'some initial value'));

    expect(result.current[0]).toEqual('some initial value');
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  it('should set state to another value value', () => {
    const { result } = renderHook(() => useDefault('some default value', 'some initial value'));

    act(() => {
      result.current[1]('another value');
    });

    expect(result.current[0]).toEqual('another value');
  });

  it('should return default value if state set to null', () => {
    const { result } = renderHook(() => useDefault('some default value', 'some initial value'));

    act(() => {
      result.current[1](null);
    });

    expect(result.current[0]).toEqual('some default value');
  });

  it('should return default value if state set to undefined', () => {
    const { result } = renderHook(() => useDefault('some default value', 'some initial value'));

    act(() => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      result.current[1](undefined);
    });

    expect(result.current[0]).toEqual('some default value');
  });

  it('should return latest value after being set to null or undefined', () => {
    const { result } = renderHook(() => useDefault('some default value', 'some initial value'));

    act(() => {
      result.current[1](null);
    });
    expect(result.current[0]).toEqual('some default value');

    act(() => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      result.current[1](undefined);
    });
    expect(result.current[0]).toEqual('some default value');

    act(() => {
      result.current[1]('new value');
    });
    expect(result.current[0]).toEqual('new value');
  });
});
