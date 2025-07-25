const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000', // Next.js runs on this by default
		methods: ['GET', 'POST']
	}
});

const lobbies = new Map();

io.on('connection', (socket) => {
	console.log(`New connection: ${socket.id}`);

	socket.on('joinLobby', (lobbyId, playerId, playerName) => {
		let lobby = lobbies[lobbyId];

		if(!lobby) {
			lobbies[lobbyId] = {
				players: [],
				state: 'waiting',
				moves: [],
				admin: playerId,
			};
			lobby = lobbies[lobbyId];
		}
		lobby.players.push({id: playerId, name: playerName, socket: socket.id});
		lobby.players.forEach((player) => {
			io.to(player.socket).emit('lobbyJoined', lobby.players);
		})
	});

	socket.on('makeMove', ({ lobbyId, move }) => {
		const lobby = lobbies.get(lobbyId);
		if (lobby) {
			lobby.moves.push(move);
			io.to(lobbyId).emit('moveMade', move);
		}
	});

	socket.on('disconnect', () => {
		console.log(`Disconnected: ${socket.id}`);
		// Optionally remove from lobbies
	});
});

server.listen(4000, () => {
	console.log('Server listening on http://localhost:4000');
});