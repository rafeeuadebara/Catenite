import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

describe('useLocalStorage Hook', () => {
  const key = 'test-key';
  const defaultValue = ['default'];

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('initializes with value from localStorage', () => {
    localStorage.setItem(key, JSON.stringify(['stored']));
    const { result } = renderHook(() => useLocalStorage(key, defaultValue));
    expect(result.current[0]).toEqual(['stored']);
  });

  test('initializes with default value if no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(key, defaultValue));
    expect(result.current[0]).toEqual(defaultValue);
  });

  test('updates localStorage when state changes', () => {
    const { result } = renderHook(() => useLocalStorage(key, defaultValue));
    act(() => {
      result.current[1](['updated']);
    });
    expect(JSON.parse(localStorage.getItem(key) as string)).toEqual(['updated']);
  });

  test('handles invalid JSON in localStorage', () => {
    localStorage.setItem(key, 'invalid-json');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useLocalStorage(key, defaultValue));
    expect(result.current[0]).toEqual(defaultValue);
    expect(consoleSpy).toHaveBeenCalledWith('Error parsing localStorage value:', expect.any(SyntaxError));
    consoleSpy.mockRestore();
  });
});