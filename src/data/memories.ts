
export interface TimelineMemory {
  chapter: string;
  title: string;
  date: string;
  description: string;
  symbol: string;
}

export interface LoveLetter {
  title: string;
  icon: string;
  message: string;
}

export const timeline: TimelineMemory[] = [
  {
    chapter: "Chapter I",
    title: "The beginning",
    date: "Month One",
    description:
      "The first pages of a story that neither of us knew would become so special. A little beginning that became a beautiful part of our lives.",
    symbol: "♡",
  },
  {
    chapter: "Chapter II",
    title: "A little closer",
    date: "Month Two",
    description:
      "More conversations, more laughter, and all those tiny details that slowly became our favourite things.",
    symbol: "✿",
  },
  {
    chapter: "Chapter III",
    title: "Our own universe",
    date: "Month Three",
    description:
      "A chapter full of memories, learning about each other, cheering each other on, and growing together.",
    symbol: "☾",
  },
  {
    chapter: "Chapter IV",
    title: "Still choosing you",
    date: "Month Four",
    description:
      "Four months of us. And so many beautiful pages still waiting to be written.",
    symbol: "✧",
  },
];

export const reasons: string[] = [
  "The way your laugh makes an ordinary day feel lighter.",
  "Your kind heart and the care you show people.",
  "How you keep working towards your dreams.",
  "Your little side-eyes that make me laugh.",
  "The warmth in your voice.",
  "Your silly jokes and unexpected humour.",
  "The way you make small moments memorable.",
  "Your patience when we're figuring things out.",
  "How lovely you are when you talk about things you love.",
  "Your courage to keep going on difficult days.",
  "The way you make conversations feel special.",
  "Your thoughtful way of seeing the world.",
  "How you remind me that love can be gentle.",
  "Your dedication to your studies and goals.",
  "The little things you remember.",
  "Your music, singing, and creativity.",
  "The calm you bring to a busy day.",
  "How you let yourself be wonderfully you.",
  "The dreams we get to talk about together.",
  "Simply because you're Ayantika.",
];

export const openWhenLetters: LoveLetter[] = [
  {
    title: "Open when your day feels heavy",
    icon: "☁",
    message:
      "Take a little breath, Kanmaniya. You don't have to solve the whole day at once. Rest when you need to, be gentle with yourself, and remember that I'm cheering for you.",
  },
  {
    title: "Open when you need a smile",
    icon: "☀",
    message:
      "Tiny reminder: somewhere, someone is very proud of you and is probably smiling at the thought of your laugh. I hope something lovely finds you today.",
  },
  {
    title: "Open when you miss me",
    icon: "♡",
    message:
      "Distance can make a day feel longer, but it doesn't erase the little things we've built. Look at the sky for a moment. Somewhere under this same sky, I'm wishing you a peaceful day.",
  },
  {
    title: "Open when you doubt yourself",
    icon: "✧",
    message:
      "You are allowed to learn slowly, make mistakes, and begin again. Your worth isn't measured by one exam or one difficult day. I believe in your effort.",
  },
  {
    title: "Open when it's a special day",
    icon: "✿",
    message:
      "I hope you celebrate yourself today. You deserve joy, peaceful moments, silly laughter, and everything beautiful.",
  },
];

export const hiddenNotes: string[] = [
  "A little reminder: you make the ordinary feel special.",
  "If this were a real scrapbook, this page would smell like lavender.",
  "Du bist mein Lieblingsmensch. ♡",
  "I hope you never forget how much your dreams matter.",
  "Some of my favourite moments are the simplest ones.",
  "Four months down, a whole book of chapters to go.",
];
