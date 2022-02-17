import { default as words } from "../resources/words.json";

type LetterResult = { letter: string; result: string };
type Try = LetterResult[];
type DTO = Try[];
export class WordFilterUseCase {
  WORDS = words;

  execute(attempts: DTO) {
    const { excludeLetters, includeLetters, letters } =
      this.processTries(attempts);
    return this.WORDS.map((word) => word.toLowerCase())
      .filter((word) => !this.hasExcludedLetters(excludeLetters, word))
      .filter((word) => this.hasAllIncludedLetters(includeLetters, word))
      .filter((word) => this.hasLetterOnRightPosition(letters, word));
  }

  processTries(attempts: DTO) {
    const includeLetters = new Set<string>();
    const excludeLetters = new Set<string>();
    const letters: Record<string, string> = {};
    for (let attempt of attempts) {
      for (let letterPos = 0; letterPos < attempt.length; letterPos++) {
        const letterAttempt = attempt[letterPos];
        if (letterAttempt.result === "wrong_position")
          includeLetters.add(letterAttempt.letter.toLowerCase());
        if (letterAttempt.result === "wrong_letter")
          excludeLetters.add(letterAttempt.letter.toLowerCase());
        if (letterAttempt.result === "right_position")
          letters[letterPos] = letterAttempt.letter.toLowerCase();
      }
    }
    return {
      includeLetters,
      excludeLetters,
      letters,
    };
  }

  hasExcludedLetters = (excludeLetters: Set<string>, word: string) => {
    for (let letter of excludeLetters.values()) {
      if (word.includes(letter)) return true;
    }
    return false;
  };

  hasLetterOnRightPosition = (
    letters: Record<string, string>,
    word: string
  ) => {
    return Object.entries(letters)
      .filter(([, value]) => value)
      .every(([pos, value]) => word[parseInt(pos)] === value);
  };

  hasAllIncludedLetters = (includeLetters: Set<string>, word: string) => {
    return Array.from(includeLetters).every((letter) => word.includes(letter));
  };
}
