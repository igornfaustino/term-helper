import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useForm, Controller } from "react-hook-form";
import Attempt from "../src/presentation/components/attempt";
import { Attempt as AttemptType } from "../src/domain/entities/attempt";

const Home: NextPage = () => {
  const { control, handleSubmit, reset } = useForm();
  const [attempts, setAttempts] = useState<AttemptType[]>([]);

  const addAttempt = handleSubmit(({ attempt: attemptWord }) => {
    const attempt = [...attemptWord].map((letter) => ({
      letter,
      result: "wrong_letter",
    }));
    setAttempts((prev) => [...prev, attempt]);
    reset({ attempt: "" });
  });

  const updateAttempt = (idx: number) => (attempt: AttemptType) => {
    setAttempts((prev) =>
      prev.map((item, itemIdx) => {
        if (itemIdx === idx) return [...attempt];
        return [...item];
      })
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Term helper</title>
        <meta
          name="description"
          content="Site para achar palavras para o term.ooo"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Bem vindo ao Term helper</h1>

        {attempts.map((attempt, idx) => (
          <Attempt
            key={idx}
            attempt={attempt}
            updateAttempt={updateAttempt(idx)}
          />
        ))}

        <form onSubmit={addAttempt}>
          <Controller
            control={control}
            name="attempt"
            defaultValue={""}
            render={({ field }) => (
              <input placeholder="Digite sua palavra" {...field} />
            )}
          />
          <button type="submit">Adicionar</button>
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
