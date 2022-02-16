import { WordFilterUseCase } from "./word";

const excludeLetters = "tua";
const includeLetters = "r";
const letters = {
  0: "",
  1: "",
  2: "",
  3: "m",
  4: "e",
};

test("jest is working", () => {
  const wordFilter = new WordFilterUseCase(
    excludeLetters,
    includeLetters,
    letters
  );
  wordFilter.WORDS = ["crime", "germe", "firma", "turma", "fumar", "tocar"];

  const words = wordFilter.execute();

  expect(words).toEqual(["crime", "germe"]);
});
