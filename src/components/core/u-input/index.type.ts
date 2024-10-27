export type CustomInputProps = {
  label: string;
  placeholder: string;
  error: string | undefined | null;
} & React.InputHTMLAttributes<HTMLInputElement>;
