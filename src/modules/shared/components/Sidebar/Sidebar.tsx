import SidebarItems from '../SidebarItems/SidebarItems'
import AntSelect from '../AntSelect/AntSelect'
import { useAppDispatch } from '../../store'
import { setEditor } from '@src/modules/editor-page/data/editorSlice'
import { useEffect } from 'react'

interface ISidebarProps {
  collapseSidebar: boolean
}

const Sidebar: React.FC<ISidebarProps> = ({ collapseSidebar }) => {
  const dispatch = useAppDispatch()
  const handleChangeCodeEditor = (value: string) => {
    localStorage.setItem('editor', value)
    dispatch(setEditor(value))
  }

  useEffect(() => {
    const editor = localStorage.getItem('editor')
    if (editor) {
      dispatch(setEditor(editor))
    }
  }, [localStorage.getItem('editor')])

  //event change code editor

  return (
    <div className="sidebar">
      <div className="sidebar-logo-container">
        <AntSelect
          defaultOption={localStorage.getItem('editor') || 'Codeuim'}
          options={[
            { label: 'Codeuim', value: 'Codeuim' },
            { label: 'CodeMirror', value: 'CodeMirror' },
            { label: 'MonacoEditor', value: 'MonacoEditor' },
          ]}
          onChange={(value) => handleChangeCodeEditor(value)}
        />
      </div>

      <div className="sidebar-content">
        <div className="sidebar-nav-items">
          <SidebarItems collapseSidebar={collapseSidebar} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
