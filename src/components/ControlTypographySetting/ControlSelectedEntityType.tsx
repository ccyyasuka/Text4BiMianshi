import React, { useState } from "react"
import { TreeSelect, Select, Row, Col } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeTypographySetting } from "../../actions/typographySettingAction"
import { typographySettingStateType } from "../../types"
import { AppState } from "../../store"

const { Option } = Select
const { TreeNode } = TreeSelect

const ControlSelectedEntityType: React.FC = () => {
  const dispatch = useDispatch()
  const typographySetting: typographySettingStateType = useSelector(
    (state: AppState) => state.typographySetting,
  )
  const [selectedEntityType, setSelectedEntityType] = useState(typographySetting.selectedEntityType)
  const [showSecondaryOptions, setShowSecondaryOptions] = useState(false)

  const handlePrimaryChange = (value: string) => {
    if (value === "binary_value") {
      value = "binary_value_positive"
    }
    setSelectedEntityType(value)
    // setShowSecondaryOptions(value === "binary_value_positive")
    dispatch(
      ChangeTypographySetting({
        ...typographySetting,
        selectedEntityType: value,
      }),
    )
  }

  return (
    <div className="control-panel">
      <Row>
        {/* <Col span={10} className="control-label">
          Select entity
        </Col>
        <Col span={14}>
          <Select
            style={{ width: "90%" }}
            value={selectedEntityType}
            onChange={handlePrimaryChange}
          >
            <Option value="metric_value">value phrases(general)</Option>
            <Option value="binary_value_positive">value phrases(binary)</Option>
            <Option value="metric_names">measure phrases</Option>
            <Option value="algorithm">method phrases</Option>
            <Option value="filter_cate">filter phrases</Option>
          </Select>
        </Col> */}
        <Col span={10} className="control-label">
          Select entity
        </Col>
        <Col span={14}>
          <TreeSelect
            style={{ width: "100%" }}
            value={selectedEntityType}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={handlePrimaryChange}
          >
            <TreeNode value="metric_value" title="value phrases(general)" />
            <TreeNode value="binary_value" title="value phrases(binary)" selectable={false}>
              <TreeNode value="binary_value_positive" title="value phrases(+)" />
              <TreeNode value="binary_value_negative" title="value phrases(-)" />
            </TreeNode>
            <TreeNode value="metric_names" title="measure phrases" />
            <TreeNode value="algorithm" title="method phrases" />
            <TreeNode value="filter_cate" title="filter phrases" />
          </TreeSelect>
        </Col>
        {/* {showSecondaryOptions && (
          <Col span={12}>
            <Select
              style={{ width: "100%" }}
              defaultValue="positive"
              placeholder="Select binary option"
              onChange={(value) => {
                // Handle change for secondary select if needed
              }}
            >
              <Option value="positive">Positive</Option>
              <Option value="negative">Negative</Option>
            </Select>
          </Col>
        )} */}
      </Row>
    </div>
  )
}

export default ControlSelectedEntityType
