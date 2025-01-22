import { renderHook } from '@testing-library/react';
import { usePasswordStrength, PASSWORD_REQUIREMENTS } from './use-password-strength';

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
    expect(result.current.allRequirementsMet).toBe(false);
    expect(result.current.requirements).toBe(PASSWORD_REQUIREMENTS);
  });

  describe('password validation', () => {
    it('should validate length requirement', () => {
      const { result: shortPass } = renderHook(() => usePasswordStrength('Short1!'));
      expect(shortPass.current.checks.length).toBe(false);

      const { result: longPass } = renderHook(() => usePasswordStrength('LongPassword1!'));
      expect(longPass.current.checks.length).toBe(true);
    });

    it('should validate case requirement', () => {
      const { result: lowerCase } = renderHook(() => usePasswordStrength('lowercase1!'));
      expect(lowerCase.current.checks.case).toBe(false);

      const { result: upperCase } = renderHook(() => usePasswordStrength('UPPERCASE1!'));
      expect(upperCase.current.checks.case).toBe(false);

      const { result: mixedCase } = renderHook(() => usePasswordStrength('MixedCase1!'));
      expect(mixedCase.current.checks.case).toBe(true);
    });

    it('should validate number requirement', () => {
      const { result: noNumber } = renderHook(() => usePasswordStrength('Password!'));
      expect(noNumber.current.checks.number).toBe(false);

      const { result: withNumber } = renderHook(() => usePasswordStrength('Password1!'));
      expect(withNumber.current.checks.number).toBe(true);
    });

    it('should validate special character requirement', () => {
      const { result: noSpecial } = renderHook(() => usePasswordStrength('Password1'));
      expect(noSpecial.current.checks.special).toBe(false);

      const { result: withSpecial } = renderHook(() => usePasswordStrength('Password1!'));
      expect(withSpecial.current.checks.special).toBe(true);
    });
  });

  describe('strength calculation', () => {
    it('should calculate strength correctly', () => {
      const testCases = [
        { password: 'weak', expected: 0 },
        { password: 'password', expected: 25 },
        { password: 'Password', expected: 50 },
        { password: 'Password1', expected: 75 },
        { password: 'Password1!', expected: 100 },
      ];

      testCases.forEach(({ password, expected }) => {
        const { result } = renderHook(() => usePasswordStrength(password));
        expect(result.current.strength).toBe(expected);
      });
    });
  });

  describe('strength color', () => {
    it('should return correct color based on strength', () => {
      const testCases = [
        { password: 'weak', expected: 'bg-red-500' },
        { password: 'Password', expected: 'bg-orange-500' },
        { password: 'Password1', expected: 'bg-yellow-500' },
        { password: 'Password1!', expected: 'bg-green-500' },
      ];

      testCases.forEach(({ password, expected }) => {
        const { result } = renderHook(() => usePasswordStrength(password));
        expect(result.current.getStrengthColor()).toBe(expected);
      });
    });
  });
});
