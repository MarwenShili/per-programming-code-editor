import Button from '../Button/Button'
import { RootState, useAppSelector } from '../../store'
import { useParams } from '../../hooks/useParams'
import { Avatar, message } from 'antd'
import { useNavigate } from 'react-router-dom'

interface ISidebarItemsProps {
  collapseSidebar: boolean
}

const SidebarItems: React.FC<ISidebarItemsProps> = () => {
  const { clients, hoIsTyping } = useAppSelector((state: RootState) => state.editor)

  const { roomId } = useParams()

  const reactNavigator = useNavigate()

  async function copyRoomId() {
    try {
      if (roomId) {
        await navigator.clipboard.writeText(roomId)
        message.success('Room ID has been copied to your clipboard')
      } else {
        throw new Error('Room ID is not available')
      }
    } catch (err) {
      message.error('Could not copy the Room ID')
      console.error(err)
    }
  }

  function leaveRoom(e: any) {
    e.stopPropagation()
    reactNavigator('/')
  }

  return (
    <div className="sidebar-items">
      <div className="user-list">
        {clients?.map((user, index) => {
          return (
            <Avatar
              key={index}
              className={hoIsTyping === user?.username ? 'item-avatar-active' : 'item-avatar'}
              size="large"
            >
              <div className="user-name-avatar">{user?.username}</div>
            </Avatar>
          )
        })}
      </div>
      <div className="action-sidebar">
        <Button onClick={copyRoomId}>Copy Room Id</Button>
        <Button onClick={leaveRoom}>Leave</Button>
      </div>
    </div>
  )
}

export default SidebarItems
