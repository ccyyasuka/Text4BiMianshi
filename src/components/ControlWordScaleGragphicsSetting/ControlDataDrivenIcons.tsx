import React, { useState } from "react"
import { Button, Col, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"
import { wordScaleGraphicsSettingStateType } from "../../types"

const ControlDataDrivenIcons: React.FC = () => {
  const dispatch = useDispatch()
  const { showWordScaleSymbolsOn, showDataDrivenSymbols } = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const { showSparkLine } = useSelector((state: AppState) => state.globalSetting)
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  // 使用useState钩子来设置初始状态
  const [graphicsSignificance, setGraphicsSignificance] = useState(true)
  const [graphicsDirection, setGraphicsDirection] = useState(true)
  const [graphicsAnomaly, setGraphicsAnomaly] = useState(true)

  // 根据类型和新值更新相应的状态
  const handleTypeChange = (typeKey: string, newValue: boolean) => {
    switch (typeKey) {
      case "graphicsSignificance":
        setGraphicsSignificance(newValue)
        break
      case "graphicsDirection":
        setGraphicsDirection(newValue)
        break
      case "graphicsAnomaly":
        setGraphicsAnomaly(newValue)
        break
      default:
        break
    }
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        [typeKey]: newValue,
      }),
    )
  }

  // 创建一个渲染按钮组的函数
  const renderButtonGroup = (typeKey: string, label: string, value: boolean) => (
    <Row>
      <Col span={10}>
        <div className="control-label-layer3">{label}</div>
      </Col>
      <Col span={14}>
        <Button.Group style={{ width: "50%", paddingBottom: 7 }}>
          <Button
            type={value ? "primary" : "default"}
            onClick={() => handleTypeChange(typeKey, true)}
            style={{ width: "50%" }}
          >
            on
          </Button>
          <Button
            type={!value ? "primary" : "default"}
            onClick={() => handleTypeChange(typeKey, false)}
            style={{ width: "50%" }}
          >
            off
          </Button>
        </Button.Group>
      </Col>
    </Row>
  )

  return (
    <div
      className="control-panel"
      style={{ display: showWordScaleSymbolsOn && showDataDrivenSymbols && showSparkLine ? "block" : "none" }}
    >
      {renderButtonGroup("graphicsSignificance", "Significance", wordScaleGraphicsSetting.graphicsSignificance)}
      {renderButtonGroup("graphicsDirection", "Direction", wordScaleGraphicsSetting.graphicsDirection)}
      {renderButtonGroup("graphicsAnomaly", "Abnormality", wordScaleGraphicsSetting.graphicsAnomaly)}
    </div>
  )
}

export default ControlDataDrivenIcons
