import type { ReactNode } from "react";
import { BottomTabs } from "./BottomTabs";

export function PhoneShell({ children, tabs = true }: { children: ReactNode; tabs?: boolean }) {
  return (
    <div className="phone-frame flex flex-col">
      <div className="flex-1 flex flex-col">{children}</div>
      {tabs && <BottomTabs />}
    </div>
  );
}
