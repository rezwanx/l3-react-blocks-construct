import React from 'react';
import OtpInput, { AllowedInputTypes, InputProps } from 'react-otp-input';
import { Input } from 'components/ui/input';

export interface UIOtpInputProps {
  value?: string;
  numInputs?: number;
  onChange: (otp: string) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLDivElement>) => void;
  renderInput?: (inputProps: InputProps, index: number) => React.ReactNode;
  shouldAutoFocus?: boolean;
  placeholder?: string;
  renderSeparator?: ((index: number) => React.ReactNode) | React.ReactNode;
  containerStyle?: React.CSSProperties | string;
  inputStyle?: React.CSSProperties | string;
  inputType?: AllowedInputTypes;
  skipDefaultStyles?: boolean;
}

const UIOtpInput: React.FC<UIOtpInputProps> = ({
  numInputs = 6,
  value,
  onChange,
  renderInput = (props) => <Input {...props} />,
}) => {
  return (
    <OtpInput
      containerStyle="flex w-full justify-between"
      inputStyle="h-[48px] !w-[46px] !text-high-emphasis"
      numInputs={numInputs}
      value={value}
      onChange={onChange}
      renderInput={renderInput}
    />
  );
};

export default UIOtpInput;
