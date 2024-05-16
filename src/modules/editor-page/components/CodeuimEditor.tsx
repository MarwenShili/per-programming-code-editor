import React, { useEffect, useRef } from 'react'
import { CodeiumEditor } from '@codeium/react-code-editor'
import { ACTIONS } from '../constants/actions'

interface EditorProps {
  socketRef: React.MutableRefObject<any>
  roomId: string
  onCodeChange: (code: string) => void
}

const CodeiumEditorComponent: React.FC<EditorProps> = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef<any | null>(null)

  const [value, setValue] = React.useState('')

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }: any) => {
        if (code !== null) {
          editorRef.current?.setValue(code)
          setValue(code)
        }
      })
    }

    return () => {
      socketRef.current?.off(ACTIONS.CODE_CHANGE)
    }
  }, [socketRef.current])

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onCodeChange(value)
      if (socketRef.current) {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code: value,
        })
      }
    }
  }

  return (
    <CodeiumEditor
      value={value}
      language="javascript"
      onChange={handleEditorChange}
      options={{
        theme: 'vs-dark',
        automaticLayout: true,
      }}
      height="90vh"
    />
  )
}

export default CodeiumEditorComponent
