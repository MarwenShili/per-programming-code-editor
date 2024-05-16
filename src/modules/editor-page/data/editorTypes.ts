export interface User {
  username: string
  socketId: string
}

export interface IEditorState {
  status: string
  clients: User[] | null
  error: string | null
}
