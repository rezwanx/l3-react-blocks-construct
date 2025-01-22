import { renderHook } from '@testing-library/react';
import { usePasswordStrength } from './use-password-strength';

describe('usePasswordStrength', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePasswordStrength(''));

    expect(result.current.strength).toBe(0);
    expect(result.current.checks).toEqual({
      length: false,
      case: false,
      number: false,
      special: false,
    });
  });

  it('should validate length requirement', () => {
    const { result } = renderHook(() => usePasswordStrength('short'));
    expect(result.current.checks.length).toBe(false);

    const { result: longResult } = renderHook(() => usePasswordStrength('longpassword'));
    expect(longResult.current.checks.length).toBe(true);
  });

  it('should validate case requirement', () => {
    const { result } = renderHook(() => usePasswordStrength('MixedCase'));
    expect(result.current.checks.case).toBe(true);
  });

  it('should validate number requirement', () => {
    const { result } = renderHook(() => usePasswordStrength('password123'));
    expect(result.current.checks.number).toBe(true);
  });

  it('should validate special character requirement', () => {
    const { result } = renderHook(() => usePasswordStrength('password!'));
    expect(result.current.checks.special).toBe(true);
  });

  it('should calculate correct strength', () => {
    const { result } = renderHook(() => usePasswordStrength('Password1!'));
    expect(result.current.strength).toBe(100);
  });

  it('should return correct color based on strength', () => {
    const { result: weak } = renderHook(() => usePasswordStrength('a'));
    expect(weak.current.getStrengthColor()).toBe('bg-red-500');

    const { result: strong } = renderHook(() => usePasswordStrength('Password1!'));
    expect(strong.current.getStrengthColor()).toBe('bg-green-500');
  });
});
