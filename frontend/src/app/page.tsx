'use client'
import styles from "./page.module.css";
import { v4 } from "uuid";
import UsernameForm from './components/UsernameForm/UsernameForm';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  function createGame() {
    const gameid = v4();
    router.replace(`/lobby/${gameid}`);
  }

  return (
    <div className={styles.page}>
      <UsernameForm/>
      <div className={styles.menu}>
        <button onClick={createGame}>Создать игру</button>
        <button>Присоединиться</button>
        <button>Правила</button>
      </div>
    </div>
  );
}
