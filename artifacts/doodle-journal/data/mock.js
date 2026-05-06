export const mockEntries = [
  {
    id: "1",
    title: "A good morning walk",
    content:
      "Woke up early today and decided to take a long walk through the neighborhood. The air smelled like rain and fresh bread from the bakery on the corner. I noticed a cat sitting perfectly still on a windowsill — like a little statue. Feeling grateful for small things today.",
    mood: "happy",
    moodEmoji: "😊",
    date: "2026-05-03",
    tags: ["morning", "nature", "gratitude"],
    color: "#FDF3C0",
    wordCount: 58,
    isFavorite: true,
  },
  {
    id: "2",
    title: "The meeting that drained me",
    content:
      "Three hours of back-to-back calls. My brain feels like overcooked pasta. I kept forgetting words mid-sentence which was embarrassing. Need to build more breaks into my schedule. The one highlight was a funny moment when someone's dog ran across their video call.",
    mood: "tired",
    moodEmoji: "😴",
    date: "2026-05-02",
    tags: ["work", "reflection"],
    color: "#ffffff",
    wordCount: 51,
    isFavorite: false,
  },
  {
    id: "3",
    title: "Tried a new recipe",
    content:
      "Made shakshuka for the first time. Burnt the edges of the toast but the eggs were perfect. Ate it on the balcony while listening to a playlist I haven't touched in two years. Some songs hit differently now.",
    mood: "content",
    moodEmoji: "🙂",
    date: "2026-05-01",
    tags: ["cooking", "weekend"],
    color: "#ffffff",
    wordCount: 43,
    isFavorite: false,
  },
  {
    id: "4",
    title: "Couldn't sleep again",
    content:
      "3am thoughts: Is my career going the right direction? Do I call my parents enough? Why is it so hard to just rest? Ended up reading until dawn. The book was about a man who walks across a continent alone. Maybe that sounds nice right now.",
    mood: "anxious",
    moodEmoji: "😟",
    date: "2026-04-30",
    tags: ["sleep", "anxiety", "night"],
    color: "#ffffff",
    wordCount: 52,
    isFavorite: false,
  },
  {
    id: "5",
    title: "Birthday dinner for Layla",
    content:
      "We booked the rooftop place. The view was perfect, the food was incredible, and Layla cried happy tears when the cake came out. Moments like these remind me why good friends are everything. Came home smiling.",
    mood: "joyful",
    moodEmoji: "🥳",
    date: "2026-04-28",
    tags: ["friends", "celebration"],
    color: "#FDF3C0",
    wordCount: 44,
    isFavorite: true,
  },
  {
    id: "6",
    title: "Creative block day",
    content:
      "Sat at my desk for four hours and produced nothing meaningful. Stared at a blank document. Tried doodling instead — that helped a little. Maybe this is a signal to step away and let ideas breathe.",
    mood: "frustrated",
    moodEmoji: "😤",
    date: "2026-04-26",
    tags: ["creativity", "work"],
    color: "#ffffff",
    wordCount: 40,
    isFavorite: false,
  },
  {
    id: "7",
    title: "Museum afternoon",
    content:
      "Spent the afternoon at the contemporary art museum alone. One painting stopped me for 20 minutes — all grey with a single red dot. I had no idea why it hit me so hard. Art is weird and wonderful.",
    mood: "inspired",
    moodEmoji: "🌟",
    date: "2026-04-25",
    tags: ["art", "solo", "inspiration"],
    color: "#FDF3C0",
    wordCount: 45,
    isFavorite: true,
  },
];

export const mockOnThisDay = {
  id: "old-1",
  title: "First day at the new job",
  content:
    "Nervous doesn't even cover it. I wore the wrong shoes, got off at the wrong metro stop, and arrived seven minutes late. But somehow — everyone was so kind. The team took me to lunch and I laughed more than I have in weeks. Maybe this is going to be okay.",
  mood: "nervous",
  moodEmoji: "😬",
  date: "2025-05-03",
  yearAgo: 1,
  tags: ["work", "new beginnings"],
  color: "#FDF3C0",
  wordCount: 57,
};

export const mockMoodLog = [
  { date: "2026-05-03", mood: "happy", emoji: "😊", score: 4 },
  { date: "2026-05-02", mood: "tired", emoji: "😴", score: 2 },
  { date: "2026-05-01", mood: "content", emoji: "🙂", score: 3 },
  { date: "2026-04-30", mood: "anxious", emoji: "😟", score: 1 },
  { date: "2026-04-29", mood: "okay", emoji: "😐", score: 3 },
  { date: "2026-04-28", mood: "joyful", emoji: "🥳", score: 5 },
  { date: "2026-04-27", mood: "content", emoji: "🙂", score: 3 },
  { date: "2026-04-26", mood: "frustrated", emoji: "😤", score: 2 },
  { date: "2026-04-25", mood: "inspired", emoji: "🌟", score: 5 },
  { date: "2026-04-24", mood: "happy", emoji: "😊", score: 4 },
  { date: "2026-04-23", mood: "tired", emoji: "😴", score: 2 },
  { date: "2026-04-22", mood: "content", emoji: "🙂", score: 3 },
];

export const mockTags = [
  "morning", "nature", "gratitude", "work", "reflection",
  "cooking", "weekend", "sleep", "anxiety", "night",
  "friends", "celebration", "creativity", "art", "solo", "inspiration",
];

export const mockInsights = {
  totalEntries: 47,
  currentStreak: 7,
  longestStreak: 14,
  avgWordsPerEntry: 52,
  topMood: "content",
  topMoodEmoji: "🙂",
  topTag: "work",
  moodBreakdown: [
    { mood: "happy",   emoji: "😊", count: 12, percent: 26 },
    { mood: "content", emoji: "🙂", count: 10, percent: 21 },
    { mood: "tired",   emoji: "😴", count: 8,  percent: 17 },
    { mood: "inspired",emoji: "🌟", count: 7,  percent: 15 },
    { mood: "anxious", emoji: "😟", count: 5,  percent: 11 },
    { mood: "joyful",  emoji: "🥳", count: 5,  percent: 10 },
  ],
  monthlyEntries: [
    { month: "Jan", count: 8 },
    { month: "Feb", count: 12 },
    { month: "Mar", count: 9 },
    { month: "Apr", count: 11 },
    { month: "May", count: 7 },
  ],
};

export const mockUser = {
  name: "Alex",
  joinDate: "2026-01-01",
  pin: "1234",
};
