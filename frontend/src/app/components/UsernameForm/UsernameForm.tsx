'use client'
import {FormEvent, useState, useEffect} from "react";
import styles from './UsernameForm.module.css';

export default function Home() {
  const [username, setUsername] = useState<string>('');

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("username", username);
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username") ?? '');
  }, []);

  return (
    <form className={styles.usernameForm} onSubmit={handleSubmit}>
      <label htmlFor="username">Меня зовут:</label>
      <input
      type="text"
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Ок</button>
    </form>
);
}
