import React, { useState } from "react"
import { Switch, Col, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"
import { wordScaleGraphicsSettingStateType } from "../../types"
import ControlAspectRatio from "./ControlAspectRatio"
import ControlTypeSwitch from "./ControlTypeSwitch"
import ControlSparkLinePos from "./ControlSparkLinePos"

const ControlWordScaleChartsOn: React.FC = () => {
  const dispatch = useDispatch()
  const globalSetting = useSelector((state: AppState) => state.globalSetting)
  const { showWordScaleChartsOn } = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const { showSparkLine } = useSelector((state: AppState) => state.globalSetting)
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  // const [isDataDrivenChartsOn, setIsDataDrivenChartsOn] = useState(true)
  const changeDataDrivenCharts = (checked: boolean) => {
    // setIsDataDrivenChartsOn(checked)
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        showWordScaleChartsOn: checked,
      }),
    )
  }

  return (
    <div
      style={{
        width: "100%",
        // display:
        //   globalSetting.showSparkLine
        //     ? "block"
        //     : "none",
      }}
    >
      <Row className="control-row">
        <div className="control-panel">
          <Row align="middle">
            <Col span={10} className="control-label">
              Charts
            </Col>
            <Col span={14}>
              <Switch
                checked={globalSetting.showSparkLine && wordScaleGraphicsSetting.showWordScaleChartsOn}
                onChange={changeDataDrivenCharts}
              />
            </Col>
          </Row>
        </div>
      </Row>
      <Row
        className="control-row"
        style={{ display: globalSetting.showSparkLine && wordScaleGraphicsSetting.showWordScaleChartsOn ? "block" : "none" }}
      >
        <ControlAspectRatio />
      </Row>
      <Row
        className="control-row"
        style={{ display: globalSetting.showSparkLine && wordScaleGraphicsSetting.showWordScaleChartsOn ? "block" : "none" }}
      >
        <ControlSparkLinePos />
      </Row>
      <Row
        className="control-row"
        style={{ display: globalSetting.showSparkLine && wordScaleGraphicsSetting.showWordScaleChartsOn ? "block" : "none" }}
      >
        <ControlTypeSwitch />
      </Row>
    </div>
  )
}

export default ControlWordScaleChartsOn
