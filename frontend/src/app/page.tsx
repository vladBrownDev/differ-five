import Image from "next/image";
import styles from "./page.module.css";
import UsernameForm from './components/UsernameForm/UsernameForm';

export default function Home() {
  return (
    <div className={styles.page}>
      <UsernameForm/>
      <div className={styles.menu}>
        <button>Создать игру</button>
        <button>Присоединиться</button>
        <button>Правила</button>
      </div>
    </div>
  );
}
