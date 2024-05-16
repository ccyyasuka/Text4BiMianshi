import { typographySettingStateType } from "../types"
import { ChangeTypographySettingAction } from "../actions/typographySettingAction"
import { iniEntityStyles } from "../utils/entityStyles"

const iniTypographySettingState: typographySettingStateType = {
  selectedEntityType: "metric_value",
  secondEntityType: "metric_value",
  thirdEntityType: "metric_value",
  entityStyles: iniEntityStyles,
  boldness: true,
  underline: false,
  italics: false,
  contour: false,
  color: "#4B91FF",
  backgroundColor: "white",
}

const TypographySettingReducer = (
  state = iniTypographySettingState,
  action: ChangeTypographySettingAction,
) => {
  if (action.type === "CHANGE_TYPOGRAPHY_SETTING") {
    return action.payload
  }
  return state
}

export default TypographySettingReducer
