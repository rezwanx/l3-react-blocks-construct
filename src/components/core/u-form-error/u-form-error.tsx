import { UFormErrorProps } from "./index.type";

export const UFormError = ({ error }: UFormErrorProps) => {
  if (!error) return null;
  return (
    <span className="text-xs italic text-red-600 font-semibold">*{error}</span>
  );
};
