import React, { useState } from "react"
import { Switch, Col, Row } from "antd"
import "./ControlBigGraphSparkLine.css" // Assuming this file contains necessary CSS
import { useDispatch, useSelector } from "react-redux"
import { ChangeGlobalSetting } from "../../actions/GlobalSettingAction"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"
import { GlobalSettingStateType, wordScaleGraphicsSettingStateType } from "../../types"

const ControlBigGraphSparkLine: React.FC = () => {
  const [isSparkLineOn, setIsSparkLineOn] = useState(true)
  const dispatch = useDispatch()
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const changeSparkLine = (checked: boolean) => {
    setIsSparkLineOn(checked)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        showSparkLine: checked,
      }),
    )
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        showWordScaleChartsOn: checked,
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

  return (
    <div className="control-panel">
      <Row align="middle">
        <Col span={10} className="control-label">
          Micro-sized graphics
        </Col>
        <Col span={14}>
          <Switch checked={isSparkLineOn} onChange={changeSparkLine} />
        </Col>
      </Row>
    </div>
  )
}

export default ControlBigGraphSparkLine
