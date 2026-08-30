import { slots as siteAndHome } from "./slots";
import { offerSlots } from "./slots-offer";
import { howSlots } from "./slots-how";
import { builtSlots } from "./slots-built";
import { docsSlots, aboutSlots } from "./slots-docs";
import type { Slot } from "./types";

export const allSlots: Slot[] = [
  ...siteAndHome,
  ...offerSlots,
  ...howSlots,
  ...builtSlots,
  ...docsSlots,
  ...aboutSlots,
];

export const pages = [
  "Site-wide",
  "01 Home",
  "02 Living Policy",
  "03 Embedded Architect",
  "04 How It Works",
  "05 Built",
  "06 Documents",
  "07 About",
] as const;

export type PageName = (typeof pages)[number];
