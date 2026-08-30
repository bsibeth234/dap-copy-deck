export type Slot = {
  id: string;
  page: string;
  slot: string;
  shape: string;
  current: string;
  next: string;
  why: string;
  kind?: "h1" | "subhead" | "body" | "button" | "meta" | "label" | "title" | "caption";
  locked?: boolean;
  recommendedNew?: boolean;
  confirm?: boolean;
  alts?: { rank: number; text: string; why: string }[];
};

export type PageDiag = {
  n: string;
  name: string;
  path: string;
  can: string[];
  cannot: string[];
};

export type Card = {
  name: string;
  category: string;
  what: string;
  does: string;
  who: string;
  status: string;
  how: string;
};

export type Rec = {
  action: "Add" | "Remove" | "Reorder";
  where: string;
  line: string;
  reason: string;
};
