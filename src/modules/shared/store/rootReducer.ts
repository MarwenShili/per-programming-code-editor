import { combineReducers } from '@reduxjs/toolkit'
import themeReducer from './slices/theme/themeSlice'
import authReducer from '../../auth/data/authSlice'
import editorReducer from '../../editor-page/data/editorSlice'
import modalReducer from './slices/modal/modalSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  editor: editorReducer,
  modal: modalReducer,
})

export default rootReducer
