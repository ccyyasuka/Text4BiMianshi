import React, { useState } from "react"
import { Switch, Col, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"

const ControlWordScaleSymbolsOn: React.FC = () => {
  const dispatch = useDispatch()
  const globalSetting = useSelector((state: AppState) => state.globalSetting)
  const wordScaleGraphicsSetting = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const [isSymbolsOn, setIsSymbolsOn] = useState(true)
  const handleSymbolsOn = (checked: boolean) => {
    setIsSymbolsOn(checked)
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        showWordScaleSymbolsOn: checked,
        showDataDrivenSymbols: checked,
        graphicsSignificance: checked,
        graphicsDirection: checked,
        graphicsAnomaly: checked,
        isSemanticDrivenIconsOn: checked,
        selectedSymbol1: "null",
        selectedSymbol2: "null",
      }),
    )
  }
  const changeDataDrivenIcons = (checked: boolean) => {
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        showDataDrivenSymbols: checked,
        graphicsSignificance: checked,
        graphicsDirection: checked,
        graphicsAnomaly: checked,
      }),
    )
  }

  return (
    <div style={{ width: "100%" }}>
      <Row className="control-row">
        <div className="control-panel">
          <Row align="middle">
            <Col span={10} className="control-label">
              Symbols
            </Col>
            <Col span={14}>
              <Switch
                checked={
                  globalSetting.showSparkLine && wordScaleGraphicsSetting.showWordScaleSymbolsOn
                }
                onChange={handleSymbolsOn}
              />
            </Col>
          </Row>
        </div>
      </Row>
      <div className="control-panel" style={{ display: globalSetting.showSparkLine && wordScaleGraphicsSetting.showWordScaleSymbolsOn ? "block" : "none" }}>
        <Row align="middle">
          <Col span={10} className="control-label-layer2">
            Data-Driven
          </Col>
          <Col span={14}>
            <Switch
              checked={globalSetting.showSparkLine && wordScaleGraphicsSetting.showWordScaleSymbolsOn && wordScaleGraphicsSetting.showDataDrivenSymbols}
              onChange={changeDataDrivenIcons}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ControlWordScaleSymbolsOn
