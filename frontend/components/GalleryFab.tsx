"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/vivaha";

export function GalleryFab() {
  const pathname = usePathname();
  if (pathname === "/gallery") return null;

  return (
    <Link href="/gallery" className="vv-fab" aria-label="Upload or view wedding photos">
      <Icon name="lotus" size={20} />
      <span>Photos</span>
    </Link>
  );
}
