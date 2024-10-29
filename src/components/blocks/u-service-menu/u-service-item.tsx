import { UServiceItemProps } from "./index.type";

export const UServiceItem = ({ label, icon }: UServiceItemProps) => {
  const Icon = icon;
  return (
    <div className="flex flex-col justify-center items-center text-gray-500 hover:bg-gray-50 p-2">
      <div>
        <Icon className="w-8 h-8" />
      </div>
      <div className="text-sm">{label}</div>
    </div>
  );
};
