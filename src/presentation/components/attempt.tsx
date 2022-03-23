import { Attempt as AttemptType } from "../../domain/entities/attempt";

type Props = {
  attempt: { letter: string; result: string }[];
  updateAttempt: (attempt: AttemptType) => void;
};

const Attempt = ({ attempt, updateAttempt }: Props) => {
  console.log(attempt);

  const onClick = (letterIdx: number) => () => {
    const newAttempt = attempt.map((letter, idx) => {
      if (letterIdx === idx) return { ...letter, result: "right_word" };
      return letter;
    });
    updateAttempt(newAttempt);
  };

  return (
    <div>
      {[...attempt].map(({ letter }, idx) => (
        <span key={idx} onClick={onClick(idx)}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default Attempt;
