import React, { useState } from "react"
import { Button, Row, Col } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"
import { wordScaleGraphicsSettingStateType, GlobalSettingStateType } from "../../types"
import { ChangeGlobalSetting } from "../../actions/GlobalSettingAction"
import RightIcon from "../../utils/icons/right.svg"
import LeftIcon from "../../utils/icons/left.svg"
import UpIcon from "../../utils/icons/up.svg"
import DownIcon from "../../utils/icons/down.svg"

const ControlSparkLinePos: React.FC = () => {
  const buttonIcons = {
    right: <img src={RightIcon} alt="Right" width="24" height="24" />,
    left: <img src={LeftIcon} alt="Left" width="24" height="24" />,
    up: <img src={UpIcon} alt="Up" width="24" height="24" />,
    down: <img src={DownIcon} alt="Down" width="24" height="24" />,
  }
  // console.log("检查debug ControlSparkLinePos", RightIcon)
  const dispatch = useDispatch()
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )

  const [selectedPosition, setSelectedPosition] = useState("right")
  const [changeLineHeightFlag, setchangeLineHeightFlag] = useState(0)
  const [rememberLineHeight, setRememberLineHeight] = useState(2)
  const handleChangeSparkLinePosition = (newPosition: string) => {
    setSelectedPosition(newPosition)
    // setRememberLineHeight(globalSetting.lineHeight)
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        sparkLinePosition: newPosition,
      }),
    )
    if (newPosition === "up" || newPosition === "down") {
      if (changeLineHeightFlag === 0) {
        setRememberLineHeight(globalSetting.lineHeight)
        setchangeLineHeightFlag(1)
      }

      dispatch(
        ChangeGlobalSetting({
          ...globalSetting,
          lineHeight: 3,
        }),
      )
    } else {
      if (globalSetting.lineHeight === 2.6314) {
        setchangeLineHeightFlag(0)
        dispatch(
          ChangeGlobalSetting({
            ...globalSetting,
            lineHeight: rememberLineHeight,
          }),
        )
      } else {
        dispatch(
          ChangeGlobalSetting({
            ...globalSetting,
            lineHeight: globalSetting.lineHeight,
          }),
        )
      }
      console.log()
      // dispatch(
      //   ChangeGlobalSetting({
      //     ...globalSetting,
      //     lineHeight: rememberLineHeight,
      //   }),
      // )
    }
  }

  return (
    <div className="control-panel">
      <Row align="middle">
        <Col span={10} className="control-label-layer2">
          Position
        </Col>
        <Col span={14} style={{ width: "55%" }}>
          <Button.Group style={{ display: "flex" }}>
            {Object.entries(buttonIcons).map(([position, icon]) => (
              <Button
                key={position}
                type={selectedPosition === position ? "primary" : "default"}
                onClick={() => handleChangeSparkLinePosition(position)}
                // icon={buttonIcons[position as keyof typeof buttonIcons]}
                style={{
                  flex: 1,
                  borderRight: position !== "right" ? "none" : undefined,
                }}
              >
                {icon}
              </Button>
            ))}
          </Button.Group>
        </Col>
      </Row>
    </div>
  )
}

export default ControlSparkLinePos
