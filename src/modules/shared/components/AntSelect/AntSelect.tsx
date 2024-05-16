import { Select } from 'antd'

type AntSelectProps = {
  options: { label: string; value: string }[]
  onChange: (x: any) => void
  defaultOption?: string | any
}

const AntSelect = ({ options, onChange, defaultOption }: AntSelectProps) => (
  <Select
    className="ant_select"
    showSearch
    style={{ width: 200 }}
    placeholder="Choose a code editor"
    optionFilterProp="children"
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={options}
    size="large"
    onChange={onChange}
    defaultValue={defaultOption}
  />
)

export default AntSelect
