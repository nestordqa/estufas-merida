import { Check } from "lucide-react";
import type { ReactNode } from "react";

/** Check naranja dentro de un círculo, como el del post. */
export const CheckMark = () => (
  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-fire">
    <Check className="h-3.5 w-3.5 text-fire" strokeWidth={3.5} />
  </span>
);

export const CheckItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <li className={`flex items-start gap-3 ${className ?? ""}`}>
    <CheckMark />
    <span>{children}</span>
  </li>
);
