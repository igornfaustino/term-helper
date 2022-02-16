import { default as words } from "../resources/words.json";

export class WordFilterUseCase {
  WORDS = words;

  constructor(
    private excludeLetters: string,
    private includeLetters: string,
    private letters: Record<string, string>
  ) {}

  execute() {
    return this.WORDS.filter((word) => !this.hasExcludedLetters(word))
      .filter(this.hasAllIncludedLetters)
      .filter(this.hasLetterOnRightPosition);
  }

  hasExcludedLetters = (word: string) => {
    for (let letter of this.excludeLetters) {
      if (word.includes(letter)) return true;
    }
    return false;
  };

  hasLetterOnRightPosition = (word: string) => {
    return Object.entries(this.letters)
      .filter(([pos, value]) => value)
      .every(([pos, value]) => word[parseInt(pos)] === value);
  };

  hasAllIncludedLetters = (word: string) => {
    return this.includeLetters
      .split("")
      .every((letter) => word.includes(letter));
  };
}
