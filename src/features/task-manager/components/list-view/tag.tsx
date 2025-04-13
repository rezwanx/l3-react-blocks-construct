interface TagProps {
  name: string;
}

export function Tag({ name }: TagProps) {
  return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">{name}</span>;
}
