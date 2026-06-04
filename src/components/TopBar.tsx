import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function TopBar({ title, right, back = true }: { title: string; right?: ReactNode; back?: boolean }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
      {back && (
        <Link to="/" className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      )}
      <h1 className="flex-1 truncate text-base font-semibold">{title}</h1>
      {right}
    </header>
  );
}
