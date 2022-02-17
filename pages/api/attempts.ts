// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { WordFilterUseCase } from "../../src/domain/word-filter-use-case";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(404).send(`cannot ${req.method}`);
  const wordFilter = new WordFilterUseCase();
  return res.status(200).json({
    words: wordFilter.execute(req.body.attempts),
  });
}
