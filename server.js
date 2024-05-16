import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'
const app = express()

const ACTIONS = {
  JOIN: 'join',
  JOINED: 'joined',
  DISCONNECTED: 'disconnected',
  CODE_CHANGE: 'code-change',
  SYNC_CODE: 'sync-code',
  LEAVE: 'leave',
}
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('build'))
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const userSocketMap = {}
function getAllConnectedClients(roomId) {
  // Map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId],
    }
  })
}

io.on('connection', (socket) => {
  console.log('socket connected', socket.id)

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username
    socket.join(roomId)
    const clients = getAllConnectedClients(roomId)
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      })
    })
  })

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    console.log('code change')
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code })
  })

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    console.log('code sync')
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code })
  })

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms]
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      })
    })
    delete userSocketMap[socket.id]
    socket.leave()
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, '0.0.0.0', () => console.log(`Listening on port ${PORT}`))
