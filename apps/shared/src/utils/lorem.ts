const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et",
  "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis",
  "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex",
  "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in",
  "reprehenderit", "voluptate", "velit", "esse", "cillum", "dolore", "eu",
  "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat",
  "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit",
  "anim", "id", "est", "laborum"
];

export function generateLoremIpsum(minWords: number, maxWords: number): string {
  const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words = [];
  
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * LOREM_WORDS.length);
    words.push(LOREM_WORDS[randomIndex]);
  }

  // Capitalize first word and add period at the end
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
} 