import type { PageDiag } from "./types";

export const pages: PageDiag[] = [
  {
    n: "01",
    name: "Home",
    path: "/",
    can: [
      "Repeat a three-line tagline about policy, governance and context.",
      "See that something called a compiler sits between documents and a signed record.",
      "Notice the firm is in Toronto.",
    ],
    cannot: [
      "Say what DAP is in a sentence they would actually use in a Monday meeting.",
      "Tell whether this is for them. No CIO, no CCO, no Head of Risk. Institution types sit below the fold.",
      "Name what they would buy. There is no offer on the first screen.",
      "See anything in play. Bellwether, the only live public product, is not here.",
      "Trust the only number on the page. 'Fewer than one in four' has no source.",
    ],
  },
  {
    n: "02",
    name: "Living Policy",
    path: "/living-policy",
    can: [
      "Infer that written policy is meant to become running logic.",
      "Follow four process rules: source, dry run, seal, revoke.",
    ],
    cannot: [
      "Tell Living Policy Architecture from the context layer from the compiler. The H1 says they are the same thing. They are not.",
      "Know who this is for, or what it costs them in time, people or money.",
      "See a next step that is commercial. 'Next: Embedded Architect' is a tour, not an offer.",
    ],
  },
  {
    n: "03",
    name: "Embedded Architect",
    path: "/embedded-architect",
    can: [
      "See that there is a ninety-day engagement and a fixed-scope assessment.",
      "See that the client is supposed to own the result.",
    ],
    cannot: [
      "Tell if this is for a CIO, a CCO, or an IT vendor selection committee. Seats are unnamed.",
      "Know that Offer 02 is the Embedded Context Architect. The card still says 'Direct engagement'.",
      "Understand 'context layer' without already knowing the rest of the site.",
      "Feel that anyone is already doing this. No proof, no names, no status.",
    ],
  },
  {
    n: "04",
    name: "How It Works",
    path: "/how-it-works",
    can: [
      "See four named planes and a working demo they can approve themselves.",
      "Believe, if they stay, that a record can be produced without a model in the loop.",
    ],
    cannot: [
      "Survive the first screen. 'One instrument. Four planes' plus a 32-word doctrine paragraph is internal language.",
      "Connect the compiler to a purchase. There is no buyer, no offer, no 'this is what you take to your board'.",
      "Know what 'ratify', 'attested' or 'deterministic' means unless they already live in this vocabulary.",
    ],
  },
  {
    n: "05",
    name: "What We Have Built",
    path: "/built",
    can: [
      "List six product names.",
      "Watch demos that look like software rather than slides.",
    ],
    cannot: [
      "Tell which of these is live, which is demonstrated, and which is a frame. Status labels were stripped site-wide.",
      "Find Bellwether, the one product a stranger can open today without a call.",
      "Know how any of this is sold, or which seat owns which runtime.",
      "Stay on Racing without wondering if they opened the wrong firm.",
    ],
  },
  {
    n: "06",
    name: "Documents",
    path: "/documents",
    can: [
      "See that the firm publishes papers, a standard, and a public connector.",
      "Open Bellwether, if they get this far.",
    ],
    cannot: [
      "Know which document to read first as a buyer. The page is a repository, not a briefing.",
      "Avoid the changelog, which still contains the retired 'Fractional AI partner' name and reads as internal notes.",
    ],
  },
  {
    n: "07",
    name: "About",
    path: "/about",
    can: [
      "Place the founder: he sold MSCI Burgiss and SS&C GlobeOp, Toronto, January 2025.",
      "Read the locked rule: Models propose. Humans ratify.",
    ],
    cannot: [
      "Name the buyer by seat.",
      "See a client, a result, or a reason to believe anyone has hired this firm.",
      "Get a next step that feels like a conversation rather than a loop back to Home.",
    ],
  },
];

export const gaps = [
  {
    n: "1",
    title: "DAP is never defined.",
    body: "A first-time CIO cannot repeat what this firm does. The tagline is locked and fine as poetry. It is not a definition. 'The context layer for institutional intelligence' is locked and unexplained. Every page that uses it fails the stranger test on first read. The reviewer said there is no definition of what DAP is. They were right, and it is still true.",
  },
  {
    n: "2",
    title: "The buyer is unnamed.",
    body: "Institution types appear once on Home. Seats never appear. The people who sign, the CIO and the CCO, cannot find themselves. Head of Risk, General Counsel and COO are invisible. The reviewer said you did not specify who the market buyers are. That is still the case on every page.",
  },
  {
    n: "3",
    title: "The product is not the thing for sale.",
    body: "Home sells a diagram. Living Policy sells a discipline. How It Works sells a compiler. Built sells six runtimes. Documents sell papers. The actual products, a readiness assessment and a ninety-day Embedded Context Architect, sit on page 03 behind a tour. A prospect who gives the site eight seconds never reaches the offer. The reviewer said the product is not well defined. Correct: architecture is defined. The offer is hidden.",
  },
  {
    n: "4",
    title: "Nothing in play is on Home.",
    body: "Bellwether is live, public, free, and the strongest proof the firm has. It lives on Documents, under Standards and open work. Client engagements exist and are unnamed. Status labels were removed in 24.0.0, so Designed and Live now look identical. The reviewer said this is all concept, nothing is in play. On the first screen, that is accurate.",
  },
  {
    n: "5",
    title: "The one statistic cannot be defended.",
    body: "'Fewer than one in four could pass an independent audit of it in 90 days' is the only number on Home and it has no source. A CCO will ask. There is no answer. Cut it. Replace it with the actual problem, which does not need a fake base rate: you already run AI, and you cannot show an examiner how a given decision was made.",
  },
];
