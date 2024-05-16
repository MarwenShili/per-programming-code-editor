import React, { useEffect, useRef } from 'react'
import { editor } from 'monaco-editor'
import MonacoEditor from '@monaco-editor/react'
import { ACTIONS } from '../constants/actions'

interface EditorProps {
  socketRef: React.MutableRefObject<any>
  roomId: string
  onCodeChange: (code: string) => void
}

const MonacoEditorTest: React.FC<EditorProps> = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel()
      if (model) {
        const code = model.getValue()
        onCodeChange(code)
        socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code })

        model.onDidChangeContent((event) => {
          const newCode = model.getValue()
          onCodeChange(newCode)
          socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code: newCode })
        })
      }
    }
  }, [socketRef, roomId, onCodeChange])

  useEffect(() => {
    const socket = socketRef.current
    if (socket) {
      const codeChangeListener = ({ code }: { code: string }) => {
        if (code !== null && editorRef.current) {
          const model = editorRef.current.getModel()
          if (model) {
            editorRef.current.setValue(code)
          }
        }
      }
      socket.on(ACTIONS.CODE_CHANGE, codeChangeListener)

      return () => {
        socket.off(ACTIONS.CODE_CHANGE, codeChangeListener)
      }
    }
  }, [socketRef])

  return (
    <MonacoEditor
      height="90vh"
      language="javascript"
      theme="vs-dark"
      //   editorDidMount={(editorInstance) => {
      //     editorRef.current = editorInstance
      //   }}
    />
  )
}

export default MonacoEditorTest
