import React, { useEffect, useRef } from 'react'
import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/display/fullscreen'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/lint/lint'

import { ACTIONS } from '../constants/actions'
import { useLocation } from 'react-router-dom'
import { message } from 'antd'

interface EditorProps {
  socketRef: React.MutableRefObject<any>
  roomId: string
  onCodeChange: (code: string) => void
  onTyping: (username: string) => void
}

const Editor = ({ socketRef, roomId, onCodeChange, onTyping }: EditorProps) => {
  const editorRef = useRef<Codemirror.EditorFromTextArea | null>(null)
  const location = useLocation()

  useEffect(() => {
    const init = async () => {
      const textarea = document.getElementById('realtimeEditor') as HTMLTextAreaElement
      if (textarea) {
        editorRef.current = Codemirror.fromTextArea(textarea, {
          mode: { name: 'javascript', json: true },
          theme: 'dracula',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          extraKeys: {
            'Ctrl-Space': 'autocomplete',
            F11: (cm) => cm.setOption('fullScreen', !cm.getOption('fullScreen')),
            Esc: (cm) => {
              if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false)
            },
          },
        })

        editorRef.current.on('change', (instance, changes) => {
          const { origin } = changes
          const code = instance.getValue()
          onCodeChange(code)
          if (origin !== 'setValue') {
            socketRef.current.emit(ACTIONS.CODE_CHANGE, {
              roomId,
              code,
              username: location.state.username,
            })
          }
        })
      }
    }
    init()
  }, [onCodeChange, roomId, socketRef])

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code, username }: any) => {
        if (code !== null) {
          editorRef.current?.setValue(code)
        }

        if (username !== null) {
          // message.success(`${username} is typing`)
          onTyping(username)
        }
      })
    }

    return () => {
      socketRef.current?.off(ACTIONS.CODE_CHANGE)
    }
  }, [socketRef.current])

  return <textarea id="realtimeEditor"></textarea>
}

export default Editor
