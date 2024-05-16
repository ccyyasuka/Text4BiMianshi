import React, { useState } from "react"
import { TreeSelect, Button, Row, Col, Switch, Dropdown, Menu, Select } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"
import { wordScaleGraphicsSettingStateType } from "../../types"
import { SvgIcon } from "../../utils/NoneDataIcon"
import ImportIcon from "./ImportIcon"

const { Option } = Select
const { TreeNode } = TreeSelect

const ControlSemanticDrivenIcons: React.FC = () => {
  const dispatch = useDispatch()
  const globalSetting = useSelector((state: AppState) => state.globalSetting)
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const { entityIcon, absoluteIcon } = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  // const { selectedEntityType } = useSelector((state: AppState) => state.typographySetting)
  // const { semanticBindingEntityType } = useSelector((state: AppState) => state.typographySetting)

  // ... (previous states and functions)

  const [symbol1Null, setSymbol1Null] = useState(true)
  const [symbol2Null, setSymbol2Null] = useState(true)

  const [isSemanticDrivenIconsOn, setIsSemanticDrivenIconsOn] = useState(true)
  const [semanticsAbsolutePosition, setSemanticsAbsolutePosition] = useState("sentenceStart")
  const [selectedSymbol1, setSelectedSymbol1] = useState("null")
  const [semanticBindingEntityType, setSemanticBindingEntityType] = useState("metric_value")
  const [selectedSymbol2, setSelectedSymbol2] = useState("null")
  // 下拉框显示的值
  const [dropdownDisplay1, setDropdownDisplay1] = useState("...")
  const [dropdownDisplay2, setDropdownDisplay2] = useState("...")
  const buttoWidth1 = 40
  const buttoWidth2 = 35
  // 用于显示和隐藏基于 Semantic-driven 开关状态的组件
  const handleSemanticDrivenChange = (checked: boolean) => {
    setIsSemanticDrivenIconsOn(checked)
    setSelectedSymbol1("null")
    setSelectedSymbol2("null")
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        isSemanticDrivenIconsOn: checked,
        selectedSymbol1: "null",
        selectedSymbol2: "null",
      }),
    )
  }

  // 用于控制 Absolute position 开关状态的函数
  const handleAbsolutePositionChange = (position: string) => {
    setSemanticsAbsolutePosition(position)
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        semanticsAbsolutePosition: position,
      }),
    )
  }

  const handleSymbol1Change = (symbol: string) => {
    // console.log("debug-symbol1", symbol)
    if (symbol === "null") {
      setSymbol1Null(true)
    } else {
      setSymbol1Null(false)
    }
    setSelectedSymbol1(symbol)
    setDropdownDisplay1(symbol)
    // eslint-disable-next-line quotes
    const IconN = '<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg"></svg>'
    absoluteIcon[semanticsAbsolutePosition].e = IconN

    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        selectedSymbol1: symbol,
        absoluteIcon: { ...absoluteIcon },
      }),
    )
  }

  // Function to handle change in selected entity type
  const handlePrimaryChange = (value: string) => {
    if (value === "binary_value") {
      value = "binary_value_positive"
    }
    setSemanticBindingEntityType(value)
    // Dispatch or handle change in state here
    // console.log('Selected entity type:', value)
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        semanticBindingEntityType: value,
      }),
    )
  }

  const handleSymbol2Change = (symbol: string) => {
    if (symbol === "null") {
      setSymbol2Null(true)
    } else {
      setSymbol2Null(false)
    }
    setSelectedSymbol2(symbol)
    // dispatch(
    //   ChangeWordScaleGraphicsSetting({
    //     ...wordScaleGraphicsSetting,
    //     selectedSymbol2: symbol,
    //   }),
    // )
    // eslint-disable-next-line quotes
    const IconN = '<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg"></svg>'
    entityIcon[semanticBindingEntityType].e = IconN

    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        selectedSymbol2: symbol,
        absoluteIcon: { ...absoluteIcon },
      }),
    )
  }

  // Dropdown menu for the last symbol button
  const symbolMenu = (
    <Menu>
      <Menu.Item key="0">
        <Button onClick={() => console.log("option 1")}>Option 1</Button>
      </Menu.Item>
      <Menu.Item key="1">
        <Button onClick={() => console.log("option 2")}>Option 2</Button>
      </Menu.Item>
      {/* // Add more menu items as needed */}
    </Menu>
  )

  return (
    <div
      style={{
        width: "100%",
        display:
          globalSetting.showSparkLine && wordScaleGraphicsSetting.showWordScaleSymbolsOn
            ? "block"
            : "none",
      }}
    >
      {/* Semantic-driven 开关 */}
      <Row className="control-row">
        <div className="control-panel">
          <Row align="middle">
            <Col span={10} className="control-label-layer2">
              Semantic-driven
            </Col>
            <Col span={14}>
              <Switch
                checked={
                  globalSetting.showSparkLine && wordScaleGraphicsSetting.isSemanticDrivenIconsOn
                }
                onChange={handleSemanticDrivenChange}
              />
            </Col>
          </Row>
        </div>
      </Row>
      <Row
        className="control-row"
        style={{ display: wordScaleGraphicsSetting.isSemanticDrivenIconsOn ? "block" : "none" }}
      >
        {/* <ImportIcon /> */}
      </Row>

      {/* Absolute position 按钮行 */}
      <div
        style={{
          width: "100%",
          display:
            globalSetting.showSparkLine && wordScaleGraphicsSetting.isSemanticDrivenIconsOn
              ? "block"
              : "none",
        }}
      >
        <Row className="control-row">
          <div className="control-panel">
            <Row align="middle">
              <Col span={10} className="control-label-layer3">
                Absolute position
              </Col>
              <Col span={14}>
                <Button.Group>
                  <Button
                    type={semanticsAbsolutePosition === "sentenceStart" ? "primary" : "default"}
                    onClick={() => handleAbsolutePositionChange("sentenceStart")}
                  >
                    begin
                  </Button>
                  <Button
                    type={semanticsAbsolutePosition === "sentenceEnd" ? "primary" : "default"}
                    onClick={() => handleAbsolutePositionChange("sentenceEnd")}
                  >
                    end
                  </Button>
                  {/* <Button
                    type={semanticsAbsolutePosition === "no" ? "primary" : "default"}
                    onClick={() => handleAbsolutePositionChange("no")}
                  >
                    no
                  </Button> */}
                </Button.Group>
              </Col>
            </Row>
          </div>
        </Row>
        {/* Symbol 按钮行 */}
        {semanticsAbsolutePosition !== "no" && (
          <Row className="control-row">
            <div className="control-panel">
              <Row align="middle">
                <Col span={10} className="control-label-layer4">
                  Symbol
                </Col>
                <Col span={14} style={{ display: "flex", width: "50%" }}>
                  <Button.Group>
                    {/* <Button
                    className={`custom-btn ${selectedSymbol1 === "null" ? "active" : ""}`}
                    onClick={() => handleSymbol1Change("null")}
                    style={{ width: `${buttoWidth1}px`, textAlign: "center" }}
                  >
                    null
                  </Button> */}
                    {["null", "a", "b", "c", "d"].map((symbol) => (
                      <Button
                        key={symbol} // 用 symbol 作为 key
                        type={selectedSymbol1 === symbol ? "primary" : "default"}
                        onClick={() => {
                          handleSymbol1Change(symbol)
                          setDropdownDisplay1(symbol) // 点击按钮后重置下拉框显示
                        }}
                        icon={
                          <SvgIcon svgContent={absoluteIcon[semanticsAbsolutePosition][symbol]} />
                        }
                        style={{
                          width: `${buttoWidth1}px`,
                          display: "inline-flex",
                          textAlign: "left",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {symbol === "null" ? "null" : null}
                      </Button>
                    ))}
                    {/* <Select
                      value={dropdownDisplay1} // 下拉框显示的值
                      style={{ width: `${buttoWidth1 + 40}px` }}
                      onChange={handleSymbol1Change}
                      dropdownMatchSelectWidth={false}
                      onFocus={() => setDropdownDisplay1(selectedSymbol1)} // 聚焦时显示实际选中的值
                      onBlur={() => setDropdownDisplay1("...")} // 失焦时显示....
                    >
                      {["a", "b", "c", "d"].map((symbol) => (
                        <Option key={symbol} value={symbol}>
                          {symbol}
                        </Option>
                      ))}
                    </Select> */}
                    <ImportIcon IconSpecies="absolute" iconType="symbol1" />
                  </Button.Group>
                </Col>
              </Row>
            </div>
          </Row>
        )}
      </div>

      {/* Binding entity dropdown */}
      <div
        style={{
          width: "100%",
          display:
            globalSetting.showSparkLine && wordScaleGraphicsSetting.isSemanticDrivenIconsOn
              ? "block"
              : "none",
        }}
      >
        <Row className="control-row">
          <div className="control-panel">
            <Row align="middle">
              <Col span={10} className="control-label-layer3">
                Binding entity
              </Col>
              <Col span={14}>
                <TreeSelect
                  style={{ width: "100%" }}
                  value={semanticBindingEntityType}
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
            </Row>
          </div>
        </Row>
        {/* Symbol buttons */}
        <Row className="control-row">
          <div className="control-panel">
            <Row align="middle">
              <Col span={10} className="control-label-layer4">
                Symbol
              </Col>
              <Col span={14} style={{ display: "flex" }}>
                <Button.Group>
                  {/* <Button
                    className={`custom-btn ${selectedSymbol2 === "null" ? "active" : ""}`}
                    onClick={() => handleSymbol2Change("null")}
                    style={{ width: `${buttoWidth1}px`, textAlign: "center" }}
                  >
                    null
                  </Button> */}
                  {["null", "a", "b", "c", "d"].map((symbol) => (
                    <Button
                      key={symbol} // 用 symbol 作为 key
                      type={selectedSymbol2 === symbol ? "primary" : "default"}
                      onClick={() => {
                        handleSymbol2Change(symbol)
                        setDropdownDisplay2(symbol) // 点击按钮后重置下拉框显示
                      }}
                      icon={<SvgIcon svgContent={entityIcon[semanticBindingEntityType][symbol]} />}
                      style={{
                        width: `${buttoWidth1}px`,
                        display: "inline-flex",
                        textAlign: "left",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {symbol === "null" ? "null" : null}
                    </Button>
                  ))}
                  {/* <Select
                    value={dropdownDisplay2} // 下拉框显示的值
                    style={{ width: `${buttoWidth2 + 40}px` }}
                    onChange={handleSymbol2Change}
                    dropdownMatchSelectWidth={false}
                    onFocus={() => setDropdownDisplay2(selectedSymbol2)} // 聚焦时显示实际选中的值
                    onBlur={() => setDropdownDisplay2("...")} // 失焦时显示....
                  >
                    {["a", "b", "c", "d"].map((symbol) => (
                      <Option key={symbol} value={symbol}>
                        {symbol}
                      </Option>
                    ))}
                  </Select> */}
                  <ImportIcon IconSpecies="entity" iconType="symbol2" />
                </Button.Group>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    </div>
  )
}

export default ControlSemanticDrivenIcons
