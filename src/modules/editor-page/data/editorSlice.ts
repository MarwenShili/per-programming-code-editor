/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEditorState, User } from './editorTypes'

const initialState: IEditorState = {
  status: 'idle',
  clients: [],
  activeEditor: 'Codeuim',
  hoIsTyping: '',
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
      //TODO : remove the condition
      action.payload.forEach((newUser) => {
        const userExists = state?.clients?.some((user) => user?.username === newUser?.username)
        if (!userExists) {
          state?.clients?.push(newUser)
        }
      })
    },
    setEditor: (state, action: PayloadAction<string>) => {
      state.activeEditor = action.payload
    },
    setHoIsTyping: (state, action: PayloadAction<string>) => {
      state.hoIsTyping = action.payload
    },
  },
})

export const { restore, setUsers, setEditor, setHoIsTyping } = editorSlice.actions

export default editorSlice.reducer
