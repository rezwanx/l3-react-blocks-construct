export type UPasswordInputProps = {
  label?: string;
  placeholder?: string;
  error: string | undefined | null;
} & React.InputHTMLAttributes<HTMLInputElement>;
