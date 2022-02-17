import { WordFilterUseCase } from "./word-filter-use-case";

const tries = [
  [
    { letter: "t", result: "wrong_position" },
    { letter: "u", result: "wrong_letter" },
    { letter: "r", result: "right_position" },
    { letter: "m", result: "wrong_letter" },
    { letter: "a", result: "right_position" },
  ],
  [
    { letter: "h", result: "wrong_letter" },
    { letter: "o", result: "wrong_letter" },
    { letter: "r", result: "right_position" },
    { letter: "t", result: "right_position" },
    { letter: "a", result: "right_position" },
  ],
];

test("should recommend the right words", () => {
  const wordFilter = new WordFilterUseCase();
  wordFilter.WORDS = [
    "carta",
    "germe",
    "firma",
    "turma",
    "fumar",
    "tocar",
    "perto",
  ];

  const words = wordFilter.execute(tries);

  expect(words).toEqual(["carta"]);
});
