import { default as words } from "./words.json";

const excludeLetters = "tua";
const includeLetters = "r";
const letters = {
  0: "",
  1: "",
  2: "",
  3: "m",
  4: "e",
};

const hasExcludedLetters = (word: string) => {
  for (let letter of excludeLetters) {
    if (word.includes(letter)) return true;
  }
  return false;
};

const hasLetterOnRightPosition = (word: string) => {
  return Object.entries(letters)
    .filter(([pos, value]) => value)
    .every(([pos, value]) => word[parseInt(pos)] === value);
};

const hasAllIncludedLetters = (word: string) => {
  return includeLetters.split("").every((letter) => word.includes(letter));
};

words
  .filter((word) => !hasExcludedLetters(word))
  .filter(hasAllIncludedLetters)
  .filter(hasLetterOnRightPosition)
  .forEach((word) => console.log(word));
