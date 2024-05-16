import { RootState, useAppDispatch, useAppSelector } from '../shared/store'
import Editor from './components/CodeMirrorEditor'
import { ACTIONS } from './constants/actions'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import { initSocket } from './socket/socket'
import { Socket } from 'socket.io-client'
import { setUsers } from './data/editorSlice'
import { User } from './data/editorTypes'
import { message } from 'antd'
// import MonacoEditorTest from './components/MonacoEditor'
import CodeiumEditorComponent from './components/CodeuimEditor'

interface Client {
  socketId: string
  username: string
}

type LocationState = {
  username: string
}

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const { clients } = useAppSelector((state: RootState) => state.editor)

  const socketRef = useRef<Socket | null>(null)
  const codeRef = useRef<string | null>(null)
  const location = useLocation()
  const { roomId } = useParams<{ roomId: string }>()
  const reactNavigator = useNavigate()

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket()
      socketRef.current.on('connect_error', handleErrors)
      socketRef.current.on('connect_failed', handleErrors)

      function handleErrors(e: Error) {
        console.log('socket error', e)
        message.error('Socket connection failed, try again later.')
        reactNavigator('/join')
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: (location.state as LocationState)?.username,
      })

      socketRef.current.on(
        ACTIONS.JOINED,
        ({
          clients,
          username,
          socketId,
        }: {
          clients: Client[]
          username: string
          socketId: string
        }) => {
          if (username !== (location.state as LocationState)?.username) {
            message.success(`${username} joined the room.`)
            console.log(`${username} joined`)
          }
          dispatch(setUsers(clients))
          socketRef.current?.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          })
        },
      )

      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, username }: { socketId: string; username: string }) => {
          message.success(`${username} left the room.`)
          let cleanClients = clients?.filter((user: User) => user.socketId !== socketId)
          dispatch(setUsers(cleanClients!))
        },
      )
    }
    init()

    return () => {
      socketRef.current?.disconnect()
      socketRef.current?.off(ACTIONS.JOINED)
      socketRef.current?.off(ACTIONS.DISCONNECTED)
    }
  }, [location.state, reactNavigator, roomId])

  if (!location.state) {
    return <Navigate to="/join" />
  }

  return (
    <div className="editor-page">
      {/* <Editor
        socketRef={socketRef}
        roomId={roomId!}
        onCodeChange={(code: string) => {
          codeRef.current = code
        }}
      /> */}
      {/* <MonacoEditorTest
        socketRef={socketRef}
        roomId={roomId!}
        onCodeChange={(code: string) => {
          codeRef.current = code
        }}
      /> */}

      <CodeiumEditorComponent
        socketRef={socketRef}
        roomId={roomId!}
        onCodeChange={(code: string) => {
          console.log(code)

          codeRef.current = code
        }}
      />
    </div>
  )
}

export default Dashboard
