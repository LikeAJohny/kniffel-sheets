import { Input } from "../ui/input";

export function ResultField({ value }: { value: number | null }) {
  let val;
  if (value === 0) val = "-";
  else if (value === null) val = "";
  else val = value.toString();

  return (
    <Input
      value={val}
      disabled
      className="w-14 h-8 rounded-none text-center text-sm"
    />
  );
}
