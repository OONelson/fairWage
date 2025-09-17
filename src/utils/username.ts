const adjectives = [
  "Cautious",
  "Strategic",
  "Brave",
  "Curious",
  "Calm",
  "Swift",
  "Witty",
  "Bold",
  "Quiet",
  "Steady",
];

const animals = [
  "Platypus",
  "Hawk",
  "Otter",
  "Panda",
  "Falcon",
  "Wolf",
  "Lynx",
  "Sparrow",
  "Bison",
  "Fox",
];

export const generateUsername = (seed?: string) => {
  const s = seed ?? Math.random().toString(36).slice(2);
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  const adj = adjectives[Math.abs(hash) % adjectives.length];
  const ani = animals[Math.abs(Math.floor(hash / 97)) % animals.length];
  const num = Math.abs(Math.floor(hash / 389)) % 1000;
  return `${adj}${ani}${num.toString().padStart(2, "0")}`;
};
