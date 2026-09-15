type Venue = {
  name: string;
  line1: string;
  line2: string;
  mapsSearch: string;
  mapsEmbed: string;
};

export type WeddingEvent = {
  id: "nikah" | "walima";
  name: string;
  arabic: string;
  desc: string;
  weekday: string;
  day: string;
  month: string;
  monthShort: string;
  year: string;
  time: string;
  timeDigits: string;
  meridiem: string;
  iso: string;
  display: string;
  venue: Venue;
};

const venue = (
  name: string,
  line1: string,
  line2: string,
  share: string,
  lat: number,
  lng: number,
): Venue => ({
  name,
  line1,
  line2,
  mapsSearch: share,
  mapsEmbed: `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`,
});

export const events: readonly WeddingEvent[] = [
  {
    id: "nikah",
    name: "Nikah",
    arabic: "نکاح",
    desc: "The sacred Nikah ceremony",
    weekday: "Friday",
    day: "25",
    month: "September",
    monthShort: "Sep",
    year: "2026",
    time: "8 PM",
    timeDigits: "8:00",
    meridiem: "PM",
    iso: "2026-09-25T20:00:00+05:30",
    display: "Friday, September 25, 2026",
    venue: venue(
      "Inam Vihar",
      "Q728, Chowk, beside Sabhapur, Sarad City",
      "Ghaziabad, Uttar Pradesh 201102",
      "https://maps.app.goo.gl/gfRPgw4FsfUBLsyW7",
      28.752106,
      77.266495,
    ),
  },
  {
    id: "walima",
    name: "Walima",
    arabic: "ولیمہ",
    desc: "The Walima reception and dinner",
    weekday: "Saturday",
    day: "26",
    month: "September",
    monthShort: "Sep",
    year: "2026",
    time: "8 PM",
    timeDigits: "8:00",
    meridiem: "PM",
    iso: "2026-09-26T20:00:00+05:30",
    display: "Saturday, September 26, 2026",
    venue: venue(
      "JMD Garden",
      "Aya Nagar, Arjangarh",
      "New Delhi",
      "https://maps.app.goo.gl/mTbT1uNjGQDaoSqM9",
      28.472253,
      77.1345345,
    ),
  },
] as const;

const nikah = events[0];

export const site = {
  title: "Saif & Farhat | Wedding Invitation",
  description:
    "Join us in celebrating the wedding of Mohd. Saif Uddin and Farhat Khatoon — Nikah on September 25 and Walima on September 26, 2026.",
  url: "https://saif-farhat.vercel.app",
  monogram: { left: "S", right: "F" },
  couple: {
    bride: "Farhat Khatoon",
    brideShort: "Farhat",
    groom: "Mohd. Saif Uddin",
    groomShort: "Saif",
  },
  slug: "saif-farhat",
  events,
  /** Primary event (Nikah): used for the countdown and single-date spots. */
  date: {
    display: nikah.display,
    iso: nikah.iso,
    weekday: nikah.weekday,
    day: nikah.day,
    month: nikah.month,
    year: nikah.year,
    time: nikah.time,
    /** Both days in one line, e.g. footer. */
    range: "25 & 26 September 2026",
  },
  venue: nikah.venue,
  contactPhone: "+91 84473 71925",
  contactPhoneTel: "+918447371925",
  credit: "designed with love",
  nav: [
    { href: "/", label: "Welcome" },
    { href: "/our-story", label: "Our Story" },
    { href: "/schedule", label: "Schedule" },
    { href: "/travel", label: "Travel" },
  ],
} as const;

export const home = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  bismillahTranslation: "In the name of Allah, the Most Gracious, the Most Merciful",
  invite: "Together with their families",
  request: "Request the pleasure of your company",
  celebration: "at the celebration of their marriage",
  welcomeHeading: "Welcome to Our Wedding",
  welcomeBody: [
    "We are overjoyed to invite you to share in the celebration of our love. Your presence would mean the world to us as we begin this beautiful journey together.",
    "This website has all the information you need about our special day. We can't wait to celebrate with you!",
  ],
  meme: {
    waitScript: "But wait…",
    waitLabel: "there's more",
    brideLine: "Do you love me?",
    groomLine: "We're about to say Qubool Hai… are you serious?",
    /** countdown sentence: "In {n} days… {after}" */
    countdownBefore: "In",
    countdownAfter: "Farhat will finally believe that Saif actually loves her.",
    countdownPast: "Alhamdulillah. Farhat now believes that Saif actually loves her.",
    footnote: "(He does. He's just bad at answering questions.)",
  },
  stage: {
    families: "Together with their families",
    invitedTo: "You are invited to the wedding of",
    inviteLine: "invite you to their wedding celebration",
    scrollCue: "Scroll for details",
    skip: "Skip",
    replay: "Replay",
    groomLabel: "The Groom",
    brideLabel: "The Bride",
  },
} as const;

export const story = {
  heading: "Our Story",
  subtitle:
    "Two families, one dua, and a promise made for a lifetime. This is how Saif and Farhat's story began.",
  bride: {
    name: "Farhat Khatoon",
    label: "The Bride",
    bio: "Gentle, quick to laugh, and steady in her faith, Farhat brings calm to every room she enters. She is the one who remembers the small things, and the one everyone turns to when it matters.",
  },
  groom: {
    name: "Mohd. Saif Uddin",
    label: "The Groom",
    bio: "Thoughtful, hardworking, and endlessly patient, Saif leads with kindness. He carries his family's values with pride and meets every day with a quiet, hopeful heart.",
  },
  journeyHeading: "Our Journey Together",
  journey: [
    {
      label: "The Introduction",
      title: "Two Families Meet",
      text: "It began the way the best stories in our families always have: with an introduction, a cup of chai, and two families who found they had far more in common than they expected.",
      icon: "heart",
    },
    {
      label: "Getting to Know Each Other",
      title: "Conversations That Mattered",
      text: "Over long phone calls and careful, honest conversations, Saif and Farhat discovered a shared sense of humour, the same quiet values, and an ease with each other that felt like it had always been there.",
      icon: "sparkles",
    },
    {
      label: "The Yes",
      title: "Alhamdulillah, It Was Decided",
      text: "With the blessings of both families, the answer was a joyful yes. Sweets were shared, duas were made, and a date was set that we have been counting down to ever since.",
      icon: "heart-filled",
    },
    {
      label: "September 25 & 26, 2026",
      title: "The Nikah and the Walima",
      text: "Now we invite you to witness the Nikah at Inam Vihar, Ghaziabad, and to celebrate with us at the Walima at JMD Garden, Aya Nagar, Delhi. Your presence and your duas are the gifts we cherish most.",
      icon: "calendar",
    },
  ],
  quote: {
    text: "And We created you in pairs.",
    author: "Qur'an 78:8",
  },
} as const;

export const schedule = {
  heading: "Wedding Schedule",
  subtitle:
    "Two evenings of love, joy, and celebration — the Nikah in Ghaziabad and the Walima in Delhi. Here's what to expect.",
  eventsHeading: "Order of Events",
  /** Per-event running order. Times beyond the start are placeholders. */
  events: [
    {
      eventId: "nikah",
      title: "Nikah Ceremony",
      time: "8:00",
      meridiem: "PM",
      desc: "The sacred Nikah ceremony uniting Saif and Farhat, followed by dinner",
    },
    {
      eventId: "walima",
      title: "Walima Reception",
      time: "8:00",
      meridiem: "PM",
      desc: "An evening of celebration and a lavish dinner with family and friends",
    },
  ],
} as const;

export const travel = {
  heading: "Travel & Accommodation",
  subtitle:
    "Everything you need to know about reaching both venues — Inam Vihar in Ghaziabad for the Nikah, and JMD Garden in Aya Nagar, Delhi for the Walima.",
  venueLabel: "Wedding Venues",
  gettingThereHeading: "Getting There",
  gettingThereEyebrow: "Reaching Delhi NCR",
  gettingThere: [
    {
      title: "By Air",
      icon: "plane",
      text: "Fly into Indira Gandhi International Airport, New Delhi (DEL). JMD Garden in Aya Nagar is a short drive from the airport along the Mehrauli–Gurgaon road; Inam Vihar, Ghaziabad is roughly an hour by cab depending on traffic.",
    },
    {
      title: "By Train",
      icon: "train",
      text: "New Delhi, Anand Vihar Terminal and Ghaziabad Junction are the nearest major stations. Ghaziabad Junction is the most convenient for the Nikah; from New Delhi station, a cab or the Yellow Line metro takes you towards Aya Nagar for the Walima.",
    },
    {
      title: "By Metro & Road",
      icon: "car",
      text: "Arjangarh station on the Yellow Line is the closest metro to JMD Garden. Ghaziabad is served by the Red and Blue lines, with cabs and autos readily available for the last stretch. Both venues are reachable by car via NH-48 and NH-9 respectively.",
    },
  ],
  hotelsHeading: "Where to Stay",
  hotelsIntro:
    "We are finalising a list of recommended stays. In the meantime, hotels around Aerocity and Mahipalpur are close to both the airport and JMD Garden, while Indirapuram, Vaishali and Kaushambi are convenient for Inam Vihar in Ghaziabad.",
  /** TODO: add recommended hotels (name, address, distance, tier, phone, tel). */
  hotels: [] as readonly {
    name: string;
    address: string;
    distance: string;
    tier: string;
    phone: string;
    tel: string;
  }[],
  assistance: {
    title: "Need Travel Assistance?",
    body: "If you need help with travel arrangements or have any questions, please don't hesitate to reach out.",
  },
} as const;
