"use client";

import styles from "./page.module.css";
import { useEffect, useState  } from 'react';
import { useParams } from "next/navigation";
import { v4 } from "uuid";
import io from 'socket.io-client';

type Player = {
  id: string;
  name: string;
};

export default function Lobby() {
  const params = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [userId, setUserId] = useState<string>(v4());

  const id = params.id as string;

  useEffect(() => {
    const oldUserId = localStorage.getItem("userId");
    if(!oldUserId) {
      localStorage.setItem("userId", userId);
    }
    const newUserId = localStorage.getItem("userId") || '';
    setUserId(newUserId);

    let userName = localStorage.getItem("username");
    if(!userName) {
      const randomName = v4().slice(0, 8);
      userName = randomName;
      localStorage.setItem("username", randomName);
    }
    const socket = io('http://localhost:4000');
    socket.emit('joinLobby', id, userId, userName);

    socket.on('lobbyUpdated', (players) => {
      setPlayers(players);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={styles.page}>
      <h1>Lobby {id}</h1>
      <div className={styles.menu}>
        {players.map(player => <div key={player.id}>{player.name}</div>)}
      </div>
    </div>
  );
}
