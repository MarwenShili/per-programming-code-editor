/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEditorState, User } from './editorTypes'

const initialState: IEditorState = {
  status: 'idle',
  clients: [],
  error: null,
}

const editorSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restore: (state) => {
      state.error = null
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.clients = action.payload
    },
  },
})

export const { restore, setUsers } = editorSlice.actions

export default editorSlice.reducer
