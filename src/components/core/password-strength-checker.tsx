import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

type RequirementKey = 'length' | 'case' | 'number' | 'special';

interface Requirement {
  key: RequirementKey;
  label: string;
}

interface PasswordChecks {
  length: boolean;
  case: boolean;
  number: boolean;
  special: boolean;
}

interface PasswordStrengthCheckerProps {
  password: string;
  onRequirementsMet: (met: boolean) => void;
}

const PasswordStrengthChecker: React.FC<PasswordStrengthCheckerProps> = ({
  password,
  onRequirementsMet,
}) => {
  const [strength, setStrength] = useState(0);
  const [checks, setChecks] = useState<PasswordChecks>({
    length: false,
    case: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    const newChecks: PasswordChecks = {
      length: password.length >= 8,
      case: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    setChecks(newChecks);

    const strengthScore = Object.values(newChecks).filter(Boolean).length;
    setStrength(strengthScore * 25);

    const allRequirementsMet = Object.values(newChecks).every(Boolean);
    onRequirementsMet(allRequirementsMet);
  }, [password, onRequirementsMet]);

  const getStrengthColor = () => {
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-orange-500';
    if (strength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const requirements: Requirement[] = [
    { key: 'length', label: 'At least 8 characters' },
    { key: 'case', label: 'At least 1 uppercase and 1 lowercase letter' },
    { key: 'number', label: 'At least 1 digit' },
    { key: 'special', label: 'At least 1 special character' },
  ];

  return (
    <div className="w-full mx-auto px-6 py-4 rounded-lg shadow-sm border border-primary-shade-50">
      <h2 className="text-sm font-semibold text-high-emphasis mb-2">Password strength</h2>
      <div className="h-1 w-full bg-primary-shade-50 rounded mb-2">
        <div
          className={`rounded-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${strength}%` }}
        />
      </div>

      <p className="text-medium-emphasis mb-2 text-xs">Check your password strength.</p>

      <p className="text-medium-emphasis mb-2 text-xs">Your password must contain:</p>

      <ul className="space-y-1 text-medium-emphasis text-xs">
        {requirements.map((requirement) => (
          <li key={requirement.key} className="flex items-center gap-2">
            {checks[requirement.key] ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <X className="w-4 h-4 text-red-500" />
            )}
            {requirement.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrengthChecker;
