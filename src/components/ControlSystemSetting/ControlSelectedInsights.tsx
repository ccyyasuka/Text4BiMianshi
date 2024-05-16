import React, { useState, useEffect, FC } from "react"
import { Select, Tag, Space } from "antd"
import { SelectProps } from "antd/lib/select"
import { useDispatch, useSelector } from "react-redux"
import { systemStateType } from "../../types"
import { AppState } from "../../store"
import { ChangeSystemSetting } from "../../actions/systemAction"

interface TagRenderProps {
  label: React.ReactNode
  value: string
  closable: boolean
  onClose: () => void
}

interface OptionType {
  label: string
  value: string
}

interface DropdownMenuProps {
  menu: React.ReactElement
}

const DropdownMenu: FC<DropdownMenuProps> = ({ menu }) => (
  <div style={{ overflowY: "auto" }}>{menu}</div>
)

const ControlSelectedInsights: React.FC = () => {
  const dispatch = useDispatch()
  const systemSetting: systemStateType = useSelector((state: AppState) => state.system)
  const [selectedValues, setSelectedValues] = React.useState<string[]>([])
  const [curSelectedCards, setSelectedCards] = useState([
    "Card1",
    "Card2",
    "Card3",
    "Card4",
    "Card5",
    "Card6",
    "Card7",
    "Card8",
  ])

  const defaultValue = ["gold", "cyan"]
  const COLOR_PALETTE = [
    "#fbb4ae",
    "#b3cde3",
    "#ccebc5",
    "#decbe4",
    "#fed9a6",
    "#ffffcc",
    "#e5d8bd",
    "#fddaec",
  ] // Pastel1 色板

  const options = [
    { value: COLOR_PALETTE[1], label: "Difference of Total Profit by Year", cardid: "Card1" },
    { value: COLOR_PALETTE[2], label: "Rank of Sales by City", cardid: "Card2" },
    { value: COLOR_PALETTE[3], label: "Proportion of Sales by Country", cardid: "Card3" },
    { value: COLOR_PALETTE[5], label: "Trend of Sales", cardid: "Card4" },
    { value: COLOR_PALETTE[6], label: "Anomaly Detection of Sales", cardid: "Card5" },
    { value: COLOR_PALETTE[7], label: "Periodicity of Sales", cardid: "Card6" },
    { value: COLOR_PALETTE[4], label: "Association between Sales and Profit", cardid: "Card7" },
    { value: COLOR_PALETTE[0], label: "Distribution of Sales", cardid: "Card8" },
  ]
  const formatOptionLabel = ({ label, value }: OptionType) => (
    // console.log("检查formatOptionLabel的参数", label, value)
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* <span
          style={{ color: value, fontSize: "20px", fontWeight: "bold" }}
        > · </span> */}
      <span
        style={{
          height: "10px",
          width: "10px",
          backgroundColor: value, // 使用option中的颜色值
          borderRadius: "50%",
          display: "inline-block",
          marginRight: "8px", // 和文本保持一定间距
          flexShrink: 0, // 防止圆点被压缩
        }}
      >
        {/* 这里是颜色圆点 */}
      </span>
      <span style={{ color: "black" }}>{label}</span>
    </div>
  )
  // const defaultValuesLabels = defaultValue.map(
  //   (val) => options.find((option) => option.value === val)?.label,
  // )

  const handleChange = (selectedItems: string[]) => {
    // console.log("检查第一次的selectedItems", selectedItems)
    setSelectedValues(selectedItems)
    // 将对应的cardid存起来
    const selectedIds = options
      .filter((option) => selectedItems.includes(option.value)) // 先过滤出选中的项
      .map((option) => option.cardid) // 然后映射到它们的 cardid
    // console.log("检查第一次的selectedvalues", selectedValues)
    console.log("检查selectedIds", selectedIds)
    setSelectedCards(selectedIds)
    dispatch(
      ChangeSystemSetting({
        ...systemSetting,
        selectedCards: selectedIds,
      }),
    )
  }
  // 在组件加载时，设置所有选项为选中状态
  useEffect(() => {
    const allValues = options.map((option) => option.value)
    setSelectedValues(allValues)
  }, [])

  // 使用useEffect更新默认选中的值，这会在组件首次渲染时运行
  useEffect(() => {
    const defaultSelected = options.map((option) => option.value) // 假设你想默认选中所有选项
    setSelectedValues(defaultSelected)
    handleChange(defaultSelected)
  }, []) // 空数组保证这个effect只会运行一次

  const tagRender = ({ label, value, closable, onClose }: TagRenderProps) => {
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }

    return (
      <Tag
        color={value} // 这里设置 Tag 的颜色，如果你想保留背景色的话
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
          maxWidth: "100%",
          maxHeight: 30,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          lineHeight: "30px",
          // 这里移除了 backgroundColor，因为我们不显示颜色圆点
          // 如果你不希望 Tag 有任何颜色，也可以移除 color 属性
        }}
      >
        {label}
      </Tag>
    )
  }

  return (
    <Space style={{ width: "85%" }} direction="vertical">
      {" "}
      {/* 设置外部容器的固定宽度 */}
      <Select
        className="custom-select-multiple"
        // dropdownClassName="custom-dropdown"
        mode="multiple"
        // showArrow
        // tagRender={tagRender}
        style={{ width: "100%" }} // 设置Select组件的宽度为100%
        value={selectedValues}
        onChange={handleChange}
        defaultValue={options.map((option) => option.value)}
        // dropdownMatchSelectWidth={false} // 确保下拉菜单的宽度不会改变
        // dropdownStyle={{ width: 300, maxHeight: "300px", overflowY: "auto" }} // 设置下拉菜单的固定宽度
        // 移除 options={options}
        dropdownRender={(menu) => <DropdownMenu menu={menu} />}
      >
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {formatOptionLabel(option)}
          </Select.Option>
        ))}
      </Select>
    </Space>
  )
}

export default ControlSelectedInsights
