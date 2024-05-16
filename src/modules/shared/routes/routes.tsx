import editorRoutes from '../../editor-page/routes/routes'
import joinRoomRoutes from '../../join-room/routes/routes'
import sharedRoutes from './sharedRoutes'

const routes = [...sharedRoutes, ...joinRoomRoutes, ...editorRoutes]

export default routes
