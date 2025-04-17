import type { ReactNode } from "react";

export function SheetRow({
  name,
  explanation,
}: {
  name: string | ReactNode;
  explanation: string | ReactNode;
}) {
  return (
    <div className="flex w-max text-xs">
      <div className="w-24 h-8 px-2 flex justify-center items-center text-center border">
        {name}
      </div>
      <div className="w-24 h-8 px-2 flex justify-center items-center text-center border">
        {explanation}
      </div>
    </div>
  );
}
