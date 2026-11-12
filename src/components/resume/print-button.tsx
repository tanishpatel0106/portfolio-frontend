"use client";

import { IconDownload } from "@tabler/icons-react";
import { buttonClass } from "@/components/shared/primitives";

/** The resume page has a print stylesheet, so "Save as PDF" is always current. */
export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={buttonClass("primary", "no-print")}>
      <IconDownload className="h-4 w-4" />
      Save as PDF
    </button>
  );
}
