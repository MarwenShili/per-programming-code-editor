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

interface EditorProps {
  socketRef: React.MutableRefObject<any>
  roomId: string
  onCodeChange: (code: string) => void
}

const Editor: React.FC<EditorProps> = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef<Codemirror.EditorFromTextArea | null>(null)

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
            })
          }
        })
      }
    }
    init()
  }, [onCodeChange, roomId, socketRef])

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }: any) => {
        if (code !== null) {
          editorRef.current?.setValue(code)
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
