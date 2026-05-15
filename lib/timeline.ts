export type Movement = {
  numeral: string;
  tempo: string;
  title: string;
  descriptor: string;
};

export type Milestone = {
  year: number;
  shortTitle: string;
  headline: string;
  description: string;
  eyebrow: string;
  movementNumeral: string;
  special?: "silent-year" | "touchdown";
  drillFormation?: string;
};

export const movements: Movement[] = [
  {
    numeral: "I",
    tempo: "Allegro con spirito",
    title: "The Opening Fanfare",
    descriptor: "The band takes the field.",
  },
  {
    numeral: "II",
    tempo: "Adagio dolente",
    title: "A Tradition Falters",
    descriptor: "The march slows toward midfield.",
  },
  {
    numeral: "III",
    tempo: "Vivace risoluto",
    title: "The Return",
    descriptor: "The band re-takes the field after a year of silence.",
  },
  {
    numeral: "IV",
    tempo: "Maestoso",
    title: "The Nation Takes Notice",
    descriptor: "The show crescendos.",
  },
  {
    numeral: "V",
    tempo: "Grandioso",
    title: "The Centennial Crescendo",
    descriptor: "The march reaches the goal.",
  },
];

export const milestones: Milestone[] = [
  {
    year: 1926,
    shortTitle: "The Band is Born",
    headline: "Thirty-six pioneers under Arthur C. Forsblad",
    description:
      "Fresno Normal School's first band forms with 36 charter members.",
    eyebrow: "Fresno Normal School · Founding",
    movementNumeral: "I",
  },
  {
    year: 1934,
    shortTitle: "A Fight Song is Born",
    headline: '"Fight, Varsity" rings out for the first time',
    description:
      "The school becomes Fresno State College and adopts the fight song generations will rise for.",
    eyebrow: "Fresno State College",
    movementNumeral: "I",
  },
  {
    year: 1955,
    shortTitle: "A New Home",
    headline: "The band moves to Shaw Avenue",
    description: "Fresno State relocates to its present-day campus.",
    eyebrow: "A New Campus",
    movementNumeral: "II",
  },
  {
    year: 1972,
    shortTitle: "Becoming a University",
    headline: "California State University, Fresno",
    description:
      "The college becomes a university, and the band grows with it.",
    eyebrow: "Cal State Fresno",
    movementNumeral: "II",
  },
  {
    year: 1980,
    shortTitle: "The BMB Era Begins",
    headline: "Frank Bibb takes the podium",
    description:
      "The Bulldog Marching Band is established as its own program.",
    eyebrow: "A New Identity",
    movementNumeral: "II",
  },
  {
    year: 1982,
    shortTitle: "Two Hundred Strong",
    headline: "Peak membership — the largest BMB in history",
    description:
      "Two hundred musicians take the field together — a high-water mark that still stands.",
    eyebrow: "High-Water Mark",
    movementNumeral: "II",
    drillFormation: "200-member block formation",
  },
  {
    year: 1992,
    shortTitle: "The Silent Year",
    headline: "Budget cuts silence the marching band",
    description:
      "For one painful season the program goes dark. Dr. Sutherland keeps the embers alive with a small Spirit Band.",
    eyebrow: "In Memoriam · A Season Without a March",
    movementNumeral: "II",
    special: "silent-year",
  },
  {
    year: 1993,
    shortTitle: "The Comeback",
    headline: "The Bulldog Marching Band returns",
    description:
      "Dr. Gary P. Gilroy rebuilds the program from the ground up and launches the Bulldog Beat.",
    eyebrow: "Rebirth",
    movementNumeral: "III",
  },
  {
    year: 1994,
    shortTitle: "Hollywood",
    headline: "The reborn band marches in the Hollywood Christmas Parade",
    description:
      "One year after returning, the band performs on a national stage.",
    eyebrow: "On the National Stage",
    movementNumeral: "III",
  },
  {
    year: 1999,
    shortTitle: "A Million-Dollar Gift",
    headline: "An anonymous donor secures the band's future",
    description:
      "A million-dollar endowment guarantees the program for generations.",
    eyebrow: "Secured",
    movementNumeral: "III",
  },
  {
    year: 2010,
    shortTitle: "A Brother Remembered",
    headline: "Nathan Ray's spot is left open all season",
    description:
      "After the loss of freshman tuba player Nathan Ray, his place on the field is honored all year; the Rookie of the Year award is created in his name.",
    eyebrow: "In Memoriam",
    movementNumeral: "III",
    drillFormation: "Band spelling 100",
  },
  {
    year: 2013,
    shortTitle: "Mountain West Champions",
    headline: "The band marches to a conference title",
    description:
      "The BMB takes the field alongside the team for the inaugural Mountain West Championship win.",
    eyebrow: "Champions",
    movementNumeral: "IV",
  },
  {
    year: 2017,
    shortTitle: "Ensemble of Excellence",
    headline: "Named one of the nation's top eight college marching bands",
    description:
      "The College Band Directors National Association honors the BMB among the very best in the country.",
    eyebrow: "CBDNA · Top Eight in the Nation",
    movementNumeral: "IV",
    special: "touchdown",
  },
  {
    year: 2020,
    shortTitle: "The Year Without a March",
    headline: "The pandemic cancels the season",
    description:
      "COVID-19 halts the marching season; select members represent Fresno State in a national virtual ensemble.",
    eyebrow: "A Quieter Year",
    movementNumeral: "V",
  },
  {
    year: 2023,
    shortTitle: "Pasadena to Dublin",
    headline: "Rose Parade and a St. Patrick's Day march abroad",
    description:
      "The band marches in the Rose Parade and joins a Mountain West all-star band in Dublin, Ireland.",
    eyebrow: "Around the World",
    movementNumeral: "V",
  },
  {
    year: 2026,
    shortTitle: "100 Years Strong",
    headline: "A century of the Bulldog Marching Band",
    description:
      "One hundred years on, alumni return home to celebrate the centennial.",
    eyebrow: "The Centennial",
    movementNumeral: "V",
    drillFormation: "Band spelling BMB 100",
  },
];
