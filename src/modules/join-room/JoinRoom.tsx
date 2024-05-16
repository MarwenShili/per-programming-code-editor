import { useState, KeyboardEvent, ChangeEvent, MouseEvent } from 'react'
import { v4 as uuidV4 } from 'uuid'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const JoinPage = () => {
  const navigate = useNavigate()

  const [roomId, setRoomId] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  const createNewRoom = (e: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const id = uuidV4()
    setRoomId(id)
    toast.success('Created a new room')
  }

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error('ROOM ID & username is required')
      return
    }

    // Redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    })
  }

  const handleInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      joinRoom()
    }
  }

  const handleRoomIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value)
  }

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  return (
    <div className="join-module">
      <div className="login-card-container">
        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            onChange={handleRoomIdChange}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            onChange={handleUsernameChange}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a onClick={createNewRoom} href="" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default JoinPage
