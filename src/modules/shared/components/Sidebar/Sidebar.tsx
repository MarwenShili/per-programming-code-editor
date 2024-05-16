import SidebarItems from '../SidebarItems/SidebarItems'
import AntSelect from '../AntSelect/AntSelect'

interface ISidebarProps {
  collapseSidebar: boolean
}

const Sidebar: React.FC<ISidebarProps> = ({ collapseSidebar }) => {
  return (
    <div className={`sidebar ${collapseSidebar ? 'collapse' : ''}`}>
      {/* <div className="sidebar-logo-container">{collapseSidebar ? 'L' : 'Logo'}</div> */}
      <div className="sidebar-logo-container">
        {collapseSidebar ? (
          'L'
        ) : (
          <AntSelect
            defaultOption="Codeuim"
            options={[
              { label: 'Codeuim', value: 'Codeuim' },
              { label: 'CodeMirror', value: 'CodeMirror' },
              { label: 'MonacoEditor', value: 'MonacoEditor' },
            ]}
            onChange={() => {}}
          />
        )}
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
