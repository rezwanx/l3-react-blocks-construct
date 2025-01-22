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
    it('should calculate no strength (0%) when no requirements are met', () => {
      const { result } = renderHook(() => usePasswordStrength('weak'));
      expect(result.current.strength).toBe(0);
    });

    it('should calculate 25% strength when one requirement is met', () => {
      const { result } = renderHook(() => usePasswordStrength('password')); // only lowercase
      expect(result.current.strength).toBe(25);
    });

    it('should calculate 50% strength when two requirements are met', () => {
      const { result } = renderHook(() => usePasswordStrength('Password')); // length + case
      expect(result.current.strength).toBe(50);
    });

    it('should calculate 75% strength when three requirements are met', () => {
      const { result } = renderHook(() => usePasswordStrength('Password1')); // length + case + number
      expect(result.current.strength).toBe(75);
    });

    it('should calculate 100% strength when all requirements are met', () => {
      const { result } = renderHook(() => usePasswordStrength('Password1!')); // all requirements
      expect(result.current.strength).toBe(100);
    });
  });

  describe('strength color indicator', () => {
    it('should return red for strength <= 25', () => {
      const { result } = renderHook(() => usePasswordStrength('weak'));
      expect(result.current.getStrengthColor()).toBe('bg-red-500');
    });

    it('should return orange for strength <= 50', () => {
      const { result } = renderHook(() => usePasswordStrength('Password'));
      expect(result.current.getStrengthColor()).toBe('bg-orange-500');
    });

    it('should return yellow for strength <= 75', () => {
      const { result } = renderHook(() => usePasswordStrength('Password1'));
      expect(result.current.getStrengthColor()).toBe('bg-yellow-500');
    });

    it('should return green for strength > 75', () => {
      const { result } = renderHook(() => usePasswordStrength('Password1!'));
      expect(result.current.getStrengthColor()).toBe('bg-green-500');
    });
  });

  describe('allRequirementsMet flag', () => {
    it('should be false when not all requirements are met', () => {
      const { result } = renderHook(() => usePasswordStrength('Password1')); // missing special char
      expect(result.current.allRequirementsMet).toBe(false);
    });

    it('should be true when all requirements are met', () => {
      const { result } = renderHook(() => usePasswordStrength('Password1!'));
      expect(result.current.allRequirementsMet).toBe(true);
    });
  });

  describe('password updates', () => {
    it('should update checks when password changes', () => {
      const { result, rerender } = renderHook((props) => usePasswordStrength(props.password), {
        initialProps: { password: 'weak' },
      });

      expect(result.current.checks.case).toBe(false);

      rerender({ password: 'StrongPass1!' });

      expect(result.current.checks.case).toBe(true);
      expect(result.current.checks.length).toBe(true);
      expect(result.current.checks.number).toBe(true);
      expect(result.current.checks.special).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle empty password', () => {
      const { result } = renderHook(() => usePasswordStrength(''));
      expect(result.current.strength).toBe(0);
      expect(result.current.allRequirementsMet).toBe(false);
    });

    it('should handle password with spaces', () => {
      const { result } = renderHook(() => usePasswordStrength('Pass word 1!'));
      expect(result.current.checks.length).toBe(true);
      expect(result.current.checks.case).toBe(true);
      expect(result.current.checks.number).toBe(true);
      expect(result.current.checks.special).toBe(true);
    });

    it('should handle password with only special characters', () => {
      const { result } = renderHook(() => usePasswordStrength('!@#$%^&*'));
      expect(result.current.checks.special).toBe(true);
      expect(result.current.checks.case).toBe(false);
      expect(result.current.checks.number).toBe(false);
    });
  });
});
