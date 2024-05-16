import React, { useState } from "react"
import { Button, Col, Row, Switch } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeGlobalSetting } from "../../actions/GlobalSettingAction"
import { AppState } from "../../store"
import { GlobalSettingStateType } from "../../types"

const ControlInteraction: React.FC = () => {
  // 使用全局状态管理
  const dispatch = useDispatch()
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )

  // 新增全局变量
  const [isInteractionOn, setIsInteractionOn] = useState(true)
  const [isLinkingOn, setIsLinkingOn] = useState(true)
  const [isDetailsOnDemandOn, setIsDetailsOnDemandOn] = useState(true)

  // 更新全局设置的函数
  const toggleGlobalSetting = (setting: string, value: boolean) => {
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        [setting]: value,
      }),
    )
  }

  // 交互状态变化时的处理函数
  const handleInteractionChange = (value: boolean) => {
    setIsInteractionOn(value)
    setIsLinkingOn(value)
    setIsDetailsOnDemandOn(value)
    toggleGlobalSetting("interaction", value)
    // 关闭交互同时关闭下属的设置项
    if (!value) {
      setIsLinkingOn(false)
      toggleGlobalSetting("linking", false)
      setIsDetailsOnDemandOn(false)
      toggleGlobalSetting("detailsOnDemand", false)
    }
  }

  return (
    <div className="control-panel">
      <Row align="middle" style={{ paddingBottom: 10 }}>
        <Col span={10} className="control-label">
          Interaction
        </Col>
        <Col span={14}>
          <Switch checked={isInteractionOn} onChange={handleInteractionChange} />
        </Col>
      </Row>
      {isInteractionOn && (
        <>
          <Row align="middle" style={{ paddingBottom: 10 }}>
            <Col span={10} className="control-label-layer2">
              Linking
            </Col>
            <Col span={14}>
              <Switch
                checked={isLinkingOn}
                onChange={(checked) => {
                  setIsLinkingOn(checked)
                  toggleGlobalSetting("linking", checked)
                }}
              />
            </Col>
          </Row>
          <Row align="middle" style={{ paddingBottom: 10 }}>
            <Col span={10} className="control-label-layer2">
              Details on demand
            </Col>
            <Col span={14}>
              <Switch
                checked={isDetailsOnDemandOn}
                onChange={(checked) => {
                  setIsDetailsOnDemandOn(checked)
                  toggleGlobalSetting("detailsOnDemand", checked)
                }}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default ControlInteraction
